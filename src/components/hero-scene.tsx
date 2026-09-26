import { brandIcons, type BrandIconId } from '@/lib/data/icons';
import { createIso, type Box } from '@/lib/iso';

const iso = createIso(660, 272);

const SIZE = 200;
const CUBE = 88;
const CUBE_Z = 204;
const CUBE_H = 52;

type Layer = Box & {
  id: string;
  color: string;
  caption?: string;
  label: string;
  mono?: boolean;
};

const layers: Layer[] = [
  {
    id: 'infra',
    x: 0,
    y: 0,
    z: 0,
    w: SIZE,
    d: SIZE,
    h: 34,
    color: 'var(--scene-infra)',
    label: 'UBUNTU · NGINX · DOCKER',
    mono: true
  },
  {
    id: 'backend',
    x: 0,
    y: 0,
    z: 40,
    w: SIZE,
    d: SIZE,
    h: 76,
    color: '#f40006',
    caption: 'BACKEND',
    label: 'Laravel · PHP'
  },
  {
    id: 'frontend',
    x: 0,
    y: 0,
    z: 122,
    w: SIZE,
    d: SIZE,
    h: 76,
    color: '#b455ff',
    caption: 'FRONTEND',
    label: 'Next.js · Nuxt'
  }
];

type Cube = Box & { id: string; color: string; icon: BrandIconId; iconColor: string };

const cubes: Cube[] = [
  { id: 'vue', x: 8, y: 8, color: '#00c99f', icon: 'vue', iconColor: '#ffffff' },
  { id: 'react', x: 104, y: 8, color: '#e9cc00', icon: 'react', iconColor: '#1b1b18' },
  { id: 'ts', x: 8, y: 104, color: '#f7f7f5', icon: 'typescript', iconColor: '#3178c6' }
].map((cube) => ({ ...cube, z: CUBE_Z, w: CUBE, d: CUBE, h: CUBE_H }) as Cube);

const slot: Box = { x: 104, y: 104, z: CUBE_Z, w: CUBE, d: CUBE, h: CUBE_H };

type Pipe = { id: string; x: number; from: number; color: string; label: string; at: number };

const pipes: Pipe[] = [
  { id: 'site', x: 36, from: 780, color: '#f40006', label: 'site.client.ru', at: 470 },
  { id: 'crm', x: 100, from: 700, color: '#b455ff', label: 'crm.client.ru', at: 380 },
  { id: 'shop', x: 164, from: 620, color: '#00c99f', label: 'shop.client.ru', at: 290 }
];

const tint = (color: string, amount: number) =>
  `color-mix(in oklab, ${color} ${amount}%, var(--scene-paper))`;
const lighten = (color: string, amount: number) =>
  `color-mix(in oklab, ${color} ${amount}%, #ffffff)`;

function Solid({ box, color }: { box: Box; color: string }) {
  const f = iso.faces(box);
  return (
    <g stroke="var(--scene-stroke)" strokeWidth={1} strokeLinejoin="round">
      <polygon points={f.left} style={{ fill: tint(color, 30) }} />
      <polygon points={f.right} style={{ fill: color }} />
      <polygon points={f.top} style={{ fill: lighten(color, 72) }} />
    </g>
  );
}

function LayerLabel({ layer }: { layer: Layer }) {
  const origin = [layer.x + layer.w, layer.y + layer.d - 16, layer.z] as const;
  if (layer.mono) {
    return (
      <text
        transform={iso.onRightFace(origin)}
        y={-layer.h / 2 + 3.5}
        fill="#ffffff"
        fontSize={9}
        letterSpacing={0.6}
        className="font-mono"
      >
        {layer.label}
      </text>
    );
  }
  return (
    <g transform={iso.onRightFace(origin)} fill="#ffffff">
      <text y={-layer.h + 22} fontSize={9} letterSpacing={1.4} opacity={0.8} className="font-mono">
        {layer.caption}
      </text>
      <text y={-16} fontSize={22} fontWeight={600} letterSpacing={-0.6}>
        {layer.label}
      </text>
    </g>
  );
}

function CubeIcon({ cube }: { cube: Cube }) {
  const scale = 1.7;
  const offset = (CUBE - 24 * scale) / 2;
  return (
    <path
      d={brandIcons[cube.icon].path}
      fill={cube.iconColor}
      transform={iso.onTop([cube.x + offset, cube.y + offset, cube.z + cube.h], scale)}
    />
  );
}

