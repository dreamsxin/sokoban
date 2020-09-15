import { GridPhysics, Direction } from "./"
import { Game } from "../scenes"

export class Box {
  private boxPhysics: GridPhysics

  constructor(
    private scene: Phaser.Scene,
    private map: Phaser.Tilemaps.Tilemap,
    private sprite: Phaser.GameObjects.Sprite,
    startTilePosX: number,
    startTilePosY: number
  ) {
    sprite.setPosition(
      startTilePosX * Game.TILE_SIZE + this.objectOffsetX(),
      startTilePosY * Game.TILE_SIZE + this.objectOffsetY()
    )
    this.sprite.setFrame(3)
    this.boxPhysics = new GridPhysics(this, this.map, this.scene)
  }

  update(_time: number, delta: number) {
    this.boxPhysics.update(delta)
  }

  moveObject(direction: Direction) {
    this.boxPhysics.moveObject(direction)
  }

  private objectOffsetX(): number {
    return Game.TILE_SIZE / 2
  }
  private objectOffsetY(): number {
    return Game.TILE_SIZE / 2
  }

  getPosition(): Phaser.Math.Vector2 {
    return this.sprite.getCenter()
  }

  setPosition(position: Phaser.Math.Vector2): void {
    this.sprite.setPosition(position.x, position.y)
  }

  getTilePos(): Phaser.Math.Vector2 {
    const x =
      (this.sprite.getCenter().x - this.objectOffsetX()) / Game.TILE_SIZE
    const y =
      (this.sprite.getCenter().y - this.objectOffsetY()) / Game.TILE_SIZE
    return new Phaser.Math.Vector2(Math.floor(x), Math.floor(y))
  }
}
