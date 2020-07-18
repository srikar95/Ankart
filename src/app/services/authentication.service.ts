import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { BehaviorSubject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  newUser: any;

  private eventAuthError = new BehaviorSubject<string>('');
  eventAuthError$ = this.eventAuthError.asObservable();

  constructor(private afAuth: AngularFireAuth,
    private firedb: AngularFirestore, private snackBar: MatSnackBar,
    private router: Router) { }

    createUser(user) {
      console.log(user);
      this.afAuth.createUserWithEmailAndPassword( user.user_email, user.user_password)
        .then( userCredential => {
          this.newUser = user;
          console.log(userCredential);
          console.log(userCredential.user.displayName);
          localStorage.setItem('name', userCredential.user.displayName);
          localStorage.setItem('email', userCredential.user.email);
          this.router.navigate(['/home']);

          console.log('Done');
          userCredential.user.updateProfile( {
            displayName: user.user_name
          });

          this.insertUserData(userCredential)
            .then();

        })
        .catch( error => {
          this.eventAuthError.next(error);
          this.snackBar.open(error.message, 'Close', {
            duration: 4000,
            panelClass: ['snackbar-color-change']
          });
        });
    }

    insertUserData(userCredential: firebase.auth.UserCredential) {
      return this.firedb.doc(`Users/${userCredential.user.uid}`).set({
        email: this.newUser.email,
        name: this.newUser.user_name,
      });
    }

    login( email: string, password: string) {
      this.afAuth.signInWithEmailAndPassword(email, password)
        .catch(error => {
          // this.eventAuthError.next(error);
          console.log('Error', error.message);
          this.snackBar.open(error.message, 'Close', {
            duration: 4000,
            panelClass: ['snackbar-color-change']
          });
        })
        .then(userCredential => {
          if (userCredential) {
            // var userName = userCredential.user.displayName;
            // var userEmail = userCredential.user.email;

            console.log('Login User Details', userCredential);
            this.router.navigate(['/home']);
            localStorage.setItem('name', userCredential.user.displayName);
            localStorage.setItem('email', userCredential.user.email);
          }
        });
    }

    logout() {
      // return this.afAuth.auth.signOut();
    }
}