function Pipeline({ pipe }: { pipe: Pipe }) {
  const [x1, y1] = iso.project([pipe.x, pipe.from, 0]);
  const [x2, y2] = iso.project([pipe.x, SIZE + 4, 0]);
  const width = pipe.label.length * 6 + 22;
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={pipe.color} strokeWidth={1.5} />
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={pipe.color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeDasharray="2 46"
        className="motion-safe:animate-[pipe-flow_1.6s_linear_infinite]"
      />
      <g transform={iso.alongGround([pipe.x, pipe.at, 0])}>
        <rect
          x={0}
          y={-10}
          width={width}
          height={20}
          rx={10}
          fill="var(--scene-paper)"
          stroke={pipe.color}
          strokeWidth={1.2}
        />
        <circle cx={11} cy={0} r={2.6} fill={pipe.color} />
        <text x={19} y={3.6} fontSize={10} fill={pipe.color} className="font-mono">
          {pipe.label}
        </text>
      </g>
      <g transform={iso.alongGround([pipe.x, pipe.at + 90, 0])}>
        <circle r={8} fill="var(--scene-paper)" stroke={pipe.color} strokeWidth={1.2} />
        <circle r={3} fill={pipe.color} />
      </g>
    </g>
  );
}

function Slot() {
  const f = iso.faces(slot);
  const top = slot.z + slot.h;
  const mid = [slot.x + slot.w / 2, slot.y + slot.d / 2, top] as const;
  const [cx, cy] = iso.project(mid);
  return (
    <g>
      <g
        stroke="var(--accent)"
        strokeWidth={1.2}
        strokeDasharray="4 4"
        strokeLinejoin="round"
        style={{ fill: tint('#f40006', 6) }}
      >
        <polygon points={f.left} fillOpacity={0.55} />
        <polygon points={f.right} fillOpacity={0.55} />
        <polygon points={f.top} fillOpacity={0.55} />
      </g>
      <g transform={`translate(${cx} ${cy})`}>
        <circle r={13} fill="var(--scene-paper)" stroke="var(--accent)" strokeWidth={1.2} />
        <path d="M-5 0H5M0 -5V5" stroke="var(--accent)" strokeWidth={2} strokeLinecap="round" />
      </g>
      <text
        transform={iso.onRightFace([slot.x + slot.w, slot.y + slot.d - 12, slot.z])}
        y={-slot.h / 2 + 3.5}
        fontSize={9}
        letterSpacing={1}
        fill="var(--accent-text)"
        className="font-mono"
      >
        ВАШ ПРОЕКТ
      </text>
    </g>
  );
}

export function HeroScene({ className }: { className?: string }) {
  const plate = iso.points([
    [-18, -18, 0],
    [SIZE + 18, -18, 0],
    [SIZE + 18, SIZE + 18, 0],
    [-18, SIZE + 18, 0]
  ]);
  const shadow = iso.points([
    [30, -10, 0],
    [SIZE + 70, -10, 0],
    [SIZE + 70, SIZE - 20, 0],
    [30, SIZE - 20, 0]
  ]);
  const [fadeFromX, fadeFromY] = iso.project([100, 820, 0]);
  const [fadeToX, fadeToY] = iso.project([100, 380, 0]);

  return (
    <svg
      viewBox="0 0 900 690"
      className={className}
      role="img"
      aria-label="Стек emostrStudio: Ubuntu, NGINX и Docker в основании, Laravel и PHP на бэкенде, Next.js и Nuxt на фронтенде, сверху Vue, React и TypeScript — и свободное место для вашего проекта"
    >
      <defs>
        <linearGradient
          id="scene-pipe-fade"
          gradientUnits="userSpaceOnUse"
          x1={fadeFromX}
          y1={fadeFromY}
          x2={fadeToX}
          y2={fadeToY}
        >
          <stop offset="0" stopColor="#fff" stopOpacity={0} />
          <stop offset="1" stopColor="#fff" stopOpacity={1} />
        </linearGradient>
        <mask id="scene-pipe-mask" maskUnits="userSpaceOnUse" x={0} y={0} width={900} height={690}>
          <rect width={900} height={690} fill="url(#scene-pipe-fade)" />
        </mask>
        <filter id="scene-blur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation={14} />
        </filter>
      </defs>

      <polygon points={shadow} fill="#000" opacity={0.1} filter="url(#scene-blur)" />
      <polygon
        points={plate}
        fill="var(--scene-paper)"
        stroke="var(--border-strong)"
        strokeDasharray="3 5"
      />

      <g mask="url(#scene-pipe-mask)">
        {pipes.map((pipe) => (
          <Pipeline key={pipe.id} pipe={pipe} />
        ))}
      </g>

      {layers.map((layer) => (
        <g key={layer.id}>
          <Solid box={layer} color={layer.color} />
          <LayerLabel layer={layer} />
        </g>
      ))}

      {cubes.map((cube) => (
        <g key={cube.id}>
          <Solid box={cube} color={cube.color} />
          <CubeIcon cube={cube} />
        </g>
      ))}

      <Slot />
    </svg>
  );
}
