import { Direction, Orientation } from "../objects"

export class Box extends Phaser.Physics.Arcade.Sprite {
  private orientation: Orientation
  private isPlaced: boolean

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    orientation: Orientation,
    isPlaced?: boolean
  ) {
    //@ts-ignore
    const { tileSize } = scene.game.config
    const startX = x * tileSize + tileSize / 2
    const startY = y * tileSize + tileSize / 2
    super(scene, startX, startY, "tiles", 8)

    this.orientation = orientation
    this.isPlaced = !!isPlaced

    scene.add.existing(this)
    scene.physics.add.existing(this)
  }

  move(direction: Direction) {
    if (this.orientation.isBlockingDirection(this, direction)) return

    const box = this.orientation.getBoxInDirection(this, direction)
    if (box) return

    const newPosition = this.orientation.getNextPosition(this, direction)
    this.setPosition(newPosition.x, newPosition.y)

    if (this.orientation.isMarkedPosition(this)) {
      this.setFrame(9)
      this.isPlaced = true
      //@ts-ignore
      if (this.orientation.areAllBoxesInPlace()) this.scene.nextLevel()
    } else {
      this.setFrame(8)
      this.isPlaced = false
    }
  }
}
