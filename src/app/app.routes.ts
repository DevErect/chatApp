import { Routes } from '@angular/router';
import { CounterComponent } from './components/counter/counter.component';
import { TodoComponent } from './components/todo/todo.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';


export const routes: Routes = [
    { path: '', redirectTo: '/signup', pathMatch: 'full' },
    { path: 'home', component: ChatComponent, canActivate: [authGuard] },
    { path: 'signup', component: SignupComponent, canActivate: [guestGuard] },
    { path: 'signin', component: LoginComponent, canActivate: [guestGuard] },
    { path: 'userProfile', component: ProfileComponent, canActivate: [authGuard] },
    { path: 'counter', component: CounterComponent },
    { path: 'todo', component: TodoComponent },
    { path: '**', redirectTo: '/' }
];
