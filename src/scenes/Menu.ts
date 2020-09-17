import Phaser from "phaser"

export class Menu extends Phaser.Scene {
  private spacebar: Phaser.Input.Keyboard.Key

  constructor() {
    super("menu")
  }

  preload() {
    this.add.bitmapText(
      70,
      0,
      "font",
      `
        SOKOBAN\n
        \n
        USE THE ARROW KEYS TO MOVE ALL\n
        BOXES IN THE MARKED TILES\n
        \n
        PRESS 'R' ANYTIME TO RESET LEVEL\n
        \n
        PRESS SPACE TO START`,
      32,
      1
    )

    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    )
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
      this.scene.start("game", { level: 1 })
    }
  }
}
