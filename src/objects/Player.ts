import { Direction, Orientation } from "../objects"

export class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
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
    const startY = y * tileSize + tileSize / 2
    super(scene, startX, startY, "tiles", 6)

    this.cursors = this.scene.input.keyboard.createCursorKeys()
    this.orientation = orientation

    scene.add.existing(this)
    scene.physics.add.existing(this)
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left)) {
      this.setFrame(7)
      this.move(Direction.LEFT)
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.right)) {
      this.setFrame(5)
      this.move(Direction.RIGHT)
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
      this.setFrame(4)
      this.move(Direction.UP)
    } else if (Phaser.Input.Keyboard.JustDown(this.cursors.down)) {
      this.setFrame(6)
      this.move(Direction.DOWN)
    }
  }

  private move(direction: Direction) {
    if (this.orientation.isBlockingDirection(this, direction)) return

    const box = this.orientation.getBoxInDirection(this, direction)
    if (box) {
      if (this.orientation.isBlockingDirection(box, direction)) return
      box.move(direction)
    }

    const newPosition = this.orientation.getNextPosition(this, direction)
    this.setPosition(newPosition.x, newPosition.y)
  }
}
