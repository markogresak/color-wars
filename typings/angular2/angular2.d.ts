// Type definitions for Angular 2
// Project: https://github.com/angular/angular
// Definitions by: Rado Kirov <https://github.com/rkirov>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

interface List<T> extends Array<T> {
}
interface Type {}

declare module "angular2/angular2" {
  function bootstrap(appComponentType: any): void;
  function Component({
    selector,
    properties,
    hostListeners,
    injectables,
    lifecycle,
    changeDetection
    }:{
      selector:string,
      properties?:Object,
      hostListeners?:Object,
      injectables?:List<any>,
      lifecycle?:List<any>,
      changeDetection?:string
    });

  function View({
      templateUrl,
      template,
      directives,
      formatters,
      source,
      locale,
      device
    }: {
      templateUrl?: string,
      template?: string,
      directives?: List<Type>,
      formatters?: List<Type>,
      source?: List<any>,
      locale?: string,
      device?: string
    });
  function For();
  function If();
}

declare module "angular2/di" {
    export function bind(token: any): any;
}
