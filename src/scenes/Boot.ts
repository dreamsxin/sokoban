import Phaser from "phaser"
import { tileset } from "../assets/images"
import registerAnimations from "../animations"

export default class Boot extends Phaser.Scene {
  constructor() {
    super("boot")
  }
  preload() {
    this.load.spritesheet("tileset", tileset, {
      frameWidth: 32,
      startFrame: 0,
    })
  }
  create() {
    registerAnimations(this.anims)
    this.scene.start("game")
  }
}
