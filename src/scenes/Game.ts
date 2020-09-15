import Phaser from "phaser"
import { Player, GridControls, GridPhysics } from "../objects"
import { level1 } from "../assets/tilemaps"

export class Game extends Phaser.Scene {
  static readonly CANVAS_WIDTH = 320
  static readonly CANVAS_HEIGHT = 320
  static readonly TILE_SIZE = 32

  private player?: Player
  private gridControls: GridControls
  private gridPhysics: GridPhysics

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

    this.gridPhysics = new GridPhysics(new Player(playerSprite, 1, 1), map)
    this.gridControls = new GridControls(this.input, this.gridPhysics)
  }
  update(_time: number, delta: number) {
    this.gridControls.update()
    this.gridPhysics.update(delta)
  }
}
