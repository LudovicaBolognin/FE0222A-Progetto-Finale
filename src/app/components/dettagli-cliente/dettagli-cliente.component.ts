import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientiService } from '../clienti/clienti.service';
import { SediService } from './sedi.service';
import { Comune } from 'src/app/interfaces/comune';
import { Provincia } from 'src/app/interfaces/provincia';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dettagli-cliente',
  templateUrl: './dettagli-cliente.component.html',
  styleUrls: ['./dettagli-cliente.component.scss']
})
export class DettagliClienteComponent implements OnInit {

  constructor(private srvCliente: ClientiService, private srvSedi: SediService, private router: Router) { }

  isLoading = false;
  errorMessage = undefined;
  authSrv: any;
  tipoClienti = [];
  province: Provincia[] | undefined;
  comuni: Comune[] | undefined;

  ngOnInit(): void {
    this.srvSedi.getComuni().subscribe((res) => {
      this.comuni = res.content;
    });
    this.srvSedi.getProvince().subscribe((res) => {
      this.province = res.content;
    });
  }

  async onsubmit(form: NgForm) {
    this.isLoading = true;
    let comuneSedeOperativa: Comune;
    let provinciaSedeOperativa: Provincia;

    for (let i of this.comuni!) {
      if (form.value.ComuneSedeOperativa == i.nome) {
        comuneSedeOperativa = i;
      }
    }

    for (let i of this.province!) {
      if (form.value.provinciaSedeOperativa == i.nome) {
        provinciaSedeOperativa = i;
      }
    }

    let nuovoCliente = JSON.parse(`{
        "ragioneSociale": "${form.value.ragioneSociale}",
        "partitaIva": "${form.value.partitaIva}",
        "tipoCliente": "${form.value.tipoCliente}",
        "email": "${form.value.email}",
        "pec": "${form.value.pec}",
        "telefono":"${form.value.telefono}" ,
        "nomeContatto": "${form.value.nomeContatto}",
        "cognomeContatto": "${form.value.cognomeContatto}",
        "telefonoContatto": "${form.value.telefonoContatto}",
        "emailContatto": "${form.value.emailContatto}",
        "indirizzoSedeOperativa": {
            "via": "${form.value.viaSedeOperativa}",
            "civico": "${form.value.civicoSedeOperativa}",
            "cap": "${form.value.capSedeOperativa}",
            "localita": "${form.value.localitaSedeOperativa}",
            "comune": {
                "id": ${comuneSedeOperativa!.id},
                "nome": "${comuneSedeOperativa!.nome}",
                "provincia": {
                    "id": ${provinciaSedeOperativa!.id},
                    "nome": "${provinciaSedeOperativa!.nome}",
                    "sigla": "${provinciaSedeOperativa!.sigla}"
                }
            }
        }
    }`);
    try {
      this.srvCliente.nuovoCliente(nuovoCliente);
      console.log(form.value);
      form.reset();
      this.isLoading = false;
      this.errorMessage = undefined;
      alert(`Nuovo Cliente ${nuovoCliente.ragioneSociale} inserito`);
      this.router.navigate(['/clienti']);
    } catch (error: any) {
      this.isLoading = false;
      this.errorMessage = error;
      console.error(error);
    }
  }

}
