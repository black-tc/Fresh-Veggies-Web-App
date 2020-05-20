import { NgModule } from '@angular/core';
import { SharedModule } from 'shared/shared.module';
import { LoginfirstComponent } from './components/login/loginfirst.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShoppingModule } from '../shopping/shopping.module';
import { FooterComponent } from './components/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    LoginfirstComponent,
    FooterComponent,
    RegisterComponent,
    VerifyEmailComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ShoppingModule
  ],
  exports: [
    NavbarComponent,
    FooterComponent
  ],
  entryComponents: [
    VerifyEmailComponent
  ],
  providers: [
    NgbActiveModal
  ]
})
export class CoreModule {
}
