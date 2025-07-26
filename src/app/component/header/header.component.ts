import { DatePipe, NgFor, NgIf, } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditColorDirective } from '../../directive/edit-color.directive';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, DatePipe, EditColorDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public AuthServiceService = inject(AuthServiceService)

  readonly headerItem1 = headerItem1;
  readonly aboutCompany = company(headerItem2);
  readonly headerItem3 = headerItem3;

  catalogItems = upperCaseMenuItems

  public data = new Date().getDate()
}

const catalogItems = ['Каталог','Стройматериалы','Инструменты','Электрика','Интерьер и одежда'];
const upperCaseMenuItems = catalogItems.map(
  ( item: string ) => {
    return item.toUpperCase()
  }
)

const headerItem1 = 'Главная';
const headerItem2 = 'О компании';
const headerItem3 = 'Каталог';

const company = (name:string) => name;
