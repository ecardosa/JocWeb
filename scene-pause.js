class PauseScene extends Phaser.Scene {
  constructor() { super('Pause'); }

  create() {
    this.add.rectangle(W / 2, H / 2, W, H, 0x000000, 0.65);

    this.add.text(W / 2, 220, '⏸  PAUSA', {
      fontSize: '52px', fontFamily: 'Impact', fill: '#f5c518',
      stroke: '#000', strokeThickness: 5
    }).setOrigin(0.5);
    
    const resumeBtn = this.add.rectangle(W / 2, 400, 220, 56, 0x1565c0).setInteractive({ useHandCursor: true });
    this.add.text(W / 2, 400, 'CONTINUAR', {
      fontSize: '24px', fontFamily: 'Impact', fill: '#fff'
    }).setOrigin(0.5);

    resumeBtn.on('pointerover', () => resumeBtn.setFillStyle(0x1976d2));
    resumeBtn.on('pointerout',  () => resumeBtn.setFillStyle(0x1565c0));
    resumeBtn.on('pointerdown', () => {
      this.scene.get('Game').togglePause();
    });

    const menuBtn = this.add.rectangle(W / 2, 470, 220, 56, 0x333).setInteractive({ useHandCursor: true });
    this.add.text(W / 2, 470, 'MENÚ', {
      fontSize: '24px', fontFamily: 'Impact', fill: '#fff'
    }).setOrigin(0.5);

    menuBtn.on('pointerover', () => menuBtn.setFillStyle(0x555));
    menuBtn.on('pointerout',  () => menuBtn.setFillStyle(0x333));
    menuBtn.on('pointerdown', () => {
      this.scene.stop('Pause');
      this.scene.stop('Game');
      this.scene.start('Menu');
    });

    this.input.keyboard.on('keydown-SPACE', () => {
      this.scene.get('Game').togglePause();
    });
  }
}
