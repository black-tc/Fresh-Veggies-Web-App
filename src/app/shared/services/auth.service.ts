import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from 'shared/models/AppUser';
import { switchMap } from 'rxjs/operators';
import { UserService } from 'shared/services/user.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/shared/services/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  userData: any;

  constructor(private afAuth: AngularFireAuth,
              private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private afs: AngularFirestore) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {

    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/'])
    });
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(
        switchMap(user => {
          if (user) {
            return this.userService.get(user.uid).valueChanges()
          }
          return of(null);
        })
      )
  }

  demoLogin() {
    this.afAuth.auth.signInWithEmailAndPassword("tinashe@tinashe.com", "tinashe123")
      .then(r => {
        this.userService.save(r.user);
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        this.router.navigateByUrl(returnUrl)
      })
      .catch(e => {
        console.log(e)
      });
  }

  demoAdmin(){
    this.afAuth.auth.signInWithEmailAndPassword("chiff@chiff.com","admin123")
      .then(r=>{
        console.log(r.user.displayName)
        this.userService.saveAdmin(r.user);
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        this.router.navigateByUrl(returnUrl)
      })
      .catch(e=>{
        console.log(e);
      })
  }

  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
    .then(() => {
      this.router.navigate(['verify?']);
    })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Password reset email sent, check your inbox.');
    }).catch((error) => {
      window.alert(error)
    })
  }

  // Setting up user data when sign in with username/password
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      displayName: user.displayName,
      // LastName: user.LastName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      // displayName: user.displayName,

      emailVerified: user.emailVerified


    }
    return userRef.set(userData, {
      merge: true
    })
  }

}

