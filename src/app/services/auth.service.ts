import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  signup(email: string, password: string, username: string) {
    const body = { email, password, username };
    return this.http.post(`${environment.apiUrl}/signup`, body)
  };

  // signin(email: string, password: string, username: string) {
  //   const body = { email, password, username };
  //   return this.http.post<{ token: string }>(`${environment.apiUrl}/signin`, body)
  // };

  signin(password: string, username: string) {
    const body = { password, username };
    return this.http.post<{ token: string }>(`${environment.apiUrl}/signin`, body)
  };

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  };

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  };

  getToken(): string | null {
    return localStorage.getItem('token');
  };

  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id;
    }
    return null;
  };

  fetchUserData(): any {
    const userId = this.getUserId();
    if (!userId) {
      console.warn('No user ID found, cannot fetch profile data.');
      return;
    }
    return this.http.post(environment.apiUrl + '/userProfile', { user: { id: userId } });
  }

  getAllUsers() {
    return this.http.get(`${environment.apiUrl}/users`);
  }

};
