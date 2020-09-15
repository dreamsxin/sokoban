import { Game } from "../scenes"
import { Direction, Player, Box } from "./"

const Vector2 = Phaser.Math.Vector2
type Vector2 = Phaser.Math.Vector2

export class GridPhysics {
  private readonly speedPixelsPerSecond: number = Game.TILE_SIZE * 4
  private tileSizePixelsWalked: number = 0
  private decimalPlacesLeft = 0
  private movementDirection = Direction.NONE
  private movementDirectionVectors: {
    [key in Direction]?: Vector2
  } = {
    [Direction.UP]: Vector2.UP,
    [Direction.DOWN]: Vector2.DOWN,
    [Direction.LEFT]: Vector2.LEFT,
    [Direction.RIGHT]: Vector2.RIGHT,
  }

  constructor(
    private object: Player | Box,
    private tileMap: Phaser.Tilemaps.Tilemap,
    private scene: Phaser.Scene
  ) {}

  moveObject(direction: Direction): void {
    if (this.isMoving()) return
    if (this.isBlockingDirection(direction)) return

    const frontBox = this.getFrontBox(direction)
    if (frontBox) {
      if (frontBox.isBlocked(direction)) return
      else frontBox.moveObject(direction)
    }

    this.startMoving(direction)
  }

  update(delta: number) {
    if (this.isMoving()) {
      this.updatePlayerPosition(delta)
    }
  }

  private getFrontBox(direction: Direction): Box {
    const frontTilePosition = this.tilePosInDirection(direction)
    // @ts-ignore
    return this.scene.boxes.find((box: Box) => {
      const boxTilePosition = box.getTilePos()
      return (
        JSON.stringify(boxTilePosition) === JSON.stringify(frontTilePosition)
      )
    })
  }

  private tilePosInDirection(direction: Direction): Vector2 {
    return this.object
      .getTilePos()
      .add(this.movementDirectionVectors[direction])
  }

  isBlockingDirection(direction: Direction): boolean {
    return this.hasBlockingTile(this.tilePosInDirection(direction))
  }

  private hasNoTile(pos: Vector2): boolean {
    return !this.tileMap.layers.some((layer) =>
      this.tileMap.hasTileAt(pos.x, pos.y, layer.name)
    )
  }

  private hasBlockingTile(pos: Vector2): boolean {
    if (this.hasNoTile(pos)) return true
    return this.tileMap.layers.some((layer) => {
      const tile = this.tileMap.getTileAt(pos.x, pos.y, false, layer.name)
      return tile && tile.properties.collides
    })
  }

  private getSpeedPerDelta(delta: number): number {
    const deltaInSeconds = delta / 1000
    return this.speedPixelsPerSecond * deltaInSeconds
  }

  private getIntegerPart(float: number): number {
    return Math.floor(float)
  }

  private getDecimalPlaces(float: number): number {
    return float % 1
  }

  private willCrossTileBorderThisUpdate(
    pixelsToWalkThisUpdate: number
  ): boolean {
    return this.tileSizePixelsWalked + pixelsToWalkThisUpdate >= Game.TILE_SIZE
  }

  private moveObjectSprite(speed: number): void {
    const newObjectPos = this.object
      .getPosition()
      .add(this.movementDistance(speed))
    this.object.setPosition(newObjectPos)
    this.tileSizePixelsWalked += speed
    this.tileSizePixelsWalked %= Game.TILE_SIZE
  }

  private movementDistance(speed: number): Vector2 {
    return this.movementDirectionVectors[this.movementDirection]
      .clone()
      .multiply(new Vector2(speed))
  }

  private moveObjectSpriteRestOfTile() {
    this.moveObjectSprite(Game.TILE_SIZE - this.tileSizePixelsWalked)
    this.stopMoving()
  }

  private stopMoving(): void {
    this.movementDirection = Direction.NONE
  }

  private updatePlayerPosition(delta: number) {
    this.decimalPlacesLeft = this.getDecimalPlaces(
      this.getSpeedPerDelta(delta) + this.decimalPlacesLeft
    )
    const pixelsToWalkThisUpdate = this.getIntegerPart(
      this.getSpeedPerDelta(delta) + this.decimalPlacesLeft
    )

    if (this.willCrossTileBorderThisUpdate(pixelsToWalkThisUpdate)) {
      this.moveObjectSpriteRestOfTile()
    } else {
      this.moveObjectSprite(pixelsToWalkThisUpdate)
    }
  }

  private isMoving(): boolean {
    return this.movementDirection != Direction.NONE
  }

  private startMoving(direction: Direction): void {
    this.movementDirection = direction
  }
}
