import {Routes} from '@angular/router';
import {BookComponent} from './components/book-component/book/book.component';
import {CreateBookComponent} from './components/book-component/create-book/create-book.component';
import {RegistrationComponent} from './components/registration-component/registration/registration.component';
import {LoginComponent} from './components/login-component/login/login.component';
import {ConfirmationComponent} from './components/registration-component/confirmation/confirmation.component';
import {PresentBookComponent} from './components/book-component/present-book/present-book.component';


export const routes: Routes = [
  {path: '', redirectTo: 'create-book', pathMatch: 'full'},
  {path: 'books-management', component: BookComponent},
  {path: 'create-book', component: CreateBookComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'confirm/:token', component: ConfirmationComponent},
  {path: 'present-books', component: PresentBookComponent}
]
