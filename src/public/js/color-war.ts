/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, bootstrap} from "angular2/angular2";

@Component({
  selector: "color-war"
})

@View({
  templateUrl: "color-war.html"
})

class ColorWar {

  private tiles: Array<Array<Tile>>;

  constructor() {
    this.tiles = [];

    for(let i = 0; i < 10; i++) {
      let tileLine = [];
      for(let j = 0; j < 10; j++) {
        tileLine.push(new Tile(i, j));
      }
      this.tiles.push(tileLine);
    }
  }

}

class Tile {

  private x: number;
  private y: number;
  private active: boolean;

  constructor(x, y: number) {
    this.x = x;
    this.y = y;
    this.active = false;
  }

}

bootstrap(ColorWar);
