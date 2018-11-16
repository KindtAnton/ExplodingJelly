import JellyManager from '../gameobjects/JellyManager';
import PlayerManager from '../gameobjects/PlayerManager';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: `game`
    });
  }

  init() {
    this.vakjes = [];
    this.jellyManager = new JellyManager(this);
    this.playerManager = new PlayerManager(this);
    this.playerManager.addPlayers(
      `Jasper`,
      `blue`,
      `Frederik`,
      `red`,
      `Jasper`,
      `orange`,
      `Hello`,
      `purple`
    );
  }

  preload() {}

  create() {
    this.add.image(
      this.sys.game.config.width / 2 + 9,
      this.sys.game.config.height - 181,
      `bg_game`
    );

    this.anims.create({
      key: `redAnimatie`,
      frames: this.anims.generateFrameNames(`redJellys`, {
        prefix: `assets_`,
        start: 900,
        end: 989,
        zeroPad: 0,
        suffix: `.png`
      }),
      frameRate: 22,
      repeat: - 1
    });
    this.anims.create({
      key: `purpleAnimatie`,
      frames: this.anims.generateFrameNames(`purpleJellys`, {
        prefix: `assets_`,
        start: 1000,
        end: 1089,
        zeroPad: 0,
        suffix: `.png`
      }),
      frameRate: 23,
      repeat: - 1
    });
    // this.add
    //   .sprite(160, 100, `redJellys`, `assets_900.png`)
    //   .play('redAnimatie');
    // this.add
    //   .sprite(460, 100, `purpleJellys`, `assets_1000.png`)
    //   .play('purpleAnimatie');

    this.reload = this.add.sprite(590, 30, `reload_game`).setInteractive();

    this.createVakjes();
    this.createReload();
  }

  update() {
    this.playerManager.playerScore1.setText(
      `${this.playerManager.player1.score}`
    );
    this.playerManager.playerScore2.setText(
      `${this.playerManager.player2.score}`
    );
  }

  createVakjes() {
    for (let i = 0;i < 8;i ++) {
      for (let j = 0;j < 8;j ++) {
        this.vakjes.push(
          this.add
            .sprite(100 + i * 60, 335 + j * 60, `blueVakje`)
            .setInteractive()
            .on(`pointerup`, () =>
              this.updateJelly(
                i,
                j,
                100 + i * 60,
                335 + j * 60,
                this.playerManager.player1,
                this.playerManager.player2,
                this.playerManager.player3,
                this.playerManager.player4
              )
            )
        );
      }
    }
  }

  updateJelly(x, y, xPosition, yPosition, player1, player2, player3, player4) {
    if (
      player1 !== undefined &&
      player2 !== undefined &&
      player3 !== undefined &&
      player4 !== undefined
    ) {
      if (player1.active) {
        this.verify = this.jellyManager.verifyPlayerMove(
          x,
          y,
          xPosition,
          yPosition,
          player1
        );
      } else if (player2.active) {
        this.verify = this.jellyManager.verifyPlayerMove(
          x,
          y,
          xPosition,
          yPosition,
          player2
        );
      } else if (player3.active) {
        this.verify = this.jellyManager.verifyPlayerMove(
          x,
          y,
          xPosition,
          yPosition,
          player3
        );
      } else if (player4.active) {
        this.verify = this.jellyManager.verifyPlayerMove(
          x,
          y,
          xPosition,
          yPosition,
          player4
        );
      }
      this.playerManager.updatePlayer(this.verify);
    }
    if (
      player1 !== undefined &&
      player2 !== undefined &&
      player3 !== undefined &&
      player4 === undefined
    ) {
      if (player1.active) {
        this.verify = this.jellyManager.verifyPlayerMove(
          x,
          y,
          xPosition,
          yPosition,
          player1
        );
      } else if (player2.active) {
        this.verify = this.jellyManager.verifyPlayerMove(
          x,
          y,
          xPosition,
          yPosition,
          player2
        );
      } else if (player3.active) {
        this.verify = this.jellyManager.verifyPlayerMove(
          x,
          y,
          xPosition,
          yPosition,
          player3
        );
      }
      this.playerManager.updatePlayer(this.verify);
    }
    if (
      player1 !== undefined &&
      player2 !== undefined &&
      player3 === undefined &&
      player4 === undefined
    ) {
      if (player1.active) {
        this.verify = this.jellyManager.verifyPlayerMove(
          x,
          y,
          xPosition,
          yPosition,
          player1
        );
      } else if (player2.active) {
        this.verify = this.jellyManager.verifyPlayerMove(
          x,
          y,
          xPosition,
          yPosition,
          player2
        );
      }
      this.playerManager.updatePlayer(this.verify);
    }
  }

  createReload() {
    this.reload.on(`pointerdown`, () => {
      this.reload.setScale(1.1);
    });

    this.reload.on(`pointerup`, () => {
      this.reload.setScale(1);
      this.scene.restart();
    });
  }
}
