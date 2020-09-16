import Phaser from "phaser"
import { level1 } from "../assets/tilemaps"
import { Orientation, Player } from "../objects"

export class Game extends Phaser.Scene {
  private player: Player
  private map: Phaser.Tilemaps.Tilemap

  constructor() {
    super("game")
  }

  preload() {
    this.load.tilemapTiledJSON("map", level1)
  }

  create() {
    this.map = this.make.tilemap({ key: "map" })
    const tileset = this.map.addTilesetImage("sokoban_tileset", "tiles")
    this.map.createStaticLayer("Below Player", tileset, 0, 0)
    this.map.createStaticLayer("World", tileset, 0, 0)

    const orientation = new Orientation(this)
    this.player = new Player(this, 1, 1, orientation)
  }

  update(_time: number, delta: number) {
    this.player.update()
  }
}
