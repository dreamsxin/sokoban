import { Direction, GridPhysics } from "./"

export class GridControls {
  constructor(
    private input: Phaser.Input.InputPlugin,
    private gridPhysics: GridPhysics
  ) {}

  update() {
    const cursors = this.input.keyboard.createCursorKeys()
    if (cursors.left.isDown) {
      this.gridPhysics.moveObject(Direction.LEFT)
    } else if (cursors.right.isDown) {
      this.gridPhysics.moveObject(Direction.RIGHT)
    } else if (cursors.up.isDown) {
      this.gridPhysics.moveObject(Direction.UP)
    } else if (cursors.down.isDown) {
      this.gridPhysics.moveObject(Direction.DOWN)
    }
  }
}
