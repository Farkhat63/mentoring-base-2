import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../types/user.model';

export const UsersActions = createActionGroup({
    source: 'Users',
    events: {
        'load Users': emptyProps(),
        'load Success': props<{ users: User[] }>(),
        'load Failure': props<{ error: string }>(),

        'edit': props<{ user: User }>(),

        'create': props<{ user: User }>(),
        'delete': props<{ id: number }>(),
    }
});