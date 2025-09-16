import { createReducer, on } from '@ngrx/store';
import { User } from '../../types/user.model';
import { UsersActions } from './user.actions';

export interface State {
    users: User[];
}

export const initialState: State = {
    users: [],
};

export const userReducer = createReducer(
    initialState,
    on(UsersActions.load, (state, { users }) => ({ ...state, users: users })),
    on(UsersActions.edit, (state, { user }) => ({ ...state, users: state.users.map(u => u.id === user.id ? user : u) })),
    on(UsersActions.create, (state, { user }) => ({ ...state, users: [...state.users, user] })),
    on(UsersActions.delete, (state, { id }) => ({ ...state, users: state.users.filter(u => u.id !== id) })),
);