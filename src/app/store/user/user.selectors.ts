import { createSelector } from '@ngrx/store';
import { User } from '../../types/user.model';

export interface UsersState {
  users: User[];
}

export interface AppState {
  users: UsersState;
}

export const selectUsersFeature = (state: AppState) => state.users;

export const selectUsers = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.users
);