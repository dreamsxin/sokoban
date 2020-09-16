import Phaser from "phaser"
import { level1 } from "../assets/tilemaps"

export class Game extends Phaser.Scene {
  constructor() {
    super("game")
  }
  preload() {
    this.load.tilemapTiledJSON("map", level1)
  }
  create() {
    const map = this.make.tilemap({ key: "map" })
    const tileset = map.addTilesetImage("sokoban_tileset", "tiles")
    map.createStaticLayer("Below Player", tileset, 0, 0)
    map.createStaticLayer("World", tileset, 0, 0)
  }
  update(_time: number, delta: number) {}
}
