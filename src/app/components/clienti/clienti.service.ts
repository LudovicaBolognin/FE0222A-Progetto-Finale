import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientiService {
  urlDb: string = environment.pathApi;

  constructor(private http:HttpClient) { }

  getAll(p:number) {
    return this.http.get<any>(
      `${this.urlDb}/api/clienti?page=${p}&size=10&sort=id,ASC`);
  }

  getbyID(id: number) {
    return this.http.get<any>(`${this.urlDb}/api/clienti/${id}`);
  }

  getbyCliente(id: number) {
    return this.http.get<any>(
      `${this.urlDb}/api/fatture/cliente/${id}?page=0&size=200&sort=id,ASC`);
  }

  deleteFatture(id: number) {
    return this.http.delete(`${this.urlDb}/api/fatture/cliente/${id}`);
  }

  delete(id: number) {
    return this.http.delete(`${this.urlDb}/api/clienti/${id}`);
  }

  //dettagli-clienti e crea nuovo utente
  getTipiCliente() {
    return this.http.get(`${this.urlDb}/api/clienti/tipicliente`);
  }

  creaNuovoCliente(data: any) {
    return this.http.post(`${this.urlDb}/api/clienti/tipicliente`, data);
  }

  //modifica utente in clienti-modifica
  nuovoCliente(data: Cliente) {
    return this.http.post<Cliente>(`${this.urlDb}/api/clienti`, data).subscribe((res) => {}); //funziona
  }

  editCliente(data: Partial<Cliente>, id: number) {
    return this.http.put<Cliente>(`${this.urlDb}/api/clienti/${id}`, data).subscribe((res) => {});
  }

  //dettagli fattura cliente
  getFattureByCliente(id: number, p: number) {
    return this.http.get(`${environment.pathApi}/api/fatture/cliente/${id}?page=${p}&size=20&sort=id,ASC`);
  }

  // nuova fattura
  getById(id: number) {
    return this.http.get(`${environment.pathApi}/api/clienti/${id}`);
  }

}
