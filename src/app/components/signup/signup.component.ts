import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupData = {
    email: '',
    password: '',
    username: ''
  };
  errorMessage = '';
  successMessage = '';
  constructor(private authService: AuthService, private router: Router) { }
  onSignup() {
    this.errorMessage = '';
    this.successMessage = '';
    const { email, password, username } = this.signupData;
    if (!email || !password || !username) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
    this.authService.signup(email, password, username).subscribe({
      next: (response: any) => {
        console.log('Signup successful:', response);
        this.successMessage = 'Signup successful! You can now log in.';
        setTimeout(() => {
          this.router.navigate(['/signin']);
        }, 1500)
      },
      error: (error: any) => {
        console.error('Signup error:', error);
        this.errorMessage = 'An error occurred during signup.';
      }
    });
  }
}
