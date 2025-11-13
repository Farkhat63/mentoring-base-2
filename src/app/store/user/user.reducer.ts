import { createReducer, on } from '@ngrx/store';
import { User } from '../../types/user.model';
import { UsersActions } from './user.actions';

export interface State {
    users: User[];
    loading: boolean;
    error: string | null;
}

export const initialState: State = {
    users: [],
    loading: false,
    error: null,
};

export const userReducer = createReducer(
    initialState,
    on(UsersActions.loadUsers, (state: State): State => ({ ...state, loading: true, error: null })),
    on(
        UsersActions.loadSuccess,
        (state: State, { users }: ReturnType<typeof UsersActions.loadSuccess>): State => ({
            ...state,
            users: users,
            loading: false,
            error: null,
        }),
    ),
    on(
        UsersActions.loadFailure,
        (state: State, { error }: ReturnType<typeof UsersActions.loadFailure>): State => ({
            ...state,
            loading: false,
            error: error,
        }),
    ),
    on(
        UsersActions.edit,
        (state: State, { user }: ReturnType<typeof UsersActions.edit>): State => ({
            ...state,
            users: state.users.map((u: User) => (u.id === user.id ? user : u)),
        }),
    ),
    on(
        UsersActions.create,
        (state: State, { user }: ReturnType<typeof UsersActions.create>): State => ({
            ...state,
            users: [...state.users, user],
        }),
    ),
    on(
        UsersActions.delete,
        (state: State, { id }: ReturnType<typeof UsersActions.delete>): State => ({
            ...state,
            users: state.users.filter((u: User) => u.id !== id),
        }),
    ),
);