import { Component, OnInit } from '@angular/core';
import { Fattura } from 'src/app/interfaces/fattura';
import { ClientiService } from '../clienti/clienti.service';
import { FattureService } from '../fatture/fatture.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fatture-cliente',
  templateUrl: './fatture-cliente.component.html',
  styleUrls: ['./fatture-cliente.component.scss']
})
export class FattureClienteComponent implements OnInit {

  constructor(private srvCliente: ClientiService, private srvFatture: FattureService, private route: ActivatedRoute) { }

  response: any;
  fatture!: Fattura[];
  numP: any;
  id!: number;
  closeResult: any;
  pagCorr: any;
  prevPagina: any;
  pageNumbers: any;
  prossimaPagina: any;
  numberOfPages: any;
  differenzaPagine: any;
  paginaCorrente: any;
  totalElements: any;
  multiplier: any;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      console.log(this.id);
      this.caricaDettagli(this.id);
    });
  }

  caricaDettagli(id: number) {
    this.srvCliente.getFattureByCliente(id, 0).subscribe((c) => {
      this.response = c;
      this.fatture = this.response.content;
      const numP = Array(this.response.totalPages);
      this.numP = numP;
      // console.log(this.numP);
      console.log('this.fatture', this.fatture);
    });
  }

  elimina(id: number, i: number) {
    this.srvFatture.delete(id).subscribe(() => {
      this.fatture.splice(i, 1);
    });
  }

}
