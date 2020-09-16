import { Direction } from "../objects"

const Vector2 = Phaser.Math.Vector2
type Vector2 = Phaser.Math.Vector2

export class Player extends Phaser.Physics.Arcade.Sprite {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private movementDirectionVectors: {
    [key in Direction]?: Vector2
  }

  constructor(scene: Phaser.Scene, x: number, y: number) {
    //@ts-ignore
    const { tileSize } = scene.game.config
    const startX = x * tileSize + tileSize / 2
    const startY = x * tileSize + tileSize / 2
    super(scene, startX, startY, "tiles", 12)

    this.cursors = this.scene.input.keyboard.createCursorKeys()
    this.movementDirectionVectors = {
      [Direction.UP]: Vector2.UP,
      [Direction.DOWN]: Vector2.DOWN,
      [Direction.LEFT]: Vector2.LEFT,
      [Direction.RIGHT]: Vector2.RIGHT,
    }

    scene.add.existing(this)
    scene.physics.add.existing(this)
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.cursors.left))
      this.move(Direction.LEFT)
    else if (Phaser.Input.Keyboard.JustDown(this.cursors.right))
      this.move(Direction.RIGHT)
    else if (Phaser.Input.Keyboard.JustDown(this.cursors.up))
      this.move(Direction.UP)
    else if (Phaser.Input.Keyboard.JustDown(this.cursors.down))
      this.move(Direction.DOWN)
  }

  private move(direction: Direction) {
    //@ts-ignore
    const { tileSize } = this.scene.game.config

    if (this.isBlockingDirection(direction)) return

    const newPosition = this.getCenter().add(
      this.movementDirectionVectors[direction]
        .clone()
        .multiply(new Vector2(tileSize))
    )

    this.setPosition(newPosition.x, newPosition.y)
  }

  private isBlockingDirection(direction: Direction): boolean {
    return this.hasBlockingTile(this.tilePosInDirection(direction))
  }

  private tilePosInDirection(direction: Direction): Vector2 {
    return this.getTilePos().add(this.movementDirectionVectors[direction])
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

  private getTilePos(): Phaser.Math.Vector2 {
    //@ts-ignore
    const { tileSize } = this.scene.game.config
    const x = this.getCenter().x / tileSize
    const y = this.getCenter().y / tileSize
    return new Phaser.Math.Vector2(Math.floor(x), Math.floor(y))
  }
}
