import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/timeout";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { AppNavigationService } from "@app/core";

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  private static readonly DEFAULT_TIMEOUT = 5000;

  constructor(private appNavigationService: AppNavigationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //se o request nao retornar em até 3 segundos, pára a requisição e emite erro
    return new Observable(observer => {
      next
        .handle(req)
        .timeout(AppHttpInterceptor.DEFAULT_TIMEOUT)
        .subscribe(
          data => {
            observer.next(data);
          },
          err => {
            observer.error(err);
            let errorMsg = "";
            if (err && err.name === "TimeoutError") {
              errorMsg = `O tempo limite para comunicação com o servidor ${
                req.url
              } foi atingido.`;
            } else if (err && err.message && err.message.trim().length) {
              errorMsg = err.message + `. Host: ${req.url}`;
            } else {
              errorMsg = `Falha na comunicação com host ${req.url}`;
            }
            this.appNavigationService.navigateTo("help", {
              errorMsg
            });
          },
          () => {
            observer.complete();
          }
        );
    });
  }
}
