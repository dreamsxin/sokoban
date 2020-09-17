import Phaser from "phaser"
import { tiles } from "../assets/images"
import { level1 } from "../assets/tilemaps"
import { Box, Orientation, Player } from "../objects"

export class Game extends Phaser.Scene {
  private map: Phaser.Tilemaps.Tilemap
  private player: Player
  private boxes: Box[] = []

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
}
