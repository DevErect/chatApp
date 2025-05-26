import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userData: any = {
    email: '',
    username: '',
    id: ''
  };
  errorMessage = '';
  constructor(private http: HttpClient, private authService: AuthService) { }
  ngOnInit() {
    this.http.post(environment.apiUrl + '/userProfile', { user: { id: this.authService.getUserId() } }).subscribe({
      next: (response: any) => {
        console.log('User data fetched successfully:', response);
        this.userData.email = response.user.email;
        this.userData.username = response.user.username;
        this.userData.id = response.user._id;
      },
      error: (error: any) => {
        console.error('Error fetching user data:', error);
        this.errorMessage = 'An error occurred while fetching user data.';
      }
    })
  }

  logout() {
    this.authService.logout();
  }
}
