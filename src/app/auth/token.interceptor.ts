import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, take, tap, catchError, throwError, finalize } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

/* @Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token = environment.adminToken;
  tenant = environment.adminTenant;


  constructor(private srvAuth: AuthService) {

  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.srvAuth.user$.pipe(take(1), switchMap(user => {
      if (!user) {
        return next.handle(request)
      }
      const newReq = request.clone({
        headers:request.headers.set('Authorization',`Bearer ${this.token}`).set('X-TENANT-ID', this.tenant)
      })
      return next.handle(newReq);
    }));
  };

}
 */
@Injectable()
export class TokenInterceptor implements HttpInterceptor{
token:string;
tenant:string;
constructor(private authSrv:AuthService){
  this.token = environment.adminToken;
  this.tenant = environment.adminTenant;
}
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     let ok: string;
let authReq: HttpRequest<any> = req.clone({headers: req.headers.set('Authorization','Bearer ' + this.token)
.set('X-TENANT-ID', this.tenant)});
return next.handle(authReq).pipe(
  tap(
    event => {
      ok = event instanceof HttpErrorResponse ? 'succeeded' : ''
    },
    error => { }
  ),
  catchError((error: HttpErrorResponse) => {
    return throwError(error);
  }),
    finalize(() => {
    })
  );
}
}
