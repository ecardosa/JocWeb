class GameScene extends Phaser.Scene {
  constructor() { super('Game'); }

  create() {
    this.speed = BASE_SPEED;
    this.score = 0;
    this.alive = true;
    this.paused = false;
    this.currentLane = 1;       
    this.moving = false;          

    this.road = this.add.tileSprite(W / 2, H / 2, W, H, 'road');

    this.sceneryGroup = this.add.group();
    this.spawnScenery();
    this.scTimer = this.time.addEvent({
      delay: 600, callback: this.spawnScenery, callbackScope: this, loop: true
    });

    this.player = this.physics.add.sprite(LANES[this.currentLane], CAR_Y, 'player');
    this.player.setCollideWorldBounds(true);
    this.player.body.setSize(46, 80);

    this.obstacles = this.physics.add.group();

    this.scheduleObstacle();

    this.physics.add.overlap(
      this.player, this.obstacles,
      this.handleCrash, null, this
    );

    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({ left: 'A', right: 'D' });
    this.input.keyboard.on('keydown-SPACE', this.togglePause, this);

    this.scoreTxt = this.add.text(16, 16, 'PUNTOS: 0', {
      fontSize: '20px', fontFamily: 'Impact', fill: '#f5c518',
      stroke: '#000', strokeThickness: 3
    });
    this.speedTxt = this.add.text(16, 42, 'VELOCIDAD: 0 km/h', {
      fontSize: '14px', fontFamily: 'Arial', fill: '#fff', stroke: '#000', strokeThickness: 2
    });
    this.add.text(W - 16, 16, 'SPACE = pausa', {
      fontSize: '13px', fontFamily: 'Arial', fill: '#aaa'
    }).setOrigin(1, 0);



    this.startTime = null;

    this.cameras.main.fadeIn(300);
  }

  scheduleObstacle() {
    const speedFactor = BASE_SPEED / this.speed;  
    const minDelay = Math.max(300,  OBSTACLE_INTERVAL_MIN  * speedFactor);
    const maxDelay = Math.max(500,  OBSTACLE_INTERVAL_MAX  * speedFactor);
    const delay = Phaser.Math.Between(minDelay, maxDelay);
    this.obstTimer = this.time.addEvent({
      delay, callback: this.spawnObstacle, callbackScope: this
    });
  }

  spawnObstacle() {
    if (!this.alive || this.paused) { this.scheduleObstacle(); return; }

    const lane = Phaser.Math.Between(0, 2);
    const typeRoll = Phaser.Math.Between(0, 2);
    let obs;

    if (typeRoll === 2) {
      obs = this.obstacles.create(LANES[lane], -60, 'tree');
      obs.body.setSize(68, 28).setOffset(6, 22);
    } else {
      const tex = typeRoll === 0 ? 'enemy1' : 'enemy2';
      obs = this.obstacles.create(LANES[lane], -60, tex);
      obs.body.setSize(46, 80);
    }

    obs.setVelocityY(this.speed * 0.55);
    this.scheduleObstacle();
  }

  spawnScenery() {
    const lt = this.add.image(Phaser.Math.Between(20, 68), -30, 'scTree')
      .setScale(Phaser.Math.FloatBetween(0.7, 1.2));
    this.sceneryGroup.add(lt);
    const rt = this.add.image(Phaser.Math.Between(412, 460), -30, 'scTree')
      .setScale(Phaser.Math.FloatBetween(0.7, 1.2));
    this.sceneryGroup.add(rt);
  }

  handleCrash(player, obs) {
    if (!this.alive) return;
    this.alive = false;

    this.cameras.main.shake(400, 0.02);
    this.cameras.main.flash(300, 255, 50, 0);

    player.setTint(0xff0000);
    obs.setVelocityY(0);

    this.time.delayedCall(900, () => {
      this.scene.start('GameOver', { score: Math.floor(this.score) });
    });
  }

  togglePause() {
    if (!this.alive) return;
    this.paused = !this.paused;
    if (this.paused) {
      this.physics.pause();
      this.scTimer.paused = true;
      this.scene.launch('Pause');
    } else {
      this.physics.resume();
      this.scTimer.paused = false;
      this.scene.stop('Pause');
    }
  }

  update(time, delta) {
    if (!this.alive || this.paused) return;

    const dt = delta / 1000;

    this.road.tilePositionY -= this.speed * dt;

    if (this.startTime === null) this.startTime = time;
    this.speed = BASE_SPEED + ((time - this.startTime) / 1000) * ACCEL;

    this.score += this.speed * dt * 0.04;
    this.scoreTxt.setText('PUNTOS: ' + Math.floor(this.score));
    this.speedTxt.setText('VELOCIDAD: ' + Math.round(this.speed * 0.12) + ' km/h');

    this.obstacles.children.iterate(obs => {
      if (obs && obs.active) {
        obs.setVelocityY(this.speed * 0.55);
        if (obs.y > H + 80) obs.destroy();
      }
    });

    this.sceneryGroup.children.iterate(sc => {
      if (sc && sc.active) {
        sc.y += this.speed * dt * 0.7;
        if (sc.y > H + 80) sc.destroy();
      }
    });

    if (!this.moving) {
      const leftPressed  = Phaser.Input.Keyboard.JustDown(this.cursors.left)  ||
                           Phaser.Input.Keyboard.JustDown(this.wasd.left);
      const rightPressed = Phaser.Input.Keyboard.JustDown(this.cursors.right) ||
                           Phaser.Input.Keyboard.JustDown(this.wasd.right);

      if (leftPressed && this.currentLane > 0) {
        this.switchLane(-1);
      } else if (rightPressed && this.currentLane < 2) {
        this.switchLane(1);
      }
    }


  }

  switchLane(dir) {
    this.currentLane += dir;
    this.moving = true;
    const targetX = LANES[this.currentLane];
    this.tweens.add({
      targets: this.player,
      x: targetX,
      duration: 160,
      ease: 'Quad.easeOut',
      onComplete: () => { this.moving = false; }
    });

    const tiltAngle = dir * -12;
    this.tweens.add({
      targets: this.player,
      angle: tiltAngle,
      duration: 80,
      yoyo: true,
      ease: 'Quad.easeOut'
    });
  }
}