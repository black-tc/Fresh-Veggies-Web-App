import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { AppUser } from 'src/app/shared/models/AppUser';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseData } from 'shared/models/FirebaseData';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { VerifyEmailComponent } from '../verify-email/verify-email.component'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorrr = false;
  submitted = false;
  appuser: AppUser = new AppUser();
  display = "none";



  constructor(private formBuilder: FormBuilder,
              private user: UserService,
              private modal: NgbModal,
              private router: Router,
              public authService: AuthService,
              private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      Cell: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', [Validators.required, Validators.minLength(8)]]
  });
  }




  get f() { return this.registerForm.controls; }


  SignUp(email, password) {
    this.submitted = true;
    if (this.registerForm.invalid) {
                return;
            }
    return this.afAuth.auth.createUserWithEmailAndPassword(this.f.Email.value, this.f.Password.value)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        if(result){
          result.user.updateProfile({
             displayName: `${this.f.FirstName.value} ${this.f.LastName.value}`,
             photoURL: this.f.Cell.value

          }).then(
            (s)=> {

              this.user.save(result.user);
            }
          )
        }
        this.authService.logout();
        this.SendVerificationMail();
        // this.SetUserData(result.user);
      }).catch((error) => {
        this.errorrr = true;
        window.alert(error.message);
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify?']);
    })
  }


}
