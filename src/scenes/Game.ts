import Phaser from "phaser"
import { Player, GridControls, GridPhysics, Box } from "../objects"
import { level1 } from "../assets/tilemaps"

export class Game extends Phaser.Scene {
  static readonly CANVAS_WIDTH = 320
  static readonly CANVAS_HEIGHT = 320
  static readonly TILE_SIZE = 32

  private gridControls: GridControls
  private gridPhysics: GridPhysics
  private boxes: Box[] = []

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

    // todo: create sprite from tileset number
    const playerSprite = this.physics.add.sprite(0, 0, "tiles")
    const boxSprite = this.physics.add.sprite(0, 0, "tiles")

    const box = new Box(boxSprite, 2, 2)
    this.boxes.push(box)
    this.gridPhysics = new GridPhysics(this, box, map)
    this.gridPhysics = new GridPhysics(
      this,
      new Player(playerSprite, 1, 1),
      map
    )
    this.gridControls = new GridControls(this.input, this.gridPhysics)
  }
  update(_time: number, delta: number) {
    this.gridControls.update()
    this.gridPhysics.update(delta)
  }
}
