import Phaser from "phaser"
import Game from "./scenes/Game"

const config = {
  width: 256,
  height: 276,
  backgroundColor: "0 x 000000",
  scene: [Game],
  pixelArt: true,
  zoom: 3,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
}

window.onload = () => {
  const Game = new Phaser.Game(config)
}
