import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { UsersActions } from './user.actions';
import { UsersApiService } from '../../users-api.service';
import { UsersLocalStorageService } from '../../users-local-storage.service';
import { User } from '../../types/user.model';
import { selectUsers } from './user.selectors';

@Injectable()
export class UserEffects {
  private readonly actions$: Actions = inject(Actions);
  private readonly store: Store = inject(Store);
  private readonly usersApiService: UsersApiService = inject(UsersApiService);
  private readonly usersLocalStorageService: UsersLocalStorageService = inject(UsersLocalStorageService);

  readonly loadUsers$ = createEffect(
    (): Observable<
      | ReturnType<typeof UsersActions.loadSuccess>
      | ReturnType<typeof UsersActions.loadFailure>
    > =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      switchMap(() => {
        const localUsers = this.usersLocalStorageService.loadUsers();
        
        if (localUsers) {
          return of(UsersActions.loadSuccess({ users: localUsers }));
        }
        
        return this.usersApiService.getUsers().pipe(
          map((users: User[]) => UsersActions.loadSuccess({ users })),
          catchError((error: unknown) => {
            const message =
              error instanceof Error ? error.message : 'Failed to load users';
            return of(UsersActions.loadFailure({ error: message }));
          })
        );
      })
    )
  );

  readonly saveUsersToLocalStorage$ = createEffect(
    (): Observable<ReturnType<typeof UsersActions.loadSuccess>> =>
      this.actions$.pipe(
        ofType(UsersActions.loadSuccess),
        tap(({ users }: ReturnType<typeof UsersActions.loadSuccess>) => {
          console.log('saveUsersToLocalStorage', users);
          this.usersLocalStorageService.saveUsers(users);
        })
      ),
    { dispatch: false }
  );

  readonly saveUsersAfterCreate$ = createEffect(
    (): Observable<[ReturnType<typeof UsersActions.create>, User[]]> =>
      this.actions$.pipe(
        ofType(UsersActions.create),
        concatLatestFrom(() => this.store.select(selectUsers)),
        tap(([, users]: [ReturnType<typeof UsersActions.create>, User[]]) => {
          console.log('saveUsersAfterCreate', users);
          this.usersLocalStorageService.saveUsers(users);
        })
      ),
    { dispatch: false }
  );

  readonly saveUsersAfterEdit$ = createEffect(
    (): Observable<[ReturnType<typeof UsersActions.edit>, User[]]> =>
      this.actions$.pipe(
        ofType(UsersActions.edit),
        concatLatestFrom(() => this.store.select(selectUsers)),
        tap(([, users]: [ReturnType<typeof UsersActions.edit>, User[]]) => {
          console.log('saveUsersAfterEdit', users);
          this.usersLocalStorageService.saveUsers(users);
        })
      ),
    { dispatch: false }
  );

  readonly saveUsersAfterDelete$ = createEffect(
    (): Observable<[ReturnType<typeof UsersActions.delete>, User[]]> =>
      this.actions$.pipe(
        ofType(UsersActions.delete),
        concatLatestFrom(() => this.store.select(selectUsers)),
        tap(([, users]: [ReturnType<typeof UsersActions.delete>, User[]]) => {
          console.log('saveUsersAfterDelete', users);
          this.usersLocalStorageService.saveUsers(users);
        })
      ),
    { dispatch: false }
  );
}

