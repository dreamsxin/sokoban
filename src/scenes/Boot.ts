import Phaser from "phaser"
import { tiles } from "../assets/images"
import { font, fontXML } from "../assets/font"

export class Boot extends Phaser.Scene {
  constructor() {
    super("boot")
  }
  preload() {
    this.load.bitmapFont("font", font, fontXML)
    this.load.spritesheet("tiles", tiles, {
      frameWidth: 32,
      startFrame: 0,
    })
  }
  create() {
    this.scene.start("menu")
  }
}
