import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'shared/services/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from 'shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  submitted = false;

  constructor(private auth: AuthService,
              private afAuth: AngularFireAuth,
              private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private userService: UserService) {

  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  login() {
    // this.auth.login();
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
  }
    this.afAuth.auth.signInWithEmailAndPassword(this.f.username.value, this.f.password.value)
      .then(r => {
        this.userService.save(r.user);
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        this.router.navigateByUrl(returnUrl);
      })
      .catch(e => {
        console.log(e);
      });
  }

  demoLogin() {
    this.auth.demoLogin();
  }

  demoAdmin() {
    this.auth.demoAdmin();
  }

}
