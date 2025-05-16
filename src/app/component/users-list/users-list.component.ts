import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  private readonly http = inject(HttpClient);

  public users: any = [];

  constructor() {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((r) => {
      this.users = r,
      console.log(r);
    })
  }

  deleteUser(id: number) {
    this.users = this.users.filter((user: any) => {
      return user.id !== id
    })
  }
}
