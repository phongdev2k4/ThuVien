import { inject } from '@angular/core';
import { CanActivateFn, Router} from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // Declare jwtHelper first
  const authKey = localStorage.getItem('auth-key'); // Now use it after its declaration

  console.log('Guard Auth Key:: ' + authKey);
  
  // Check if the token is present and not expired
  if (authKey) {
    return true; // Token is valid
  } else {
    // If the token is absent or expired, redirect to the login page
    localStorage.setItem('redirectUrl', state.url); // Store the intended URL for redirection
    router.navigate(['/login']);
    return false; // Prevent access to the route
  }
};
