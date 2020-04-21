/*
Paul Milham
4/20/20
*/

import Game from "../pxl/core/Game.js";
import Scene from "../pxl/scene/Scene.js";
import TitleScene from "./TitleScene.js";
import Actor from "../pxl/actor/Actor.js";
import BitmapText from "../pxl/actor/BitmapText.js";

export default class ScoreScene extends Scene {
  /**
   * @param {Game} game
   * @param {any} handoffData
   */
  constructor(game, handoffData) {
    super(game, handoffData);

    this.addLayer("background");
    this.addLayer("ui");
  }

  init() {
    const scoreText = new Actor(this);
    scoreText.graphics.push(new BitmapText(scoreText, `Score:${this.handoffData.score}`));
    this.addActor(scoreText);

    this.input.beacon.observe(this, "keyPressed", (owner, data) => {
      this.switchScene(TitleScene);
    });
  }

  /**
   * @param {number} delta
   */
  update(delta) {
    super.update(delta);
  }
}
