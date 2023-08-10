import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { EncryptionDecryptionService } from '../EncryptionDecryption/encryption-decryption.service';

@Injectable()
export class HSInterceptorInterceptor implements HttpInterceptor {

  constructor(private encryptionService: EncryptionDecryptionService) {}


  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.method === 'POST' || request.method === 'PUT') {
      const encryptedData = this.encryptionService.encrypt(request.body);
      const encryptedRequest = request.clone({
        body: encryptedData,
      });
      return next.handle(encryptedRequest);
    }

    return next.handle(request).pipe(
      map((event) => {
        if (event instanceof HttpResponse) {
          const decryptedData = this.encryptionService.decrypt(event.body);
          return event.clone({
            body: decryptedData,
          });
        }
        return event;
      })
    );
  }
}
