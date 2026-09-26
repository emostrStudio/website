import { readFileSync, writeFileSync } from 'node:fs';
import { inflateSync } from 'node:zlib';

const COLS = 60;
const FILL = 'emostr';
const COVERAGE = 0.3;
const COLORS = [
  { rgb: [0x00, 0xc9, 0x9f], ansi: 43 },
  { rgb: [0xb4, 0x55, 0xff], ansi: 135 },
  { rgb: [0xe9, 0xcc, 0x00], ansi: 220 },
  { rgb: [0xf4, 0x00, 0x06], ansi: 196 }
];
const FOOTER = [
  '\x1b[1memostr\x1b[0m\x1b[1;38;5;196mStudio\x1b[0m \x1b[2m·\x1b[0m студия веб-разработки',
  'сайты · CRM · интернет-магазины · веб-сервисы',
  '\x1b[2memostr.com · t.me/crefixa · mail@emostr.com\x1b[0m'
];

function decodePng(buf) {
  let pos = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  let interlace = 0;
  const idat = [];

  while (pos < buf.length) {
    const length = buf.readUInt32BE(pos);
    const type = buf.toString('ascii', pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + length);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      interlace = data[12];
    } else if (type === 'IDAT') {
      idat.push(data);
    } else if (type === 'IEND') {
      break;
    }
    pos += 12 + length;
  }

  if (bitDepth !== 8 || interlace !== 0 || (colorType !== 2 && colorType !== 6)) {
    throw new Error(
      `Неподдерживаемый PNG: bitDepth=${bitDepth}, colorType=${colorType}, interlace=${interlace}`
    );
  }

  const channels = colorType === 6 ? 4 : 3;
  const stride = width * channels;
  const raw = inflateSync(Buffer.concat(idat));
  const data = Buffer.alloc(stride * height);

  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const src = y * (stride + 1) + 1;
    const dst = y * stride;
    const prev = dst - stride;
    for (let x = 0; x < stride; x++) {
      const a = x >= channels ? data[dst + x - channels] : 0;
      const b = y > 0 ? data[prev + x] : 0;
      const c = x >= channels && y > 0 ? data[prev + x - channels] : 0;
      let value = raw[src + x];
      if (filter === 1) value += a;
      else if (filter === 2) value += b;
      else if (filter === 3) value += (a + b) >> 1;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        value += pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      data[dst + x] = value & 255;
    }
  }

  return { width, height, channels, data };
}

function nearestColor(r, g, b) {
  let best = 0;
  let bestDistance = Infinity;
  COLORS.forEach(({ rgb }, i) => {
    const distance = (rgb[0] - r) ** 2 + (rgb[1] - g) ** 2 + (rgb[2] - b) ** 2;
    if (distance < bestDistance) {
      bestDistance = distance;
      best = i;
    }
  });
  return best;
}

function classifyCell(image, x0, x1, y0, y1) {
  const counts = new Array(COLORS.length).fill(0);
  let samples = 0;
  let opaque = 0;
  const stepX = Math.max(1, Math.floor((x1 - x0) / 8));
  const stepY = Math.max(1, Math.floor((y1 - y0) / 16));

  for (let y = y0; y < y1; y += stepY) {
    for (let x = x0; x < x1; x += stepX) {
      const i = (y * image.width + x) * image.channels;
      samples++;
      if (image.channels === 4 && image.data[i + 3] < 128) continue;
      opaque++;
      counts[nearestColor(image.data[i], image.data[i + 1], image.data[i + 2])]++;
    }
  }

  if (!samples || opaque / samples < COVERAGE) return -1;
  return counts.indexOf(Math.max(...counts));
}

function visibleLength(text) {
  return [...text.replace(/\x1b\[[0-9;]*m/g, '')].length;
}

const svg = readFileSync(new URL('../emostr.svg', import.meta.url), 'utf8');
const match = svg.match(/data:image\/png;base64,([A-Za-z0-9+/=]+)/);
if (!match) throw new Error('В emostr.svg не найдено встроенное PNG-изображение');

const image = decodePng(Buffer.from(match[1], 'base64'));
const rows = Math.round((COLS * image.height) / image.width / 2);
const grid = [];

for (let cy = 0; cy < rows; cy++) {
  const y0 = Math.floor((cy * image.height) / rows);
  const y1 = Math.floor(((cy + 1) * image.height) / rows);
  const row = [];
  for (let cx = 0; cx < COLS; cx++) {
    const x0 = Math.floor((cx * image.width) / COLS);
    const x1 = Math.floor(((cx + 1) * image.width) / COLS);
    row.push(classifyCell(image, x0, x1, y0, y1));
  }
  grid.push(row);
}

while (grid.length && grid[0].every((cell) => cell < 0)) grid.shift();
while (grid.length && grid.at(-1).every((cell) => cell < 0)) grid.pop();

const art = grid.map((row, cy) => {
  let line = '';
  let current = -1;
  row.forEach((cell, cx) => {
    if (cell !== current) {
      if (current >= 0) line += '\x1b[0m';
      if (cell >= 0) line += `\x1b[1;38;5;${COLORS[cell].ansi}m`;
      current = cell;
    }
    line += cell >= 0 ? FILL[(cx + cy) % FILL.length] : ' ';
  });
  if (current >= 0) line += '\x1b[0m';
  return line.replace(/ +$/, '');
});

const footer = FOOTER.map(
  (line) => ' '.repeat(Math.max(0, Math.floor((COLS - visibleLength(line)) / 2))) + line
);

const output = ['', ...art, '', ...footer, '', ''].join('\n');

writeFileSync(new URL('../public/curl', import.meta.url), output);
process.stdout.write(output);
console.log(`public/curl: ${art.length} строк × ${COLS} колонок`);
