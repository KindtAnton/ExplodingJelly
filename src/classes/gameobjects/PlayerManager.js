import Player from './Player';

export default class PlayerManager {
  constructor(that) {
    this.gameScene = that;
    this.players = [];
    this.playerScores = [];
  }

  addPlayers(players) {
    this.i = 0;
    players.forEach(player => {
      this.players[this.i] = new Player(player[0], player[1]);
      this.i ++;
    });
    this.players[0].set(`play`);

    this.i = 0;
    this.players.forEach(player => {
      this.gameScene.add.sprite(80 + this.i * 155, 125, `${player.color}Jelly`);
      this.gameScene.add
        .text(80 + this.i * 155, 185, `${player.name}`, this.textConfig(player))
        .setOrigin(0.5, 0);
      this.playerScores[this.i] = this.gameScene.add
        .text(
          80 + this.i * 155,
          220,
          `${player.score}`,
          this.textConfig(player)
        )
        .setOrigin(0.5, 0);
      this.i ++;
    });
  }

  textConfig(player) {
    return {
      fontFamily: 'Ubuntu',
      fontStyle: 'Bold',
      fontSize: 24,
      color: `${player.color}`
    };
  }

  updatePlayer(verify) {
    if (verify === true) {
      //voor als de speler op een verkeerde jelly druk dat de beurt niet veranderd.
      if (this.players.length === 4) {
        if (this.players[0].active) {
          this.players[0].set(`standby`);
          this.players[1].set(`play`);
          this.players[2].set(`standby`);
          this.players[3].set(`standby`);
        } else if (this.players[1].active) {
          this.players[0].set(`standby`);
          this.players[1].set(`standby`);
          this.players[2].set(`play`);
          this.players[3].set(`standby`);
        } else if (this.players[2].active) {
          this.players[0].set(`standby`);
          this.players[1].set(`standby`);
          this.players[2].set(`standby`);
          this.players[3].set(`play`);
        } else if (this.players[3].active) {
          this.players[0].set(`play`);
          this.players[1].set(`standby`);
          this.players[2].set(`standby`);
          this.players[3].set(`standby`);
        }
      }
      if (this.players.length === 3) {
        if (this.players[0].active) {
          this.players[0].set(`standby`);
          this.players[1].set(`play`);
          this.players[2].set(`standby`);
        } else if (this.players[1].active) {
          this.players[0].set(`standby`);
          this.players[1].set(`standby`);
          this.players[2].set(`play`);
        } else if (this.players[2].active) {
          this.players[0].set(`play`);
          this.players[1].set(`standby`);
          this.players[2].set(`standby`);
        }
      }
      if (this.players.length === 2) {
        if (this.players[0].active) {
          this.players[0].set(`standby`);
          this.players[1].set(`play`);
        } else if (this.players[1].active) {
          this.players[0].set(`play`);
          this.players[1].set(`standby`);
        }
      }
      this.players.forEach(player => {
        if (player.active) {
          this.gameScene.vakjes.forEach(vakje => {
            vakje.setTexture(`${player.color}Vakje`);
          });
        }
      });
    }
  }
}
