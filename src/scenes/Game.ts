import Phaser from "phaser"
import { tileset } from "../assets/images"

export default class Game extends Phaser.Scene {
  constructor() {
    super("game")
  }
  preload() {
    this.load.spritesheet("tileset", tileset, {
      frameWidth: 32,
      startFrame: 0,
    })
  }
  create() {
    const level = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 1, 1, 3, 1, 1, 1, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 1, 1, 1, 1, 1, 1, 0],
      [0, 2, 1, 1, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]
    const map = this.make.tilemap({
      data: level,
      tileWidth: 32,
      tileHeight: 32,
    })

    const tileset = map.addTilesetImage("tileset")
    const layer = map.createStaticLayer(0, tileset)

    this.add.sprite(175, 80, "tileset", 12)
  }
}
