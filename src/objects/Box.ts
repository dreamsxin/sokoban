import { Direction, Orientation } from "../objects"

export class Box extends Phaser.Physics.Arcade.Sprite {
  private orientation: Orientation

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    orientation: Orientation
  ) {
    //@ts-ignore
    const { tileSize } = scene.game.config
    const startX = x * tileSize + tileSize / 2
    const startY = x * tileSize + tileSize / 2
    super(scene, startX, startY, "tiles", 3)

    this.orientation = orientation

    scene.add.existing(this)
    scene.physics.add.existing(this)
  }

  private move(direction: Direction) {
    if (this.orientation.isBlockingDirection(this, direction)) return

    const newPosition = this.orientation.getNextPosition(this, direction)
    this.setPosition(newPosition.x, newPosition.y)
  }
}
