import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { site } from '@/lib/data/site';

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const fontDir = join(process.cwd(), 'node_modules/@fontsource/onest/files');

async function font(subset: string, weight: 400 | 600) {
  return {
    name: 'Onest',
    data: await readFile(join(fontDir, `onest-${subset}-${weight}-normal.woff`)),
    weight,
    style: 'normal' as const
  };
}

const LINE = '#2a2a27';
const RED = '#f40006';

function Square({ top, left }: { top: number; left: number }) {
  return (
    <div
      style={{ position: 'absolute', top: top - 3, left: left - 3, width: 7, height: 7, background: RED }}
    />
  );
}

export default async function OpengraphImage() {
  const [mark, fonts] = await Promise.all([
    readFile(join(process.cwd(), 'public/logo.png')),
    Promise.all([font('latin', 400), font('cyrillic', 400), font('latin', 600), font('cyrillic', 600)])
  ]);
  const markSrc = `data:image/png;base64,${mark.toString('base64')}`;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'relative',
        background: '#0a0a0a',
        color: '#ededea',
        fontFamily: 'Onest'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 1200,
          height: 630,
          background: 'linear-gradient(120deg, rgba(244,0,6,0) 45%, rgba(244,0,6,0.16) 100%)'
        }}
      />
      <div style={{ position: 'absolute', left: 80, top: 0, bottom: 0, borderLeft: `1px dashed ${LINE}` }} />
      <div style={{ position: 'absolute', left: 1120, top: 0, bottom: 0, borderLeft: `1px dashed ${LINE}` }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 110, borderTop: `1px solid ${LINE}` }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 520, borderTop: `1px solid ${LINE}` }} />
      <Square top={110} left={80} />
      <Square top={110} left={1120} />
      <Square top={520} left={80} />
      <Square top={520} left={1120} />

      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 34,
          display: 'flex',
          alignItems: 'center',
          gap: 16
        }}
      >
        <img src={markSrc} width={44} height={43} alt="" />
        <div style={{ display: 'flex', fontSize: 32, fontWeight: 600, letterSpacing: -1 }}>
          emostr
          <span style={{ fontWeight: 400, color: '#ff5257' }}>Studio</span>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 120,
          top: 170,
          right: 120,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{ display: 'flex', fontSize: 96, lineHeight: 1, letterSpacing: -4.5 }}>
          Сайты и сервисы
        </div>
        <div style={{ display: 'flex', fontSize: 96, lineHeight: 1.05, letterSpacing: -4.5 }}>
          под ключ<span style={{ color: RED }}>.</span>
        </div>
        <div style={{ display: 'flex', marginTop: 34, fontSize: 30, color: '#9f9e98', letterSpacing: -0.5 }}>
          Сайты · CRM · интернет-магазины · веб-сервисы
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          left: 120,
          right: 120,
          top: 552,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 24,
          color: '#9f9e98'
        }}
      >
        <div style={{ display: 'flex', gap: 10 }}>
          {['#00c99f', '#b455ff', '#e9cc00', RED].map((color) => (
            <div key={color} style={{ width: 28, height: 8, background: color }} />
          ))}
        </div>
        <div style={{ display: 'flex' }}>emostr.com</div>
      </div>
    </div>,
    { ...size, fonts }
  );
}
