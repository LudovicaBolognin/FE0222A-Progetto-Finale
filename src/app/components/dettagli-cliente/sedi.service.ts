import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SediService {

urlDB = environment.pathApi;

  constructor(private http: HttpClient) { }

  //comuni
  getAllComuni(p: number) {
    return this.http.get(
      `${environment.pathApi}/api/comuni?page=${p}&size=20&sort=id,ASC`
    );
  }

  getComuneId(id: number) {
    return this.http.get(`${environment.pathApi}/api/comuni/${id}`);
  }

  //provincie
  getAllProvince(p: number) {
    return this.http.get(
      `${environment.pathApi}/api/province?page=${p}&size=20&sort=id,ASC`
    );
  }

  getProvinciaId(id: number) {
    return this.http.get(`${environment.pathApi}/api/province/${id}`);
  }


  //senza parametro
  getComuni() {
    return this.http.get<any>(`${this.urlDB}/api/comuni?page=0&size=20&sort=id,ASC`);
  }

  getProvince() {
    return this.http.get<any>(`${this.urlDB}/api/province?page=0&size=20&sort=id,ASC`);
  }
}
