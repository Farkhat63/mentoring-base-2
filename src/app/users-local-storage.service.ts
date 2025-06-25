import { Injectable } from '@angular/core';
import { User } from './types/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersLocalStorageService {
  private readonly localStorageKey = 'users';

  saveUsers(users: User[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  loadUsers(): User[] | null {
    const data = localStorage.getItem(this.localStorageKey);
    if (data) {
      try {
        const users = JSON.parse(data);
        if (Array.isArray(users) && users.length > 0) {
          return users;
        }
      } catch (e) {
        // ignore parse error
      }
    }
    return null;
  }
}
