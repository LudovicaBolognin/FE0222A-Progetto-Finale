import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClientiService } from './clienti.service';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.scss']
})
export class ClientiComponent implements OnInit {

  constructor(private srvClienti: ClientiService, private router: Router) { }

  closeResult = '';
  clienti!: Cliente[];
  numP: any;
  response: any;
  idClient!: number;
  pagCorr: number = 0;

  pagineTotale: number = 1;

  ngOnInit(): void {

    this.srvClienti.getAll(this.pagCorr).subscribe((c) => {

      this.response = c;
      this.clienti = this.response.content;

      this.pagineTotale = c.pagineTotale;

      const numP = Array(this.response.totalPages);
      this.numP = numP;
    });

  }

  precedente() {
    this.pagCorr = this.pagCorr - 1
    this.ngOnInit();
  }
  successivo() {
    this.pagCorr = this.pagCorr + 1
    this.ngOnInit();
  }

  cambiaPag(page: number) {
    this.srvClienti.getAll(page).subscribe( (res) => {
      this.response = res;
      this.clienti = this.response.content;
      this.pagCorr = page;
    })
  }

  async eliminaCliente(idCliente: number, i: number) {
    this.idClient = idCliente;
    /* let id = this.pagCorr * 20 + this.idClient;
    console.log(id); */
    await this.srvClienti.deleteFatture(idCliente).toPromise();
    this.srvClienti.delete(idCliente).subscribe((c) => {
      this.router.navigate(['/clienti']);
      this.clienti.splice(i, 1);
    });
  }

}
