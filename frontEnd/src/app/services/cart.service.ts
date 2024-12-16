import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartKey = 'cartItems';
  private cartItemsSubject = new BehaviorSubject<any[]>([]); // BehaviorSubject to track changes
  cartItems$ = this.cartItemsSubject.asObservable(); 
  constructor() {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      this.cartItemsSubject.next(JSON.parse(storedCart)); // Load stored cart into BehaviorSubject
    }
  }

  // Add item to cart
  getCart(): any[] {
    return this.cartItemsSubject.value;
  }

  addToCart(item: any): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = [...currentItems, item];
    this.cartItemsSubject.next(updatedItems); // Update BehaviorSubject
    localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Sync with local storage
  }

  removeFromCart(item: any): void {
    const updatedItems = this.cartItemsSubject.value.filter(cartItem => cartItem !== item);
    this.cartItemsSubject.next(updatedItems); // Update BehaviorSubject
    localStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Sync with local storage
  }

  // Clear the cart
  clearCart(): void {
    localStorage.removeItem(this.cartKey);

    this.cartItemsSubject.next([]);

  }
  getCartItems(): any[] {
    return JSON.parse(localStorage.getItem('cartItems') || '[]');
  }
  
}
