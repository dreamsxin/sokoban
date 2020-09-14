import Phaser from "phaser"
import { Player } from "../objects"
import { level1 } from "../assets/tilemaps"

export default class Game extends Phaser.Scene {
  private player?: Player

  constructor() {
    super("game")
  }
  preload() {
    this.load.tilemapTiledJSON("map", level1)
  }
  create() {
    const map = this.make.tilemap({ key: "map" })
    const tileset = map.addTilesetImage("sokoban_tileset", "tiles")
    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0)
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0)

    // this.player = new Player(this, 48, 48)
  }
  update() {
    // this.player.update()
  }
}
