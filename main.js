const W = 480,
  H = 640;
const LANES = [140, 240, 340];
const LANE_WIDTH = 80;
const CAR_Y = 520;
const BASE_SPEED = 280;
const ACCEL = 8;
const OBSTACLE_INTERVAL_MIN = 900;
const OBSTACLE_INTERVAL_MAX = 1800;

const config = {
  type: Phaser.AUTO,
  width: W,
  height: H,
  parent: "game-container",
  backgroundColor: "#0a0a0f",
  physics: {
    default: "arcade",
    arcade: { gravity: { y: 0 }, debug: false },
  },
  scene: [BootScene, MenuScene, GameScene, PauseScene, GameOverScene],
};

const game = new Phaser.Game(config);
