export type Point3 = readonly [x: number, y: number, z: number];

export type Box = {
  x: number;
  y: number;
  z: number;
  w: number;
  d: number;
  h: number;
};

const C = Math.cos(Math.PI / 6);
const S = 0.5;

const round = (n: number) => Math.round(n * 100) / 100;

export function createIso(originX: number, originY: number) {
  const project = ([x, y, z]: Point3) =>
    [round(originX + (x - y) * C), round(originY + (x + y) * S - z)] as const;

  const points = (list: Point3[]) => list.map((p) => project(p).join(',')).join(' ');

  const matrix = (a: number, b: number, c: number, d: number, at: Point3) => {
    const [e, f] = project(at);
    return `matrix(${[a, b, c, d].map(round).join(' ')} ${e} ${f})`;
  };

  return {
    project,
    points,
    faces({ x, y, z, w, d, h }: Box) {
      return {
        top: points([
          [x, y, z + h],
          [x + w, y, z + h],
          [x + w, y + d, z + h],
          [x, y + d, z + h]
        ]),
        left: points([
          [x, y + d, z],
          [x + w, y + d, z],
          [x + w, y + d, z + h],
          [x, y + d, z + h]
        ]),
        right: points([
          [x + w, y, z],
          [x + w, y + d, z],
          [x + w, y + d, z + h],
          [x + w, y, z + h]
        ])
      };
    },
    onRightFace: (at: Point3) => matrix(C, -S, 0, 1, at),
    onLeftFace: (at: Point3) => matrix(C, S, 0, 1, at),
    onTop: (at: Point3, scale = 1) => matrix(C * scale, S * scale, -C * scale, S * scale, at),
    alongGround: (at: Point3, scale = 1) => matrix(C * scale, -S * scale, C * scale, S * scale, at)
  };
}
