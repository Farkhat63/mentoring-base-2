import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UsersService } from '../../users.service';
import { UserCardComponent } from "./user-card/user-card.component";
import { User } from '../../types/user.model';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, AsyncPipe, UserCardComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  public usersService = inject(UsersService)

  ngOnInit(): void {
    this.usersService.loadUsers()
  }

  openDialogCreateUser() {
    // this.usersService.createUser(result)
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id)
  }
}
