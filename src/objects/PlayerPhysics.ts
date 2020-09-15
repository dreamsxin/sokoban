import { Direction } from "./"

export class PlayerPhysics {
  private movementDirection = Direction.NONE

  constructor(
    private scene: Phaser.Scene,
    private object: InteractibleObject,
    private tileMap: Phaser.Tilemaps.Tilemap
  ) {}

  moveObject(direction: Direction): void {
    if (this.isMoving()) return
    if (this.isBlockingDirection(direction)) {
    } else {
      this.startMoving(direction)
    }
  }

  private isMoving(): boolean {
    return this.movementDirection != Direction.NONE
  }

  private startMoving(direction: Direction): void {
    this.movementDirection = direction
  }

  private isBlockingDirection(direction: Direction): boolean {
    return this.hasBlockingTile(this.tilePosInDirection(direction))
  }

  private tilePosInDirection(direction: Direction): Vector2 {
    return this.object
      .getTilePos()
      .add(this.movementDirectionVectors[direction])
  }

  private hasBlockingTile(pos: Vector2): boolean {
    if (this.hasNoTile(pos)) return true
    return this.tileMap.layers.some((layer) => {
      const tile = this.tileMap.getTileAt(pos.x, pos.y, false, layer.name)
      return tile && tile.properties.collides
    })
  }
}
