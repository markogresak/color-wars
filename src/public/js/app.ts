/// <reference path="../../../typings/tsd.d.ts" />

import {Component, View, bootstrap} from "angular2/angular2";

@Component({
  selector: "color-war"
})

@View({
  templateUrl: "app.html"
})

class ColorWar {

  private name: string;

  constructor() {
    this.name = "Marko";
  }

  updateName(name) {
    this.name = name;
  }

}

bootstrap(ColorWar);
