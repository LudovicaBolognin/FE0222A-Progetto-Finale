import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente';
import { FattureService } from '../fatture/fatture.service';

@Component({
  selector: 'app-fatture-dettagli',
  templateUrl: './fatture-dettagli.component.html',
  styleUrls: ['./fatture-dettagli.component.scss']
})
export class FattureDettagliComponent implements OnInit {

  fattura: any;
  response: any;
  cliente!: Cliente;

  constructor(private srvFatture: FattureService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      const id = +params['id'];
      this.caricaDettagli(id);
    });

  }

  caricaDettagli(id: number) {
    this.srvFatture.dettagli(id).subscribe((res) => {
      this.fattura = res;
      this.cliente = this.fattura.cliente;
    });
  }

  salva(form: NgForm) {
    this.fattura.stato.id = form.value.stato;
    this.srvFatture.modifica(this.fattura).subscribe((res) => {
      console.log(res);
      this.router.navigate(['/fatture']);
    });
  }

  elimina(id: number) {
    this.srvFatture.delete(id).subscribe(() => {
      this.router.navigate(['/fatture']);
    });
  }

}
