import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FattureService {

urlDB = environment.pathApi;

  constructor(private http: HttpClient) { }

  getAll(p: number) {
    return this.http.get(
      `${this.urlDB}/api/fatture?page=${p}&size=20&sort=id,ASC`
    );
  }

  dettagli(id: number) {
    return this.http.get(`${this.urlDB}/api/fatture/${id}`);
  }

  modifica(data: any) {
    return this.http.put(`${this.urlDB}/api/fatture/${data.id}`, data);
  }

  delete(id: any) {
    return this.http.delete(`${this.urlDB}/api/fatture/${id}`);
  }

  creaFattura(data: any) {
    return this.http.post(`${this.urlDB}/api/fatture`, data);
  }

}
