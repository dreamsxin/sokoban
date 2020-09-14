import Phaser from "phaser"
import { Player } from "../objects"

export default class Game extends Phaser.Scene {
  private player?: Player

  constructor() {
    super("game")
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

    this.player = new Player(this, 48, 48)
  }
  update() {
    this.player.update()
  }
}
