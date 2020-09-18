import Phaser from "phaser"
import { Box, Orientation, Player, Header } from "../objects"

export class Game extends Phaser.Scene {
  private level: number = 1
  private header: Header
  private map: Phaser.Tilemaps.Tilemap
  private player: Player
  private boxes: Box[] = []
  private restartKey: Phaser.Input.Keyboard.Key

  constructor() {
    super("game")
  }

  init(data: { level: number }) {
    this.level = data.level
    localStorage.setItem("score", `${this.level}`)
  }

  preload() {
    const level = require(`../assets/tilemaps/level${this.level}.json`)
    this.load.tilemapTiledJSON(`map${this.level}`, level)
  }

  create() {
    this.header = new Header(this)
    this.header.setLevel(this.level)
    this.restartKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.R
    )

    this.map = this.make.tilemap({ key: `map${this.level}` })
    const tileset = this.map.addTilesetImage("sokoban_tileset", "tiles")
    this.map.createStaticLayer("Below Player", tileset, 0, 0)
    const world = this.map.createDynamicLayer("World", tileset, 0, 0)

    const orientation = new Orientation(this)

    const playerTile = this.findPlayerTile(world)
    this.player = new Player(this, playerTile.x, playerTile.y, orientation)

    const boxTiles = this.findBoxTiles(world)
    boxTiles.forEach((tile) => {
      this.boxes.push(new Box(this, tile.x, tile.y, orientation))
    })

    this.map.replaceByIndex(7, 3) // replace player tile with ground
    this.map.replaceByIndex(9, 3) // replace box tiles with ground
  }

  update(_time: number, delta: number) {
    if (Phaser.Input.Keyboard.JustDown(this.restartKey)) {
      this.restartLevel()
    }
    this.player.update()
  }

  private findPlayerTile(world: Phaser.Tilemaps.DynamicTilemapLayer) {
    const tile = world.findTile((tile) => tile.properties.isPlayer)
    return { x: tile.x, y: tile.y }
  }

  private findBoxTiles(world: Phaser.Tilemaps.DynamicTilemapLayer) {
    const positions: { x: number; y: number }[] = []
    world.forEachTile((tile) => {
      if (tile.properties.isBox) positions.push({ x: tile.x, y: tile.y })
    })
    return positions
  }

  restartLevel() {
    this.boxes = []
    this.scene.restart()
  }

  nextLevel() {
    this.scene.restart({ level: this.level + 1 })
  }
}
