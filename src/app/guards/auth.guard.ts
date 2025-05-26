import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = authService.getToken();

  if (!authService.isLoggedIn() || !token) {
    return router.createUrlTree(['/signin']);
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(payload.exp * 1000);

    if (expirationDate < new Date()) {
      authService.logout();
      return router.createUrlTree(['/signin']);
    }
  } catch (e) {
    console.error('Invalid token format:', e);
    authService.logout();
    return router.createUrlTree(['/signin']);
  }

  return true;
};
