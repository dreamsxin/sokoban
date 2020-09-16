import { Direction } from "./"

const Vector2 = Phaser.Math.Vector2
type Vector2 = Phaser.Math.Vector2

export class Orientation {
  private movementDirectionVectors: {
    [key in Direction]?: Vector2
  } = {
    [Direction.UP]: Vector2.UP,
    [Direction.DOWN]: Vector2.DOWN,
    [Direction.LEFT]: Vector2.LEFT,
    [Direction.RIGHT]: Vector2.RIGHT,
  }
  private scene: Phaser.Scene

  constructor(scene: Phaser.Scene) {
    this.scene = scene
  }

  private tilePosInDirection(
    sprite: Phaser.Physics.Arcade.Sprite,
    direction: Direction
  ): Vector2 {
    return this.getTilePos(sprite).add(this.movementDirectionVectors[direction])
  }

  private hasBlockingTile(pos: Vector2): boolean {
    return this.hasNoTile(pos) || this.hasCollidingTile(pos)
  }

  private hasNoTile(pos: Vector2): boolean {
    //@ts-ignore
    const { map } = this.scene
    return !map.layers.some((layer: Phaser.Tilemaps.StaticTilemapLayer) =>
      map.hasTileAt(pos.x, pos.y, layer.name)
    )
  }

  private hasCollidingTile(pos: Vector2): boolean {
    //@ts-ignore
    const { map } = this.scene
    return map.layers.some((layer: Phaser.Tilemaps.StaticTilemapLayer) => {
      const tile = map.getTileAt(pos.x, pos.y, false, layer.name)
      return tile && tile.properties.collides
    })
  }

  private getTilePos(
    sprite: Phaser.Physics.Arcade.Sprite
  ): Phaser.Math.Vector2 {
    //@ts-ignore
    const { tileSize } = this.scene.game.config
    const x = sprite.getCenter().x / tileSize
    const y = sprite.getCenter().y / tileSize
    return new Phaser.Math.Vector2(Math.floor(x), Math.floor(y))
  }

  isBlockingDirection(
    sprite: Phaser.Physics.Arcade.Sprite,
    direction: Direction
  ): boolean {
    return this.hasBlockingTile(this.tilePosInDirection(sprite, direction))
  }

  getNextPosition(sprite: Phaser.Physics.Arcade.Sprite, direction: Direction) {
    //@ts-ignore
    const { tileSize } = this.scene.game.config
    return sprite
      .getCenter()
      .add(
        this.movementDirectionVectors[direction]
          .clone()
          .multiply(new Vector2(tileSize))
      )
  }
}
