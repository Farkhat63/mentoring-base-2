import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserCardComponent } from "./user-card/user-card.component";
import { User } from '../../types/user.model';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditUserDialogComponent } from '../dialog/user-form-gialog/user-form-gialog.component';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { UsersApiService } from '../../users-api.service';
import { UsersLocalStorageService } from '../../users-local-storage.service';
import { UsersActions } from '../../store/user/user.actions';
import { selectUsers } from '../../store/user/user.selectors';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [NgFor, AsyncPipe, UserCardComponent, MatButtonModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent {
  readonly dialog = inject(MatDialog);

  private readonly usersLocalStorageService = inject(UsersLocalStorageService);
  private readonly usersApiService = inject(UsersApiService)
  private readonly store = inject(Store)
  public readonly users$ = this.store.select(selectUsers)

  ngOnInit(): void {
    this.usersApiService.getUsers().subscribe(
        (response: User[]) => {
          this.store.dispatch(UsersActions.load({ users: response }));
          this.usersLocalStorageService.saveUsers(response);
        }
      )
  }

  createEditUserDialog(user?: User) {
    this.dialog.open(CreateEditUserDialogComponent, {
      data: {
        user: user
      }
    })
    .afterClosed().subscribe(result => {
      if (result) {
      }
      if (result) {
      !!user ? this.store.dispatch(UsersActions.edit({ user: result })) : this.store.dispatch(UsersActions.create({ user: result }))
      }
    })
  }

  deleteUser(id: number) {
    this.store.dispatch(UsersActions.delete({ id }) )
  }
}