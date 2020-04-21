/**
 * @author Paul Milham
 * @date 4/18/20
 */

import Actor from "../pxl/actor/Actor.js";
import Scene from "../pxl/scene/Scene.js";
import Sprite from "../pxl/actor/Sprite.js";
import * as random from "../pxl/core/random.js";
import Tween from "../pxl/core/Tween.js";
import Point from "../pxl/core/Point.js";

import PlayScene from "../scene/PlayScene.js";

let id = 0;

export default class Pet extends Actor {
  static types = {
    DOG: "DOG",
    CAT: "CAT",
    BIRD: "BIRD",
    OTHER: "OTHER",
  };

  static names = {
    ANY: [
      "Silky",
      "Bob",
      "Loveakins",
      "Sweety Heart",
      "Racer",
      "Jewel",
      "Fred",
      "Willow",
      "Myra",
      "Asher",
      "Flinn",
      "Levvie",
      "Sprite",
      "Pepper",
      "Eva",
      "Jack",
      "Moonlight",
      "Snow White",
      "Spangle",
      "Bobob",
      "Yukichan",
      "Thor",
      "Simon",
      "Smokey",
      "Booboo",
      "Bubbles",
      "Domino",
      "Giblet",
      "Marshmallow",
      "Mr. Big",
      "Princess",
      "Sushi",
    ],
    DOG: [
      "Doge",
      "Spot",
      "Woofers",
      "Inuchan",
      "Rocco",
      "Sheba",
      "Sparky",
    ],
    CAT: [
      "Cat",
      "Kitty",
      "Meowzers",
      "Simba",
      "Nekochan",
    ],
    BIRD: [
      "Polly",
      "Nugget",
      "Eggberta",
      "Shelly",
      "Torichan",
    ],
    OTHER: [
      "Bagel",
      "Syrup Licker",
      "Wonderlegs",
      "Pancake",
      "Wormy",
    ],
  };


  static graphics = {
    CAT: [
      "petCatA",
      "petCatB",
    ],
    DOG: [
      "petDalmation",
    ],
    BIRD: [
      "petChickenA",
      "petChickenB",
      "petChickenC",
      "petDuckA",
      "petParrotA",
      "petOstrichA",
    ],
    OTHER: [
      "petFrog",
      "petMouse",
      "petNewt",
      "petTarantula",
      "petRabbitA",
      "petRabbitB",
      "petWorm",
      "petGoldfishA",
    ],
  };

  /**
   * @param {Scene} scene
   */
  constructor(scene) {
    super(scene);

    /** @type {"DOG"|"CAT"|"BIRD"|"OTHER"} */
    this.type = random.item(Object.values(Pet.types));
    this.name = random.item(Pet.names.ANY.concat(Pet.names[this.type]));
    this.id = id++;

    this.beingCarried = false;

    this.body.width = 16;
    this.body.height = 16;

    const graphic = new Sprite(this);
    graphic.layerName = "play";
    graphic.play(random.item(Pet.graphics[this.type]));
    this.graphics.push(graphic);

    this.tweenX = null;
    this.tweenY = null;
    this.waitCount = 0;
    this.waitCountMax = random.float(0, 10);
    this.speed = random.float(2, 40);
    this.bounceRate = random.float(1, 20);
    this.bounceHeight = random.float(0, 5);
  }

  /**
   * @param {number} delta
   */
  update(delta) {
    super.update(delta);

    if (this.beingCarried) {
      this.graphics[0].offset.y = 0;
      return;
    }

    this.graphics[0].offset.y = Math.abs(Math.sin(this.age * this.bounceRate)) * this.bounceHeight;

    // move to random places
    if (this.waitCount > this.waitCountMax && !this.tweenX) {
      this.waitCount = 0;

      const dest = new Point(random.int(0, 160 - 16), random.int(0, 80));
      const duration = dest.calcDist(this.body) / this.speed;
      this.tweenX = this.scene.tween.add(this.body, "x", this.body.x, dest.x, duration);
      this.tweenX.beacon.observe(this, "completed", () => {
        this.tweenX = null;
        this.tweenY = null;
        this.graphics[0].offset.y = 0;
      });
      this.tweenY = this.scene.tween.add(this.body, "y", this.body.y, dest.y, duration);
    }
    else if (!this.tweenX) {
      this.waitCount += delta;
    }
  }

  pickUp() {
    this.beingCarried = true;
    this.tweenX = null;
    this.tweenY = null;
    this.scene.tween.remove(this.body);
  }

  putDown() {
    this.beingCarried = false;
  }

  explode() {
    this.scene.camera.shake(2, 60);
    this.alive = false;

    const scene = /** @type {PlayScene} */ (this.scene);

    // TODO: clean this up. this is really confusing
    if (!scene.player) {
      throw new Error("player should not be null here");
    }
    if (scene.player.pet === this) {
      scene.player.pet = null;
    }
    scene.updateHealth(-1);
  }
}
