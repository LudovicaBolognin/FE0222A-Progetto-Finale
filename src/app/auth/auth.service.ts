import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, tap, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.pathApi;
  private authSubj = new BehaviorSubject<null | User>(null);

  user$ = this.authSubj.asObservable();
  timeoutLogout:any

  constructor(private http: HttpClient, private router:Router) {
    this.restore()
  }

  login(data: { username: string; password: string }) {
    return this.http.post<any>(`${this.url}/api/auth/login`, data).pipe(
      tap((data) => {
        console.log(data);
        this.authSubj.next(data);
        localStorage.setItem('user', JSON.stringify(data));
        /* this.autoLogout(data) */
      }),
      catchError(this.trovaErr)
    );
  }

  restore() {
    const user = localStorage.getItem('user');
    if (!user) {
      return;
    }
    const userdata: User = JSON.parse(user);
    this.authSubj.next(userdata)
  }

  signup(data: any) {
    return this.http.post(`${this.url}/api/auth/signup`, data).pipe(catchError(this.trovaErr));
  }

  logout(){
    this.authSubj.next(null);
    localStorage.removeItem('user')
    this.router.navigate(['/'])
    if (this.timeoutLogout) {
      clearTimeout(this.timeoutLogout)
    }
  }

 getAll(p: number) {
    return this.http.get<any>(
      `${this.url}/api/users?page=${p}&size=20&sort=id,ASC`
    );
  }

  private trovaErr(err: any) {
    switch (err.error) {
      case 'Email and password are required':
        return throwError('Email e password sono obbligatorie!');
        break;
      case 'Email already exists':
        return throwError('Utente già registrato!');
        break;
      case 'Email format is invalid':
        return throwError("Formato dell'email non valido!");
        break;
      case 'Cannot find user':
        return throwError("L'utente non esiste!");
        break;
      default:
        return throwError('Compilare correttamente i campi');
        break;
    }
  }
}
