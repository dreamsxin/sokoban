import Phaser from "phaser"
import { Game } from "../scenes"

export class InteractibleObject {
  public static readonly SPRITE_FRAME_WIDTH = 32
  public static readonly SPRITE_FRAME_HEIGHT = 32

  constructor(
    private sprite: Phaser.GameObjects.Sprite,
    startTilePosX: number,
    startTilePosY: number,
    frame: number
  ) {
    this.sprite.setPosition(
      startTilePosX * Game.TILE_SIZE + this.objectOffsetX(),
      startTilePosY * Game.TILE_SIZE + this.objectOffsetY()
    )
    this.sprite.setFrame(frame)
  }

  private objectOffsetX(): number {
    return Game.TILE_SIZE / 2
  }
  private objectOffsetY(): number {
    return Game.TILE_SIZE / 2
  }

  getPosition(): Phaser.Math.Vector2 {
    return this.sprite.getCenter()
  }

  setPosition(position: Phaser.Math.Vector2): void {
    this.sprite.setPosition(position.x, position.y)
  }

  getTilePos(): Phaser.Math.Vector2 {
    const x =
      (this.sprite.getCenter().x - this.objectOffsetX()) / Game.TILE_SIZE
    const y =
      (this.sprite.getCenter().y - this.objectOffsetY()) / Game.TILE_SIZE
    return new Phaser.Math.Vector2(Math.floor(x), Math.floor(y))
  }
}
