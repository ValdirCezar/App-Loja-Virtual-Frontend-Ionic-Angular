import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular/components/alert/alert-controller";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    public storage: StorageService,
    public alertController: AlertController
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).catch((error, caught) => {
      let errorObj = error;
      if (errorObj.error) {
        errorObj = errorObj.error;
      }

      if (!errorObj.status) {
        errorObj = JSON.parse(errorObj);
      }

      console.log("Erro detectado pelo interceptor");
      console.log(errorObj);

      switch (errorObj.status) {
        case 401:
          this.handle401();
          break;

        case 403:
          this.heandle403();
          break;

          default: 
          this.handlerDefaultError(errorObj);
      }

      return Observable.throw(errorObj);
    }) as any;
  }

  heandle403() {
    this.storage.setLocalUser(null);
  }

  handle401() {
    let alert = this.alertController.create({
      title: "Erro 401: falha de autênticação",
      message: "Email ou senha incorretos",
      enableBackdropDismiss: false,
      buttons: [{ text: "ok" }],
    });
    alert.present();
  }

  handlerDefaultError(errorObj) {
    let alert = this.alertController.create({
      title: "Erro " + errorObj.status + ": " + errorObj.error,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [{ text: "ok" }],
    });
    alert.present();
  }


}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true,
};
