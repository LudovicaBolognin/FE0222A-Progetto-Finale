import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/interfaces/cliente';
import { Comune } from 'src/app/interfaces/comune';
import { Provincia } from 'src/app/interfaces/provincia';
import { ClientiService } from '../clienti/clienti.service';
import { SediService } from '../dettagli-cliente/sedi.service';

@Component({
  selector: 'app-clienti-modifica',
  templateUrl: './clienti-modifica.component.html',
  styleUrls: ['./clienti-modifica.component.scss']
})
export class ClientiModificaComponent implements OnInit {

  cliente!: Cliente;
  isLoading = false;
  errorMessage = undefined;
  authSrv: any;
  sub!: Subscription;
  tipoClienti = [];
  province: Provincia[] | undefined;
  comuni: Comune[] | undefined;

  constructor(private srvClienti: ClientiService, private srvSedi: SediService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe((params: Params) => {
      const id = +parseInt(params['id']);
      this.srvClienti.getbyID(id).subscribe(res => {
        this.cliente = res;
      });
    });
    setTimeout(() => {
      this.srvSedi.getComuni().subscribe((res) => {
        this.comuni = res.content;
      });
      this.srvSedi.getProvince().subscribe((res) => {
        this.province = res.content;
      });
    }, 2000);
  }

  async onsubmit(form: NgForm, id:number) {
    this.isLoading = true;
    let comuneSedeOperativa!: Comune;
    let comuneSedeLegale!: Comune;
    let provinciaSedeOperativa!: Provincia;
    let provinciaSedeLegale!: Provincia;

    for (let i of this.comuni!) {
      if (form.value.comuneSedeLegale == i.nome) {
        comuneSedeLegale = i;
      }
      if (form.value.ComuneSedeOperativa == i.nome) {
        comuneSedeOperativa = i;
      }
    }

    for (let i of this.province!) {
      if (form.value.provinciaSedeLegale == i.nome) {
        provinciaSedeLegale = i;
      }
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
        },
        "indirizzoSedeLegale": {
            "via": "${form.value.viaSedeLegale}",
            "civico": "${form.value.civicoSedeLegale}",
            "cap": "${form.value.capSedeLegale}",
            "localita": "${form.value.localitaSedeLegale}",
            "comune": {
              "id": ${comuneSedeLegale!.id},
              "nome": "${comuneSedeLegale!.nome}",
              "provincia": {
                  "id": ${provinciaSedeLegale!.id},
                  "nome": "${provinciaSedeLegale!.nome}",
                  "sigla": "${provinciaSedeLegale!.sigla}"
                }
            }
        },
        "dataInserimento": "${new Date}",
        "dataUltimoContatto": "${new Date}"
    }`);
    try {
      this.srvClienti.editCliente(nuovoCliente, this.cliente.id);
      form.reset();
      this.isLoading = false;
      this.errorMessage = undefined;
        alert('Cliente modificato correttamente!');
        this.router.navigate(['/clienti']);
    } catch (error: any) {
      this.isLoading = false;
      this.errorMessage = error;
      console.error(error);
    }
  }
}
