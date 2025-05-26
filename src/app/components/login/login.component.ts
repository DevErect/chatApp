import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData = {
    email: '',
    password: '',
    username: '',
  };
  errorMessage = '';
  showPassword = false;
  constructor(private authService: AuthService, private router: Router) { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // onLogin() {
  //   this.errorMessage = '';
  //   const { email, password, username } = this.loginData;
  //   if (!email || !password || !username) {
  //     this.errorMessage = 'Please fill in all fields.';
  //     return;
  //   }
  //   this.authService.signin(email, password, username).subscribe({
  //     next: (response: any) => {
  //       if (response && response.token) {
  //         console.log('Login successful:', response);
  //         localStorage.setItem('token', response.token);
  //         this.router.navigate(['/home']);
  //       } else {
  //         console.error('Login failed:', response);
  //         this.errorMessage = 'Invalid email or password or username.';
  //       }
  //     },
  //     error: (error: any) => {
  //       console.error('Login error:', error);
  //       this.errorMessage = 'An error occurred during login.';
  //     }
  //   });

  // }

  onLogin() {
    this.errorMessage = '';
    const { email, password, username } = this.loginData;
    // if (!email || !password || !username) {
    //   this.errorMessage = 'Please fill in all fields.';
    //   return;
    // }
    if (!password || !username) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
    this.authService.signin(password, username).subscribe({
      next: (response: any) => {
        if (response && response.token) {
          console.log('Login successful:', response);
          localStorage.setItem('token', response.token);
          this.router.navigate(['/home']);
        } else {
          console.error('Login failed:', response);
          this.errorMessage = 'Invalid email or password or username.';
        }
      },
      error: (error: any) => {
        console.error('Login error:', error);
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } 
        else if (error.message) {
          this.errorMessage = error.message;
        }
        else {
          this.errorMessage = 'An error occurred during signup. Please try again.';
        }
      }
    });

  }
}
