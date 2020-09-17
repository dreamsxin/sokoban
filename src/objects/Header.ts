import Phaser from "phaser"

export class Header extends Phaser.GameObjects.Graphics {
  private levelLabel: Phaser.GameObjects.BitmapText
  private movesLabel: Phaser.GameObjects.BitmapText

  constructor(scene: Phaser.Scene) {
    super(scene)
    const { width: gameWidth, height: gameHeight } = scene.game.config

    this.levelLabel = scene.add.bitmapText(10, 5, "font", "LEVEL 0", 32)
    this.levelLabel.setDepth(1)

    this.movesLabel = scene.add.bitmapText(
      +gameWidth - 120,
      5,
      "font",
      "MOVES 0",
      32
    )
    this.movesLabel.setDepth(1)
  }

  setLevel(amount: number) {
    this.levelLabel.text = `LIVES ${amount}`
  }

  setMoves(amount: number) {
    this.movesLabel.text = `MOVES ${amount}`
  }
}
