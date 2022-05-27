import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  user = {
    username: "", nome: "", cognome: "", email: "", password: "", role: [""]
  }

  isLoading = false;
  constructor(private srvAuth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

 onsignup(form: NgForm) {

    this.user.username = form.value.username;
    this.user.nome = form.value.nome;
    this.user.cognome = form.value.cognome;
    this.user.email = form.value.email;
    this.user.password = form.value.password;
    let arrayRole = form.value.role;
    this.user.role.splice(0, 1);
    this.user.role.push(arrayRole);

    this.isLoading = true;
    console.log(form.value);

    this.srvAuth.signup(this.user).subscribe(
      res => {
        this.router.navigate(['/login']);
        this.isLoading = false;
      }
    );
    /* try {
      await this.srvAuth.signup(form.value).toPromise();
      this.router.navigate(['/login']);
      this.isLoading = false;
    }  */
    /* catch (error) {
      console.error(error);
      alert("Utente già registrato");
      form.reset();
      this.isLoading = false;
    } */
  }
}
