import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users!: User[];

  pagineTotale: number = 1;
  paginaCorr = 0;
  /* pages:number[] = []; */
  numP: any;
  response!: any;

  constructor(private srvUser: UserService) { }


  ngOnInit(): void {
    this.srvUser.getAllUsers(this.paginaCorr).subscribe(res => {
      this.response = res;
      this.users = res.content;

      this.pagineTotale = res.pagineTotale;

      const numP = Array(this.response.totalPages);
      this.numP = numP;
    })
  };

  precedente() {
    this.paginaCorr = this.paginaCorr - 1
    this.ngOnInit();
  }
  successivo() {
    this.paginaCorr = this.paginaCorr + 1
    this.ngOnInit();
  }

  cambiaPag(page: number) {
    this.srvUser.getAllUsers(page).subscribe((res) => {
      this.response = res;
      this.users = this.response.content;
      this.paginaCorr = page;
    })
  }
}
