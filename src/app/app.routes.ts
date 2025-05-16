import { Routes } from '@angular/router';
import { UsersListComponent } from './component/users-list/users-list.component';
import { MainComponent } from './component/main/main.component';

export const routes: Routes = [
  {
    path: "",
    component: MainComponent
  },
  {
    path: "users",
    component: UsersListComponent
  }
];
