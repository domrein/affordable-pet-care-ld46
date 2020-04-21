/**
 * @author Paul Milham
 * @date 4/19/20
 */

/** @typedef {"new"|"droppingOff"|"droppedOff"|"pickingUp"|"readyForPickup"|"pickedUp"} State */

import Actor from "../pxl/actor/Actor.js";
import Scene from "../pxl/scene/Scene.js";
import Sprite from "../pxl/actor/Sprite.js";
import BitmapText from "../pxl/actor/BitmapText.js";
import * as random from "../pxl/core/random.js";
import Tween from "../pxl/core/Tween.js";
import Point from "../pxl/core/Point.js";
import Pet from "./Pet.js";
import Easing from "../pxl/core/Easing.js";

let id = 0;

export default class Customer extends Actor {
  static graphics = [
    "customerA",
    "customerB",
    "customerC",
    "customerD",
    "customerE",
    "customerF",
    "customerG",
    "customerH",
    "customerI",
    "customerJ",
  ];

  /**
   * @param {Scene} scene
   */
  constructor(scene) {
    super(scene);

    this.pet = new Pet(scene);

    const graphic = new Sprite(this);
    graphic.offset.y = 15;
    graphic.layerName = "foreground";
    graphic.play(random.item(Customer.graphics));
    this.graphics.push(graphic);

    this.textGraphic = new BitmapText(this, "");
    this.textGraphic.layerName = "ui";
    this.textGraphic.offset.x = -40;
    this.textGraphic.offset.y = 12;
    this.graphics.push(this.textGraphic);

    this.body.x = -16;
    this.body.y = 80;
    this.body.width = 16;
    this.body.height = 40;

    /** @type {State} */
    this.state = "new";
    this.speed = random.int(30, 40);
    this.stopX = random.int(50, 90);

    this.pet.body.x = this.stopX;
    this.pet.body.y = 80;

    this.pickUpAge = random.int(20, 40);
  }

  /**
   * @param {number} delta
   */
  update(delta) {
    super.update(delta);

    if (this.state === "new") {
      this.dropOffPet();
    }

    if (this.state === "droppedOff" && this.age >= this.pickUpAge) {
      this.pickUpPet();
    }
  }

  dropOffPet() {
    this.state = "droppingOff";

    const t = this.scene.tween.add(this.body, "x", this.body.x, this.stopX, this.stopX / this.speed, {delay: 0});
    t.beacon.observe(this, "completed", () => {
      this.scene.addActor(this.pet);
      this.say(`Take care of ${this.pet.name} for me!`);

      const t2 = this.walkAway("droppedOff", 3, true);
      t2.beacon.observe(this, "started", () => {
        this.say("");
      });
    });
  }

  pickUpPet() {
    this.state = "pickingUp";

    const t = this.scene.tween.add(this.body, "x", -16, this.stopX, this.stopX / this.speed, {delay: 0});
    t.beacon.observe(this, "completed", () => {
      this.state = "readyForPickup";
      this.say(`I'm ready to pick up ${this.pet.name}!`);

      const t2 = this.walkAway("pickedUp", 15, false);
      t2.beacon.observe(this, "started", () => {
        this.state = "pickingUp";
        this.say(`I'm not waiting anymore! Keep ${this.pet.name}!`);
        this.pet.explode();
      });
    });
  }

  /**
   * @param {Pet} pet
   */
  deliverPet(pet) {
    if (pet.id === this.pet.id) {
      this.state = "pickingUp";
      this.scene.tween.remove(this.body);
      this.say(`Thanks for taking care of ${this.pet.name}!`);
      this.walkAway("pickedUp", 2, false);
      this.pet.alive = false;
      this.scene.updateHealth(1);
      this.scene.updateScore(1);
    }
    else {
      this.state = "pickingUp";
      this.scene.tween.remove(this.body);
      this.say(`That's not ${this.pet.name}!`);
      this.walkAway("pickedUp", 2, false);
      this.pet.explode();
    }
  }

  /**
   * @param {State} state
   * @param {number} [delay]
   * @param {boolean} [alive]
   * @return {any}
   */
  walkAway(state, delay = 0, alive = true) {
    const t = this.scene.tween.add(this.body, "x", this.body.x, 160, (160 - this.stopX) / this.speed, {delay});
    t.beacon.observe(this, "completed", () => {
      this.state = state;
      this.alive = alive;
    });

    return t;
  }

  /**
   * @param {string} text
   */
  say(text) {
    this.textGraphic.text = text;
    this.scene.tween.remove(this.textGraphic.offset, "");
    this.scene.tween.remove(this.textGraphic, "alpha");
    this.scene.tween.add(this.textGraphic.offset, "y", 14, 0, 5, {easing: "outExpo"});
    this.textGraphic.alpha = 1;
    this.scene.tween.add(this.textGraphic, "alpha", 1, 0, 1, {delay: 4});
  }
}
