import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from 'admin/admin.module';
import { AngularFireModule } from 'angularfire2';
import { SharedModule } from 'shared/shared.module';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ShoppingModule } from './shopping/shopping.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    SharedModule,
    AdminModule,
    ShoppingModule,
    CoreModule
  ],
  providers: [
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
