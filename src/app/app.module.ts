import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthModule } from './auth/auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientiComponent } from './components/clienti/clienti.component';
import { FattureComponent } from './components/fatture/fatture.component';
import { TokenInterceptor } from "./auth/token.interceptor";
import { LoginComponent } from './auth/login/login.component';
import { DettagliClienteComponent } from './components/dettagli-cliente/dettagli-cliente.component';
import { ClientiModificaComponent } from './components/clienti-modifica/clienti-modifica.component';
import { FattureClienteComponent } from './components/fatture-cliente/fatture-cliente.component';
import { FattureDettagliComponent } from './components/fatture-dettagli/fatture-dettagli.component';
import { NuovaFatturaComponent } from './components/nuova-fattura/nuova-fattura.component';

const routes: Route[] = [
  {
    path: "",
    component: HomeComponent
  },
    {
      path: "login",
      component: LoginComponent
    },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "users",
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "clienti",
    component: ClientiComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "fatture",
    component: FattureComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "dettagli-cliente",
    component: DettagliClienteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "clienti-modifica/:id",
    component: ClientiModificaComponent
  },
  {
    path: "fatture-cliente/:id",
    component: FattureClienteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "fatture-dettagli/:id",
    component: FattureDettagliComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "nuova-fattura/:id",
    component: NuovaFatturaComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"**",
    redirectTo:""
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    NavbarComponent,
    SignupComponent,
    ClientiComponent,
    FattureComponent,
    DettagliClienteComponent,
    ClientiModificaComponent,
    FattureClienteComponent,
    FattureDettagliComponent,
    NuovaFatturaComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
