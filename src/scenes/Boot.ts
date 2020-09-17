import Phaser from "phaser"
import { tiles } from "../assets/images"

export class Boot extends Phaser.Scene {
  constructor() {
    super("boot")
  }
  preload() {
    this.load.spritesheet("tiles", tiles, {
      frameWidth: 32,
      startFrame: 0,
    })
  }
  create() {
    this.scene.start("game", { level: 1 })
  }
}
