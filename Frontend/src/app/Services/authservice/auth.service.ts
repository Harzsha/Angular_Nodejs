import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }
  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;
  public url="http://localhost:3000"
  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(() => (this.isLoggedIn = true))
    );
  }

  logout(): void {
    this.isLoggedIn = false;
  }
  Register(UserDetails:Object){
    return this.http.post(this.url+"/api/register",UserDetails)
  }
}
