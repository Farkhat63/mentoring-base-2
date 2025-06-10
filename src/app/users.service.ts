import { inject, Injectable } from '@angular/core';
import { User } from './types/user.model';
import { BehaviorSubject } from 'rxjs';
import { UsersApiService } from './users-api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersSubject$ = new BehaviorSubject<User[]>([])
  public readonly users$ = this.usersSubject$.asObservable()

  private readonly usersApiService = inject(UsersApiService)

  loadUsers() {
    this.usersApiService.getUsers().subscribe(
      (response: User[]) => {
        this.usersSubject$.next(response)
      }
    )
  }

  deleteUser(id: number) {
    this.usersSubject$.next(this.usersSubject$.value.filter(user => user.id !== id))
  }

  createUser(newUser: User) {
    this.usersSubject$.value.find( user => user.email !== newUser.email)
    ? this.usersSubject$.next([ ...this.usersSubject$.value, newUser ])
    : alert('Пользователь с таким email уже существет.')
  }

  editUser(editUser: User) {
    this.usersSubject$.next(this.usersSubject$.value.map(
      user => user.id == editUser.id
      ? editUser
      : user
    ))
  }
}
