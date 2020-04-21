/**
 * @author Paul Milham
 * @date 4/18/20
 */

import Actor from "../pxl/actor/Actor.js";
import Scene from "../pxl/scene/Scene.js";
import Sprite from "../pxl/actor/Sprite.js";
import Vector from "../pxl/core/Vector.js";

import Pet from "./Pet.js";
import Customer from "./Customer.js";

export default class Player extends Actor {
  /**
   * @param {Scene} scene
   */
  constructor(scene) {
    super(scene);

    this.body.width = 16;
    this.body.height = 24;
    this.body.friction.set(.8, .8);

    /** @type {Pet|null} */
    this.pet = null;
    /** @type {boolean} - stores if the pet should be on the right or left of player */
    this.petRight = true;

    const graphic = new Sprite(this);
    graphic.layerName = "play";
    graphic.play("customerB");
    this.graphics.push(graphic);

    this.scene.input.beacon.observe(this, "keyPressed", this.onKeyPressed);
  }

  /**
   * @param {number} delta
   */
  update(delta) {
    super.update(delta);

    if (this.scene.input.keys["ArrowLeft"]) {
      this.petRight = false;
      this.body.velocity.add(new Vector(25, Math.PI * 1));
      const sprite = /** @type {Sprite} */ (this.graphics[0]);
      // sprite.flip = true;
    }
    if (this.scene.input.keys["ArrowRight"]) {
      this.petRight = true;
      this.body.velocity.add(new Vector(25, Math.PI * 0));
      const sprite = /** @type {Sprite} */ (this.graphics[0]);
      // sprite.flip = false;
    }
    if (this.scene.input.keys["ArrowUp"]) {
      this.body.velocity.add(new Vector(25, Math.PI * 1.5));
    }
    if (this.scene.input.keys["ArrowDown"]) {
      this.body.velocity.add(new Vector(25, Math.PI * 0.5));
    }

    if (this.body.x < 0) {
      this.body.x = 0;
    }
    if (this.body.x + this.body.width > 160) {
      this.body.x = 160 - this.body.width;
    }
    if (this.body.y < 0) {
      this.body.y = 0;
    }
    if (this.body.y > 80) {
      this.body.y = 80;
    }

    if (this.pet) {
      if (this.petRight) {
        this.pet.body.x = this.body.x + 8;
      }
      else {
        this.pet.body.x = this.body.x - 8;
      }
      this.pet.body.y = this.body.y + 8;
    }
  }

  /**
   * @param {Player} observer
   * @param {string} key
   */
  onKeyPressed(observer, key) {
    if (key === "x") {
      // if we're holding a pet
      if (this.pet) {
        console.log(`dropped ${this.pet.name}`);
        // see if we are near a customer
        // give to customer if near
        // otherwise, drop pet
        this.pet.putDown();
        const [targetCustomer] = this.scene.actors
          .filter(a => a instanceof Customer)
          .filter(a => a.state === "readyForPickup")
          .filter(a => this.pet.body.intersects(a.body));
        if (targetCustomer) {
          /** @type {Customer} */ (targetCustomer).deliverPet(this.pet);
        }
        this.pet = null;
      }
      else {
        // see if we're near a pet
        // if we are, attach it
        // otherwise, do nothing
        const [targetPet] = this.scene.actors
          .filter(a => a instanceof Pet)
          .filter(a => this.body.intersects(a.body));
        if (targetPet) {
          this.pet = /** @type {Pet} */(targetPet);
          this.pet.pickUp();
          console.log(`picked up ${this.pet.name}`);
        }
      }
    }
  }
}
