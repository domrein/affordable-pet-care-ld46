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
import Vector from "../pxl/core/Vector.js";

import Pet from "../actor/Pet.js";
import Player from "../actor/Player.js";
import Customer from "../actor/Customer.js";
import ScoreScene from "../scene/ScoreScene.js";
import BitmapText from "../pxl/actor/BitmapText.js";

export default class PlayScene extends Scene {
  /**
   * @param {Game} game
   */
  constructor(game) {
    super(game);

    this.addLayer("background");
    this.addLayer("play");
    this.addLayer("foreground");
    this.addLayer("ui");

    this.player = null;

    this.customerCounter = 0;
    this.customerCounterMax = 10;

    this.healthMax = 3;
    this.health = this.healthMax;
    /** @type {Array<Actor>} */
    this.hearts = [];

    this.score = 0;
    /** @type {Actor|null} */
    this.scoreText = null;
  }

  init() {
    // add background
    const carpet = Actor.build(this, {graphic: {name: "playCarpet", layer: "background"}});
    this.addActor(carpet);

    // add counter
    const counter = Actor.build(this, {graphic: {name: "counterTop", layer: "foreground"}, body: {y: 90}});
    this.addActor(counter);

    // add ui
    for (let i = 0; i < this.healthMax; i++) {
      const heart = Actor.build(this, {graphic: {name: "iconHeartFull", layer: "ui"}, body: {x: i * 10 + 2, y: 2}});
      this.addActor(heart);
      this.hearts.push(heart);
    }

    this.scoreText = new Actor(this);
    this.scoreText.graphics.push(new BitmapText(this.scoreText, `Score:${this.score}`));
    this.scoreText.graphics[0].layerName = "ui";
    this.scoreText.body.x = 120;
    this.scoreText.body.y = 2;
    this.addActor(this.scoreText);

    // create player
    this.player = new Player(this);
    this.addActor(this.player);

    // spawn first customer
    this.addActor(new Customer(this));
  }

  /**
   * @param {number} delta
   */
  update(delta) {
    super.update(delta);

    this.customerCounter += delta;
    if (this.customerCounter > this.customerCounterMax) {
      this.customerCounter = 0;
      this.addActor(new Customer(this));
    }
  }

  /**
   * @param {number} change
   */
  updateHealth(change) {
    this.health += change;
    if (this.health > this.healthMax) {
      this.health = this.healthMax;
    }
    this.hearts.forEach((h, i) => {
      if (i < this.health) {
        h.graphics[0].play("iconHeartFull");
      }
      else {
        h.graphics[0].play("iconHeartEmpty");
      }
    });

    if (this.health <= 0) {
      this.switchScene(ScoreScene, null, {score: this.score});
    }
  }

  /**
   * @param {number} change
   */
  updateScore(change) {
    this.score += change;
    this.scoreText.graphics[0].text = `Score:${this.score}`;
  }
}
