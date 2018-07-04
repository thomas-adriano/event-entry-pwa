import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";

import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { AppRoutingModule } from "./app-routing.module";
import { PageNotFoundComponent } from "./not-found.component";
import { AppHttpInterceptor } from "./app-http-interceptor";

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production
    }),

    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    [{ provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true }]
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
