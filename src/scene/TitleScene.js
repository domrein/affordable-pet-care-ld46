/*
Paul Milham
4/18/20
*/

import Game from "../pxl/core/Game.js";
import Scene from "../pxl/scene/Scene.js";
import Actor from "../pxl/actor/Actor.js";
import Body from "../pxl/actor/Body.js";
import Sprite from "../pxl/actor/Sprite.js";
import Text from "../pxl/actor/Text.js";
import Point from "../pxl/core/Point.js";
import Button from "../pxl/actor/Button.js";
import PlayScene from "./PlayScene.js";

export default class TitleScene extends Scene {
  /**
   * @param {Game} game
   */
  constructor(game) {
    super(game);

    this.addLayer("background");
    this.addLayer("ui");
  }

  init() {
    this.game.audioMixer.play("titleMusic");

    const background = Actor.build(this, {graphic: {name: "titleBackground"}});
    this.addActor(background);
    // [
    //   {name: "Background", x: 0, y: 0},
    //   {name: "HomeText", x: 35, y: 20},
    //   {name: "TeachingText", x: 20, y: 65},
    //   {name: "HeroText", x: 50, y: 92},
    // ].forEach((g, i) => {
    //   const graphic = new Actor(this);
    //   graphic.graphics.push(new Sprite(graphic));
    //   graphic.graphics[0].play(`titleBlast${g.name}`);
    //   graphic.graphics[0].layerName = "ui";
    //   graphic.graphics[0].scale.y = 0;
    //   graphic.graphics[0].scale.x = 0;
    //   graphic.body = new Body();
    //   graphic.body.x = 24 + g.x;
    //   graphic.body.y = 20 + g.y;
    //   this.addActor(graphic);
    //
    //   this.tween.add(
    //     graphic.graphics[0].scale,
    //     ["x", "y"],
    //     0,
    //     1,
    //     30,
    //     "outElastic",
    //     {delay: i * 20},
    //   );
    // });

    // for (let i = 0; i < Math.ceil(this.game.width / 16) + 1; i++) {
    //   for (let j = 0; j < Math.ceil(this.game.height / 16) + 1; j++) {
    //     const tile = new Actor(this);
    //     tile.graphics.push(new Sprite(tile));
    //     tile.graphics[0].play("titleBackgroundTile");
    //     tile.graphics[0].layerName = "background";
    //     tile.body = new Body();
    //     tile.body.velocity.x = -15;
    //     tile.body.velocity.y = 30;
    //     // tile.body.x = this.game.responsiveLeft + i * 16 - 16;
    //     // tile.body.y = this.game.responsiveTop + j * 16 - 16;
    //     tile.body.x = i * 16 - 16;
    //     tile.body.y = j * 16 - 16;
    //     this.addActor(tile);
    //     this.tiles.push(tile);
    //   }
    // }

    // const tile = new Actor(this);
    // tile.graphics.push(new Sprite(tile));
    // tile.graphics[0].play("titleBackgroundTile");
    // tile.graphics[0].layerName = "background";
    // tile.body = new Body();
    // this.addActor(tile);
    // this.tiles.push(tile);
    //
    // this.tween.add(
    //   this.tiles[0].body,
    //   "x",
    //   0,
    //   200,
    //   1,
    //   {easing: "inOutSine",}
    // );

    // this.titleGraphic = new Actor(this);
    // this.titleGraphic.graphics.push(new Sprite(this.titleGraphic));
    // this.titleGraphic.graphics[0].play("titleBackground");
    // this.titleGraphic.body = new Body();
    // this.addActor(this.titleGraphic);

    // this.playButton = new Button(this, "playButton");
    // this.playButton.body.x = 90;
    // this.playButton.body.y = this.game.responsiveBottom + 40;
    // this.playButton.body.beacon.observe(this, "touchStarted", this.onPlayButtonTouchStarted);
    // this.addActor(this.playButton);
    // this.tween.add(
    //   this.playButton.body,
    //   "y",
    //   this.game.responsiveBottom + 40,
    //   this.game.responsiveBottom - 50,
    //   30,
    //   "inOutSine",
    //   {delay: 60}
    // );
    this.input.beacon.observe(this, "keyPressed", (owner, data) => {
      this.switchScene(PlayScene, null, {burgers: 1});
    });
  }

  /**
   * @param {number} delta
   */
  update(delta) {
    super.update(delta);

    // this.tiles.forEach(t => {
    //   // t.body.x -= .3;
    //   // t.body.y += .5;
    //   while (t.body.x + 16 < 0) {
    //     t.body.x += this.game.width + 16;
    //   }
    //   while (t.body.y > this.game.height) {
    //     t.body.y -= this.game.height + 16;
    //   }
    // })
  }

  // onPlayButtonTouchStarted(target, touch) {
  //   this.startGame();
  // }

  // startGame() {
  //   this.beacon.emit("completed", TitleScene);
  // }
}
