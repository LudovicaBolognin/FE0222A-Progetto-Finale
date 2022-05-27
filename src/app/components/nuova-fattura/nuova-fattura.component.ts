import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { ClientiService } from '../clienti/clienti.service';
import { FattureService } from '../fatture/fatture.service';

@Component({
  selector: 'app-nuova-fattura',
  templateUrl: './nuova-fattura.component.html',
  styleUrls: ['./nuova-fattura.component.scss']
})
export class NuovaFatturaComponent implements OnInit {

  id!: number;
  cliente!: Cliente;
  response: any;
  nuovaFattura: any;

  constructor(private srvCliente: ClientiService, private srvFatture: FattureService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.srvCliente.getById(this.id).subscribe((res) => {
        this.response = res;
        console.log('this.response', this.response);
        this.cliente = this.response;
        console.log(this.cliente);
      });
    });

  }


  crea(form: any) {
    this.nuovaFattura = {
      id: 0,
      numero: 0,
      anno: 0,
      importo: 0,
      data: '',
      stato: { id: 0, nome: '' },
      cliente: {},
    };

    this.nuovaFattura.data = form.value.data;
    console.log('form.value.data', form.value.data);
    this.nuovaFattura.anno = this.nuovaFattura.data.slice(0, 4);
    this.nuovaFattura.importo = form.value.importo;
    this.nuovaFattura.numero = form.value.numFatt;
    console.log('form.value.numero', form.value.numero);
    this.nuovaFattura.stato.id = form.value.stato;
    this.nuovaFattura.cliente.id = this.cliente.id;
    this.srvFatture.creaFattura(this.nuovaFattura).subscribe();
    this.router.navigate(['/clienti']);
  }

}
