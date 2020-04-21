/**
 * @author Paul Milham
 * @date 4/18/20
 */

import Game from "./pxl/core/Game.js";
import Canvas2dRenderer from "./pxl/core/Canvas2dRenderer.js";
import * as random from "./pxl/core/random.js";

import TitleScene from "./scene/TitleScene.js";
import sprites from "./sprites.js";

export default class PetCare extends Game {
  constructor() {
    super(160, 120, TitleScene, Canvas2dRenderer, "canvas");

    random.setSeed(Date.now());

    this.score = 0;

    this.inputRelay.preventDefaults = [
      // controls
      "ArrowUp",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "z",
      "x",
      // block scrolling
      " ",
    ];

    // preload assets
    this.preloader.addImage(`./assets/sprites.png`, "sprites");

    // this.preloader.addAudio(`${window.location.href}assets/audio/Sound.wav`, "sound");

    this.preloader.addAudio("./assets/title_screen_song.mp3", "titleMusic");

    this.spriteStore.frameData = {sprites};
    this.spriteStore.animData = {
      // title scene
      titleBackground: {frames: ["title_screen1"], frameRate: 10, looping: true},

      // play scene
      player: {frames: ["player1", "player2", "player3", "player4"], frameRate: 5, looping: true},

      petFrog: {frames: ["pet_frog1"], frameRate: 10, looping: true},
      petMouse: {frames: ["pet_mouse1"], frameRate: 10, looping: true},
      petCatA: {frames: ["pet_cat_a1"], frameRate: 10, looping: true},
      petCatB: {frames: ["pet_cat_b1"], frameRate: 10, looping: true},
      petDalmation: {frames: ["pet_dalmation_puppy1"], frameRate: 10, looping: true},
      petNewt: {frames: ["pet_newt1"], frameRate: 10, looping: true},
      petTarantula: {frames: ["pet_tarantula1"], frameRate: 10, looping: true},
      petRabbitA: {frames: ["pet_rabbit_a1"], frameRate: 10, looping: true},
      petRabbitB: {frames: ["pet_rabbit_b1"], frameRate: 10, looping: true},
      petWorm: {frames: ["pet_worm1"], frameRate: 10, looping: true},
      petChickenA: {frames: ["pet_chicken_a1"], frameRate: 10, looping: true},
      petChickenB: {frames: ["pet_chicken_b1"], frameRate: 10, looping: true},
      petChickenC: {frames: ["pet_chicken_c1"], frameRate: 10, looping: true},
      petDuckA: {frames: ["pet_duck_a1"], frameRate: 10, looping: true},
      petParrotA: {frames: ["pet_parrot_a1"], frameRate: 10, looping: true},
      petOstrichA: {frames: ["pet_ostrich_a1"], frameRate: 10, looping: true},
      petGoldfishA: {frames: ["pet_goldfish_a1"], frameRate: 10, looping: true},

      counterTop: {frames: ["counter_top1"], frameRate: 10, looping: true},
      playCarpet: {frames: ["play_screen_background_carpet1"], frameRate: 10, looping: true},

      customerA: {frames: ["customer_a1"], frameRate: 10, looping: true},
      customerB: {frames: ["customer_b1"], frameRate: 10, looping: true},
      customerC: {frames: ["customer_c1"], frameRate: 10, looping: true},
      customerD: {frames: ["customer_d1"], frameRate: 10, looping: true},
      customerE: {frames: ["customer_e1"], frameRate: 10, looping: true},
      customerF: {frames: ["customer_f1"], frameRate: 10, looping: true},
      customerG: {frames: ["customer_g1"], frameRate: 10, looping: true},
      customerH: {frames: ["customer_h1"], frameRate: 10, looping: true},
      customerI: {frames: ["customer_i1"], frameRate: 10, looping: true},
      customerJ: {frames: ["customer_j1"], frameRate: 10, looping: true},

      petBedA: {frames: ["pet_bed_a1"], frameRate: 10, looping: true},
      petBedB: {frames: ["pet_bed_b1"], frameRate: 10, looping: true},
      petFoodAndWaterA: {frames: ["pet_food_and_water_bowls_a1"], frameRate: 10, looping: true},
      petFoodAndWaterB: {frames: ["pet_food_and_water_bowls_b1"], frameRate: 10, looping: true},

      iconSick: {frames: ["sick_icon.png"], frameRate: 10, looping: true},
      iconHeartFull: {frames: ["icon_heart_full1"], frameRate: 10, looping: true},
      iconHeartEmpty: {frames: ["icon_heart_empty1"], frameRate: 10, looping: true},

      textA: {frames: ["text_a1"], frameRate: 10, looping: true},
      textB: {frames: ["text_b1"], frameRate: 10, looping: true},
      textC: {frames: ["text_c1"], frameRate: 10, looping: true},
      textD: {frames: ["text_d1"], frameRate: 10, looping: true},
      textE: {frames: ["text_e1"], frameRate: 10, looping: true},
      textF: {frames: ["text_f1"], frameRate: 10, looping: true},
      textG: {frames: ["text_g1"], frameRate: 10, looping: true},
      textH: {frames: ["text_h1"], frameRate: 10, looping: true},
      textI: {frames: ["text_i1"], frameRate: 10, looping: true},
      textJ: {frames: ["text_j1"], frameRate: 10, looping: true},
      textK: {frames: ["text_k1"], frameRate: 10, looping: true},
      textL: {frames: ["text_l1"], frameRate: 10, looping: true},
      textM: {frames: ["text_m1"], frameRate: 10, looping: true},
      textN: {frames: ["text_n1"], frameRate: 10, looping: true},
      textO: {frames: ["text_o1"], frameRate: 10, looping: true},
      textP: {frames: ["text_p1"], frameRate: 10, looping: true},
      textQ: {frames: ["text_q1"], frameRate: 10, looping: true},
      textR: {frames: ["text_r1"], frameRate: 10, looping: true},
      textS: {frames: ["text_s1"], frameRate: 10, looping: true},
      textT: {frames: ["text_t1"], frameRate: 10, looping: true},
      textU: {frames: ["text_u1"], frameRate: 10, looping: true},
      textV: {frames: ["text_v1"], frameRate: 10, looping: true},
      textW: {frames: ["text_w1"], frameRate: 10, looping: true},
      textX: {frames: ["text_x1"], frameRate: 10, looping: true},
      textY: {frames: ["text_y1"], frameRate: 10, looping: true},
      textZ: {frames: ["text_z1"], frameRate: 10, looping: true},
      text1: {frames: ["text_11"], frameRate: 10, looping: true},
      text2: {frames: ["text_21"], frameRate: 10, looping: true},
      text3: {frames: ["text_31"], frameRate: 10, looping: true},
      text4: {frames: ["text_41"], frameRate: 10, looping: true},
      text5: {frames: ["text_51"], frameRate: 10, looping: true},
      text6: {frames: ["text_61"], frameRate: 10, looping: true},
      text7: {frames: ["text_71"], frameRate: 10, looping: true},
      text8: {frames: ["text_81"], frameRate: 10, looping: true},
      text9: {frames: ["text_91"], frameRate: 10, looping: true},
      text0: {frames: ["text_01"], frameRate: 10, looping: true},
      textApostrophe: {frames: ["text_apostrophe1"], frameRate: 10, looping: true},
      textColon: {frames: ["text_colon1"], frameRate: 10, looping: true},
      textUnknown: {frames: ["text_blank1"], frameRate: 10, looping: true},
      textExclamation: {frames: ["text_!1"], frameRate: 10, looping: true},
      textQuestion: {frames: ["text_?1"], frameRate: 10, looping: true},
      textPeriod: {frames: ["text_.1"], frameRate: 10, looping: true},
    };
  }

  init() {
    super.init();
    // this.audioMixer.play("titleMusic");
    // setInterval(() => {
    //   this.audioMixer.play("titleMusic");
    // }, 18000);
  }
}
