import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})


export class UserService {
 urlDB: string = environment.pathApi;
  constructor(private http: HttpClient) { }

  //?page=1&size=20
  getAllUsers(p: number) {
    return this.http.get<any>(this.urlDB + '/api/users?page=' + p + '&size=10')
  };


}
