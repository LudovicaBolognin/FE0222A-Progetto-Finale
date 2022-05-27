import { Component, OnInit } from '@angular/core';
import { FattureService } from './fatture.service';

@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.scss']
})
export class FattureComponent implements OnInit {

  fatture: any;
  response: any;
  pagCorr: number = 0;

  constructor(private srvFatture: FattureService) { }


  ngOnInit(): void {

    this.srvFatture.getAll(0).subscribe((c) => {
      this.response = c;
      this.fatture = this.response.content;
    });

  }

  cambiaPag(page: number) {
    this.srvFatture.getAll(page).subscribe((c) => {
      if (page >= this.response.totalPages) {
        this.pagCorr = this.response.totalPages - 1;
      } else if (page <= this.response.first - 1) {
        this.pagCorr = this.response.first;
      } else {
      this.response = c;
      this.fatture = this.response.content;
      this.pagCorr = page;
      console.log(this.pagCorr);
    }
    });
  }

  elimina(id: number, i: number) {
    this.srvFatture.delete(id).subscribe(() => {
      this.fatture.splice(i, 1);
    });
  }

}
