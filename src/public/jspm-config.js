System.config({
  "baseURL": "/",
  "transpiler": "traceur",
  "paths": {
    "*": "*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  },
  "traceurOptions": {
    "annotations": true,
    "types": true,
    "typeAssertions": true,
    "typeAssertionModule": "angular2/rtts-assert"
  }
});

System.config({
  "map": {
    "angular2": "github:robianmcd/angular-next@0.0.3",
    "traceur": "github:jmcriffey/bower-traceur@0.0.88",
    "traceur-runtime": "github:jmcriffey/bower-traceur-runtime@0.0.88"
  }
});
