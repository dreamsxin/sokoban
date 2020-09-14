import Phaser from "phaser"

export default class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "tiles", 12)

    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.cursors = scene.input.keyboard.createCursorKeys()
  }
  update() {
    const speed = 100
    const {
      body: { velocity },
      cursors: { up, right, down, left },
    } = this

    this.setVelocity(0)

    if (left?.isDown) this.setVelocityX(-speed)
    else if (right?.isDown) this.setVelocityX(speed)

    if (up?.isDown) this.setVelocityY(-speed)
    else if (down?.isDown) this.setVelocityY(speed)

    if (left.isDown) this.play("walk_left", true)
    else if (right.isDown) this.play("walk_right", true)
    else if (up.isDown) this.play("walk_up", true)
    else if (down.isDown) this.play("walk_down", true)
    else this.anims.stop()

    this.body.velocity.normalize().scale(speed)
  }
}
