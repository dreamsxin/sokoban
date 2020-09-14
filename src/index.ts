import Phaser from "phaser"
import { Boot, Game } from "./scenes"

const config = {
  width: 256,
  height: 256,
  backgroundColor: "0 x 000000",
  scene: [Boot, Game],
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
