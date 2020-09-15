import Phaser from "phaser"
import { Player } from "../objects"
import { level1 } from "../assets/tilemaps"

export class Game extends Phaser.Scene {
  static readonly CANVAS_WIDTH = 320
  static readonly CANVAS_HEIGHT = 320
  static readonly TILE_SIZE = 32

  private player: Player

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

    const playerSprite = this.physics.add.sprite(0, 0, "tiles")
    this.player = new Player(this, map, playerSprite, 1, 1)
  }
  update(_time: number, delta: number) {
    this.player.update(_time, delta)
  }
}
