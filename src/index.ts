import Phaser from "phaser"
import { Boot, Game } from "./scenes"

const config = {
  width: 320,
  height: 320,
  backgroundColor: "0 x 000000",
  scene: [Boot, Game],
  pixelArt: true,
  zoom: 3,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
}

window.onload = () => {
  const game = new Phaser.Game(config)
  //@ts-ignore
  game.config.tileSize = 32
}
