import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../../../types/user.model';
import { UsersService } from '../../../users.service';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  public usersService = inject(UsersService)

  @Input()
  public user!: User;

  @Output()
  private deleteUser = new EventEmitter

  openDialogEditUser() {
    // this.usersService.editUser(this.user)
  }

  onDeleteUser(id: number) {
    this.deleteUser.emit(id)
  }
}
