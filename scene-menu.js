class MenuScene extends Phaser.Scene {
  constructor() { super('Menu'); }

  create() {
    this.road = this.add.tileSprite(W / 2, H / 2, W, H, 'road');

    this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.55);

    this.add.text(W / 2, 120, 'CARRERS', {
      fontSize: '72px', fontFamily: 'Impact, Arial Black',
      fill: '#f5c518', stroke: '#000', strokeThickness: 6,
      shadow: { offsetX: 3, offsetY: 3, color: '#b8860b', blur: 0, fill: true }
    }).setOrigin(0.5);

    this.add.text(W / 2, 190, 'DE LA CIUTAT', {
      fontSize: '52px', fontFamily: 'Impact, Arial Black',
      fill: '#ffffff', stroke: '#000', strokeThickness: 5
    }).setOrigin(0.5);

    const previewCar = this.add.image(W / 2, 320, 'player').setScale(1.2);
    const btn = this.add.rectangle(W / 2, 540, 200, 56, 0xf5c518).setInteractive({ useHandCursor: true });
    const btnTxt = this.add.text(W / 2, 540, 'JUGAR', {
      fontSize: '28px', fontFamily: 'Impact', fill: '#000'
    }).setOrigin(0.5);

    btn.on('pointerover', () => btn.setFillStyle(0xffd700));
    btn.on('pointerout',  () => btn.setFillStyle(0xf5c518));
    btn.on('pointerdown', () => {
      this.cameras.main.fade(300, 0, 0, 0);
      this.time.delayedCall(300, () => this.scene.start('Game'));
    });

    this.input.keyboard.once('keydown-ENTER', () => {
      this.cameras.main.fade(300, 0, 0, 0);
      this.time.delayedCall(300, () => this.scene.start('Game'));
    });

    this.events.on('update', () => { this.road.tilePositionY -= 3; });

    this.tweens.add({
      targets: previewCar, y: 315, duration: 700, yoyo: true, repeat: -1, ease: 'Sine.easeInOut'
    });
  }
}
