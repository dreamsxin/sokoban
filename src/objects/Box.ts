import { InteractibleObject } from "./"

export class Box extends InteractibleObject {
  constructor(
    sprite: Phaser.GameObjects.Sprite,
    startTilePosX: number,
    startTilePosY: number
  ) {
    super(sprite, startTilePosX, startTilePosY, 3)
  }
}
