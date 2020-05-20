import { Component, OnInit } from "@angular/core";
import { LoginComponent } from "./login.component";

@Component({
  selector: "app-loginfirst",
  styleUrls: ['./login.component.css'],
  template: `

              <section id="notlogged" class="notlogged container">
              <div class="notlogged-left d-none d-lg-block">
            <div class="notlogged-img-container">

            <img src="../../../../assets/img/Fresh 4.jpg" alt="logo">

            </div>
        </div>
              <div class="notlogged-right">
            <div class="notlogged-body">
                <h1 class="text-center">
                  Oops!
                </h1>
                <h2 class="text-center">
                  User not logged in!
                </h2>
                <br />
                <p >
                  Sorry, please login with your credentials or register for an
                  account for you to proceed. Your session expired or the requested page requires authentication!
                </p>
                </div>

                <br />
                <div class="error-actions notlogged-footer" color="white">
                  <a
                    class="btn btn-md btn-info ripple-effect "
                    style="width: 47%;"
                    name="Submit"
                    alt="sign in"
                    [routerLink]="['/login']"
                  >
                    Go to Login
</a>
                  <a
                    class="btn btn-md btn-info ripple-effect "
                    style="width: 46%;"
                    name="Submit"
                    alt="sign in"
                    [routerLink]="'/register'"
                  >
                    Register
</a>
                </div>
</div>

</section>
  `,
  styles: ['./login.component.css']
})
export class LoginfirstComponent implements OnInit {
  constructor() {}

  ngOnInit() {}


}

