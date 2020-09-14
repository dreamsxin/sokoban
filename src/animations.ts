const registerAnimations = (anims: Phaser.Animations.AnimationManager) => {
  anims.create({
    key: "walk_up",
    frames: anims.generateFrameNumbers("tiles", {
      start: 4,
      end: 7,
    }),
    frameRate: 7,
    repeat: -1,
  })
  anims.create({
    key: "walk_right",
    frames: anims.generateFrameNumbers("tiles", {
      start: 8,
      end: 11,
    }),
    frameRate: 7,
    repeat: -1,
  })
  anims.create({
    key: "walk_down",
    frames: anims.generateFrameNumbers("tiles", {
      start: 12,
      end: 15,
    }),
    frameRate: 7,
    repeat: -1,
  })
  anims.create({
    key: "walk_left",
    frames: anims.generateFrameNumbers("tiles", {
      start: 16,
      end: 19,
    }),
    frameRate: 7,
    repeat: -1,
  })
}

export default registerAnimations
