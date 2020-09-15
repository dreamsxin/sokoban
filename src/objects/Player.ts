import { GridPhysics, Direction } from "./"
import { Game } from "../scenes"

export class Player {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private playerPhysics: GridPhysics

  constructor(
    private scene: Phaser.Scene,
    private map: Phaser.Tilemaps.Tilemap,
    private sprite: Phaser.GameObjects.Sprite,
    startTilePosX: number,
    startTilePosY: number
  ) {
    sprite.setPosition(
      startTilePosX * Game.TILE_SIZE + this.objectOffsetX(),
      startTilePosY * Game.TILE_SIZE + this.objectOffsetY()
    )
    this.sprite.setFrame(12)
    this.cursors = this.scene.input.keyboard.createCursorKeys()
    this.playerPhysics = new GridPhysics(this, this.map)
  }

  update(_time: number, delta: number) {
    this.playerPhysics.update(delta)

    if (this.cursors.left.isDown) {
      this.playerPhysics.moveObject(Direction.LEFT)
    } else if (this.cursors.right.isDown) {
      this.playerPhysics.moveObject(Direction.RIGHT)
    } else if (this.cursors.up.isDown) {
      this.playerPhysics.moveObject(Direction.UP)
    } else if (this.cursors.down.isDown) {
      this.playerPhysics.moveObject(Direction.DOWN)
    }
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
