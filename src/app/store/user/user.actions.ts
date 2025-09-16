import { createActionGroup, props } from '@ngrx/store';
import { User } from '../../types/user.model';

export const UsersActions = createActionGroup({
    source: 'Users',
    events: {
        'load': props<{ users: User[] }>(),

        'edit': props<{ user: User }>(),

        'create': props<{ user: User }>(),
        'delete': props<{ id: number }>(),
    }
});