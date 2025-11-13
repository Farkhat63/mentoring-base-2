import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State as UsersState } from './user.reducer';

export const selectUsersFeature = createFeatureSelector<UsersState>('users');

export const selectUsers = createSelector(
  selectUsersFeature,
  (state: UsersState) => state.users
);