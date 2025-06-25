import { inject, Injectable } from '@angular/core';
import { User } from './types/user.model';
import { BehaviorSubject } from 'rxjs';
import { UsersApiService } from './users-api.service';
import { UsersLocalStorageService } from './users-local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersSubject$ = new BehaviorSubject<User[]>([])
  public readonly users$ = this.usersSubject$.asObservable()

  private readonly usersApiService = inject(UsersApiService)
  private readonly usersLocalStorageService = inject(UsersLocalStorageService);

  loadUsers() {
    const localUsers = this.usersLocalStorageService.loadUsers();
    if (localUsers) {
      this.usersSubject$.next(localUsers);
    } else {
      this.usersApiService.getUsers().subscribe(
        (response: User[]) => {
          this.usersSubject$.next(response);
          this.usersLocalStorageService.saveUsers(response);
        }
      )
    }
  }

  deleteUser(id: number) {
    const updated = this.usersSubject$.value.filter((user: User) => user.id !== id);
    this.usersSubject$.next(updated);
    this.usersLocalStorageService.saveUsers(updated);
  }

  createUser(newUser: User) {
    if (this.usersSubject$.value.find((user: User) => user.email === newUser.email)) {
      alert('Пользователь с таким email уже существет.');
      return;
    }
    const updated = [ ...this.usersSubject$.value, newUser ];
    this.usersSubject$.next(updated);
    this.usersLocalStorageService.saveUsers(updated);
  }

  editUser(editUser: User) {
    const updated = this.usersSubject$.value.map(
      (user: User) => user.id == editUser.id
      ? editUser
      : user
    );
    this.usersSubject$.next(updated);
    this.usersLocalStorageService.saveUsers(updated);
  }
}
