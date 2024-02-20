import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiendpointsService } from './apiendpoints.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private endPointUrls: ApiendpointsService) { }

  loginUser(user: any): Observable<string> {
    return this.http.post<string>(this.endPointUrls.apiUrls.authUrl, user);
  }

  registerUser(user: any): Observable<string> {
    return this.http.post<string>(this.endPointUrls.apiUrls.registerUrl, user);
  }

  isUserAuthenticated(secToken: string) {
    return this.http.get(this.endPointUrls.apiUrls.tokenValidationUrl);
  }

  getSecurityToken(): string {
    return localStorage.getItem("securityToken");
  }
  saveSecurityToken(token: string) {
    localStorage.setItem("securityToken", token);
  }

  clearSecurityToken() {
    localStorage.removeItem("securityToken");
  }

  getUsername(): string {
    return localStorage.getItem("userName");
  }
  saveUsername(token: string) {
    localStorage.setItem("userName", token);
  }

  clearUsername() {
    localStorage.removeItem("userName");
  }
}
