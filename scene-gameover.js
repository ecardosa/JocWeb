class GameOverScene extends Phaser.Scene {
  constructor() { super('GameOver'); }

  init(data) { this.finalScore = data.score || 0; }

  create() {
    this.road = this.add.tileSprite(W / 2, H / 2, W, H, 'road');
    this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.72);

    this.add.text(W / 2, 140, 'DERROTA', {
      fontSize: '52px', fontFamily: 'Impact', fill: '#ff1744',
      stroke: '#000', strokeThickness: 6
    }).setOrigin(0.5);

    this.add.text(W / 2, 220, 'PUNTUACIÓ FINAL', {
      fontSize: '18px', fontFamily: 'Arial', fill: '#aaa'
    }).setOrigin(0.5);

    this.add.text(W / 2, 270, this.finalScore, {
      fontSize: '80px', fontFamily: 'Impact', fill: '#f5c518',
      stroke: '#000', strokeThickness: 5
    }).setOrigin(0.5);

    const best = parseInt(localStorage.getItem('roadrunner_best') || '0');
    if (this.finalScore > best) {
      localStorage.setItem('roadrunner_best', this.finalScore);
      this.add.text(W / 2, 350, '🏆 ¡NOU RÉCORD!', {
        fontSize: '22px', fontFamily: 'Impact', fill: '#ffd700'
      }).setOrigin(0.5);
    } else {
      this.add.text(W / 2, 350, 'RÉCORD: ' + best, {
        fontSize: '22px', fontFamily: 'Arial', fill: '#aaa'
      }).setOrigin(0.5);
    }

    const retryBtn = this.add.rectangle(W / 2, 450, 220, 56, 0xc62828).setInteractive({ useHandCursor: true });
    const retryTxt = this.add.text(W / 2, 450, 'REINTENTAR', {
      fontSize: '24px', fontFamily: 'Impact', fill: '#fff'
    }).setOrigin(0.5);

    retryBtn.on('pointerover', () => retryBtn.setFillStyle(0xe53935));
    retryBtn.on('pointerout',  () => retryBtn.setFillStyle(0xc62828));
    retryBtn.on('pointerdown', () => {
      this.cameras.main.fade(200, 0, 0, 0);
      this.time.delayedCall(200, () => this.scene.start('Game'));
    });

    const menuBtn = this.add.rectangle(W / 2, 520, 220, 56, 0x333).setInteractive({ useHandCursor: true });
    this.add.text(W / 2, 520, 'MENÚ', {
      fontSize: '24px', fontFamily: 'Impact', fill: '#fff'
    }).setOrigin(0.5);

    menuBtn.on('pointerover', () => menuBtn.setFillStyle(0x555));
    menuBtn.on('pointerout',  () => menuBtn.setFillStyle(0x333));
    menuBtn.on('pointerdown', () => this.scene.start('Menu'));

    this.input.keyboard.on('keydown-ENTER', () => {
      this.cameras.main.fade(200, 0, 0, 0);
      this.time.delayedCall(200, () => this.scene.start('Game'));
    });

    this.events.on('update', () => { this.road.tilePositionY -= 2; });
  }
}
