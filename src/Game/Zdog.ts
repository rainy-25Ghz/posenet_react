import Zdog from "zdog";
let illo1: Zdog.Illustration;
let illo2: Zdog.Illustration;

export function initZdog() {
  illo1 = new Zdog.Illustration({
    element: ".zdog-canvas1",
  });
  illo2 = new Zdog.Illustration({
    element: ".zdog-canvas2",
  });
}
export function createRing() {
  new Zdog.Ellipse({
    addTo: illo1,
    diameter: 250, // 直径
    stroke: 20, // 線の太さ
    color: "rgb(250 207 120)", // 図形の色
  });
  illo1.updateRenderGraph();
}
export const createCat = () => {
  const head = new Zdog.Shape({
    addTo: illo2,
    stroke: 200,
    color: "#9ED",
  });
  const ear_right = new Zdog.Shape({
    addTo: illo2,
    stroke: 20,
    fill: true,
    path: [
      { x: 0, y: -10 },
      { x: 30, y: 30 },
      { x: -30, y: 30 },
    ],
    translate: { x: -90, y: -80, z: 10 },
    rotate: { z: -0.6 },
  });
  // ear_left
  ear_right.copy({
    addTo: illo2,
    translate: { x: 90, y: -80, z: 10 },
    rotate: { z: 0.6 },
  });
  const eye_right = new Zdog.Ellipse({
    addTo: illo2,
    diameter: 40,
    quarters: 2,
    stroke: 10,
    rotate: { z: -Zdog.TAU / 4 },
    translate: { x: -40, z: 90 },
  });
  // eye_left
  eye_right.copy({
    translate: { x: 40, z: 90 },
  });
  const mouth = new Zdog.Shape({
    addTo: illo2,
    stroke: 8,
    path: [{ x: -14 }, { x: 14 }],
    translate: { y: 20, z: 90 },
  });
  // ひげ
  const hige_left = new Zdog.Group({
    addTo: illo2,
    translate: { x: -90, y: 10, z: 60 },
  });

  // 1本目のひげ
  const hige = new Zdog.Shape({
    addTo: hige_left,
    stroke: 9,
    path: [{ x: 15 }, { x: -15 }],
    rotate: { z: 0.4 },
  });
  // 2本目のひげ
  hige.copy({
    translate: { y: 40 },
    rotate: { z: -0.2 },
  });

  // まとめて複製
  hige_left.copyGraph({
    rotate: { z: Zdog.TAU / 2 },
    translate: { x: 90, y: 50, z: 60 },
  });
};
export const animate = () => {
  illo1.rotate.x += 0.03;
  illo1.rotate.y += 0.03; // 図形を回転
  illo1.updateRenderGraph(); // 回転後の図形を描画
  illo2.updateRenderGraph(); // 回転後の図形を描画
  requestAnimationFrame(animate); // 再度呼び出し
};
