import Phaser from "phaser"

export default class Player extends Phaser.GameObjects.Sprite {
  private cursors?: Phaser.Types.Input.Keyboard.CursorKeys

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "tileset", 12)
    scene.add.existing(this)

    this.cursors = scene.input.keyboard.createCursorKeys()
  }
  update() {
    const {
      anims,
      cursors: { up, right, down, left },
    } = this

    if (up?.isDown) anims.play("walk_up", true)
    if (down?.isDown) anims.play("walk_down", true)
    if (right?.isDown) anims.play("walk_right", true)
    if (left?.isDown) anims.play("walk_left", true)

    if (anims.currentAnim && up.isUp && down.isUp && right.isUp && left.isUp) {
      anims.pause()
      anims.restart()
    }
  }
}
