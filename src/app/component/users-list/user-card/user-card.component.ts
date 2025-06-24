import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { User } from '../../../types/user.model';
import { UsersService } from '../../../users.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  public usersService = inject(UsersService)

  @Input()
  public user!: User;

  @Output()
  public deleteUser: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  public editUser: EventEmitter<User> = new EventEmitter<User>();

  onEditUser(user: User) {
    this.editUser.emit(user)
  }

  onDeleteUser(id: number) {
    this.deleteUser.emit(id)
  }
}