import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject} from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from "shared/models/AppUser";
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }


  // save2(user: AppUser) {
  //   this.db.object('/users/' + user.uid).update({
  //     name: user.FirstName && user.LastName,
  //     phone: user.Cell,
  //     email: user.Email
  //   })
  // }

  create(user) {
    return this.db.list('/users').push(user);
  }

  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      phone: user.photoURL,
      email: user.email
    })
  }

  saveAdmin(user: firebase.User){
    this.db.object('/users/'+user.uid).update({
      name: "Chiff",
      email: user.email,
      isAdmin: true
    })
  }

  get(uid: string): AngularFireObject<AppUser> {
    return this.db.object('/users/' + uid);
  }
}
