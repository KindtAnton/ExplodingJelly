import JellyManager from '../gameobjects/JellyManager';
import PlayerManager from '../gameobjects/PlayerManager';
import Vakje from '../gameobjects/Vakje';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: `game`
    });
  }

  init(players) {
    this.vakjes = [];
    this.jellyManager = new JellyManager(this);
    this.playerManager = new PlayerManager(this);
    this.playerManager.addPlayers(players);
    this.pushed = 0;
  }

  preload() {}

  create() {
    this.add.image(
      this.sys.game.config.width / 2 + 9,
      this.sys.game.config.height - 181,
      `bg_game`
    );
    this.createVakjes();
    this.createReload();
    this.createBack();
  }

  update() {
    this.i = 0;
    this.playerManager.playerScores.forEach(score => {
      score.setText(`${this.playerManager.players[this.i].score}`);
      this.i ++;
    });

    this.jellyManager.update();
  }

  destroyTripleJellys(grow) {
    this.jellyManager.jellys.forEach(jellys => {
      jellys.forEach(jelly => {
        if (jelly) {
          if (jelly.grow === 3) {
            jelly.grow = grow;
            jelly.sprite.destroy();
            jelly.sprite = this.add.sprite(
              jelly.xPosition,
              jelly.yPosition,
              `${jelly.color}Jelly${jelly.grow}`
            );
          }
        }
      });
    });
  }

  createVakjes() {
    let vakjeId = - 1;
    for (let i = 0;i < 8;i ++) {
      for (let j = 0, id = vakjeId + 1;j < 8;j ++, id ++) {
        this.vakjes.push(
          new Vakje(
            this.add
              .sprite(
                100 + i * 60,
                335 + j * 60,
                `${this.playerManager.players[0].color}Vakje`
              )
              .setInteractive()
              .on(`pointerup`, () => {
                this.updateJelly(
                  i,
                  j,
                  100 + i * 60,
                  335 + j * 60,
                  this.playerManager.players,
                  id
                );
                this.specialAbility();
              }),
            id
          )
        );
        vakjeId = id;
      }
    }
  }

  specialAbility() {
    this.playerManager.players.forEach(player => {
      if (
        player.score > 100 &&
        this.pushed === 0 &&
        this.specialButton === undefined
      ) {
        this.specialButton = this.add
          .image(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 - 150,
            `specialButton`
          )
          .setInteractive()
          .on(`pointerup`, () => {
            this.destroyTripleJellys(2);
            this.specialButton.destroy();
            this.specialButton = undefined;
            this.pushed ++;
          });
      } else if (
        player.score > 200 &&
        this.pushed === 1 &&
        this.specialButton === undefined
      ) {
        this.specialButton = this.add
          .image(
            this.sys.game.config.width / 2,
            this.sys.game.config.height / 2 - 150,
            `specialButton`
          )
          .setInteractive()
          .on(`pointerup`, () => {
            this.destroyTripleJellys(1);
            this.specialButton.destroy();
            this.specialButton = undefined;
            this.pushed ++;
          });
      }
    });
  }

  updateJelly(x, y, xPosition, yPosition, players, vakjeId) {
    players.forEach(player => {
      if (player.active) {
        this.verify = this.jellyManager.verifyPlayerMove(
          x,
          y,
          xPosition,
          yPosition,
          player,
          vakjeId
        );
      }
    });
    this.playerManager.updatePlayer(this.verify);
  }

  checkWon() {
    this.color1;
    this.color2;
    this.i = 0;
    this.allTheSame = true;
    this.jellyManager.jellys.forEach(jellys => {
      jellys.forEach(jelly => {
        if (jelly !== undefined) {
          this.i ++;
          if (this.i === 1) {
            this.color1 = jelly.color;
            this.i ++;
          }
          if (this.i > 2) this.color2 = jelly.color;
          if (this.color1 !== this.color2 && this.i > 2)
            this.allTheSame = false;
        }
      });
    });
    if (this.allTheSame && this.i > 2)
      this.scene.start(`win`, {color: this.color1});
  }

  createReload() {
    this.reload = this.add.sprite(590, 30, `reload_game`).setInteractive();
    this.reload.on(`pointerdown`, () => {
      this.reload.setScale(1.1);
    });

    this.reload.on(`pointerup`, () => {
      this.reload.setScale(1);
      this.scene.restart();
    });
  }

  createBack() {
    this.back = this.add.sprite(30, 30, `back`).setInteractive();
    this.back.on(`pointerdown`, () => {
      this.back.setScale(1.1);
    });

    this.back.on(`pointerup`, () => {
      this.back.setScale(1);
      this.scene.start(`choose`);
    });
  }
}
