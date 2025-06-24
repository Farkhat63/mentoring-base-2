import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UsersService } from '../../users.service';
import { UserCardComponent } from "./user-card/user-card.component";
import { User } from '../../types/user.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserDialogComponent } from '../dialog/user-form-gialog/user-form-gialog.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, AsyncPipe, UserCardComponent, MatButtonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  readonly dialog = inject(MatDialog);

  public usersService = inject(UsersService)

  ngOnInit(): void {
    this.usersService.loadUsers()
  }

  createEditUserDialog(user?: User) {
    this.dialog.open(CreateEditUserDialogComponent, {
      data: {
        user: user
      }
    })
    .afterClosed().subscribe(result => {
      if (result) {
      !!user ? this.usersService.editUser(result) : this.usersService.createUser(result)
      }
    })
  }

  deleteUser(id: number) {
    this.usersService.deleteUser(id)
  }
}