class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    const roadGfx = this.make.graphics({ x: 0, y: 0, add: false });
    roadGfx.fillStyle(0x1a1a2e);
    roadGfx.fillRect(0, 0, W, H);
    roadGfx.fillStyle(0x2d2d4e);
    roadGfx.fillRect(80, 0, 10, H);
    roadGfx.fillStyle(0x2d2d4e);
    roadGfx.fillRect(390, 0, 10, H);
    roadGfx.fillStyle(0xf5c518);
    for (let y = 0; y < H; y += 60) {
      roadGfx.fillRect(185, y, 8, 36);
      roadGfx.fillRect(285, y, 8, 36);
    }
    roadGfx.generateTexture("road", W, H);
    roadGfx.destroy();

    const pCar = this.make.graphics({ x: 0, y: 0, add: false });
    pCar.fillStyle(0x1565c0);
    pCar.fillRoundedRect(4, 12, 52, 76, 10);
    pCar.fillStyle(0x0d47a1);
    pCar.fillRoundedRect(10, 8, 40, 38, 8);
    pCar.fillStyle(0x90caf9, 0.85);
    pCar.fillRoundedRect(13, 12, 34, 22, 5);
    pCar.fillStyle(0x90caf9, 0.7);
    pCar.fillRoundedRect(13, 42, 34, 12, 4);
    pCar.fillStyle(0x111);
    pCar.fillRoundedRect(0, 16, 12, 22, 4);
    pCar.fillRoundedRect(48, 16, 12, 22, 4);
    pCar.fillRoundedRect(0, 56, 12, 22, 4);
    pCar.fillRoundedRect(48, 56, 12, 22, 4);
    pCar.fillStyle(0xfff176);
    pCar.fillRect(8, 88, 14, 6);
    pCar.fillRect(38, 88, 14, 6);
    pCar.fillStyle(0x42a5f5, 0.5);
    pCar.fillRect(18, 50, 24, 4);
    pCar.generateTexture("player", 60, 96);
    pCar.destroy();

    const e1 = this.make.graphics({ x: 0, y: 0, add: false });
    e1.fillStyle(0xc62828);
    e1.fillRoundedRect(4, 12, 52, 76, 10);
    e1.fillStyle(0xb71c1c);
    e1.fillRoundedRect(10, 8, 40, 38, 8);
    e1.fillStyle(0xef9a9a, 0.7);
    e1.fillRoundedRect(13, 12, 34, 22, 5);
    e1.fillStyle(0xef9a9a, 0.5);
    e1.fillRoundedRect(13, 42, 34, 12, 4);
    e1.fillStyle(0x111);
    e1.fillRoundedRect(0, 16, 12, 22, 4);
    e1.fillRoundedRect(48, 16, 12, 22, 4);
    e1.fillRoundedRect(0, 56, 12, 22, 4);
    e1.fillRoundedRect(48, 56, 12, 22, 4);
    e1.fillStyle(0xff1744);
    e1.fillRect(8, 0, 14, 5);
    e1.fillRect(38, 0, 14, 5);
    e1.generateTexture("enemy1", 60, 96);
    e1.destroy();

    const e2 = this.make.graphics({ x: 0, y: 0, add: false });
    e2.fillStyle(0xf9a825);
    e2.fillRoundedRect(4, 12, 52, 76, 10);
    e2.fillStyle(0xf57f17);
    e2.fillRoundedRect(10, 8, 40, 38, 8);
    e2.fillStyle(0xfff9c4, 0.8);
    e2.fillRoundedRect(13, 12, 34, 22, 5);
    e2.fillStyle(0xfff9c4, 0.5);
    e2.fillRoundedRect(13, 42, 34, 12, 4);
    e2.fillStyle(0x111);
    e2.fillRoundedRect(0, 16, 12, 22, 4);
    e2.fillRoundedRect(48, 16, 12, 22, 4);
    e2.fillRoundedRect(0, 56, 12, 22, 4);
    e2.fillRoundedRect(48, 56, 12, 22, 4);
    e2.fillStyle(0x111, 0.4);
    e2.fillRect(12, 52, 36, 6);
    e2.generateTexture("enemy2", 60, 96);
    e2.destroy();

    const tree = this.make.graphics({ x: 0, y: 0, add: false });
    tree.fillStyle(0x5d4037);
    tree.fillRect(0, 28, 80, 22);
    tree.fillStyle(0x4e342e);
    tree.fillRect(0, 30, 80, 6);
    tree.fillStyle(0x2e7d32);
    tree.fillCircle(20, 22, 18);
    tree.fillStyle(0x388e3c);
    tree.fillCircle(40, 16, 20);
    tree.fillStyle(0x2e7d32);
    tree.fillCircle(60, 22, 18);
    tree.fillStyle(0x1b5e20);
    tree.fillCircle(40, 12, 12);
    tree.generateTexture("tree", 80, 60);
    tree.destroy();

    const spark = this.make.graphics({ x: 0, y: 0, add: false });
    spark.fillStyle(0xffd600);
    spark.fillRect(0, 0, 6, 6);
    spark.generateTexture("spark", 6, 6);
    spark.destroy();

    const scTree = this.make.graphics({ x: 0, y: 0, add: false });
    scTree.fillStyle(0x1b5e20);
    scTree.fillTriangle(15, 0, 30, 50, 0, 50);
    scTree.fillStyle(0x2e7d32);
    scTree.fillTriangle(15, 10, 28, 52, 2, 52);
    scTree.fillStyle(0x5d4037);
    scTree.fillRect(11, 50, 8, 16);
    scTree.generateTexture("scTree", 30, 66);
    scTree.destroy();
  }

  create() {
    this.scene.start("Menu");
  }
}
