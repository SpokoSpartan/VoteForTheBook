import {Routes} from '@angular/router';
import {BookComponent} from './components/book-component/book/book.component';
import {CreateBookComponent} from './components/book-component/create-book/create-book.component';


export const routes: Routes = [
  {path: '', redirectTo: 'books-management', pathMatch: 'full'},
  {path: 'books-management', component: BookComponent},
  {path: 'create-book', component: CreateBookComponent}
]
