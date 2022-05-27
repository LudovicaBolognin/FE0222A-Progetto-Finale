import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user!: User | null;
  constructor(private srvAuth: AuthService) { }

  ngOnInit(): void {
    this.srvAuth.user$.subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.srvAuth.logout();
  }

}
