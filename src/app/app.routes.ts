import { Routes } from '@angular/router';
import { UsersListComponent } from './component/users-list/users-list.component';
import { MainComponent } from './component/main/main.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './guard/admin.guard';

export const routes: Routes = [
  {
    path: "",
    component: MainComponent
  },
  {
    path: "users",
    component: UsersListComponent
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AdminGuard]
  }
];
