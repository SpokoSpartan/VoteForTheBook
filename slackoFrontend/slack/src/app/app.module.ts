import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/registration-component/registration/registration.component';
import { BookComponent } from './components/book-component/book/book.component';
import {BookService} from './services/book-service/book.service';
import {RouterModule} from '@angular/router';
import {routes} from './rootes';
import {HttpClientModule} from '@angular/common/http';
import { CreateBookComponent } from './components/book-component/create-book/create-book.component';
import {TagInputModule} from 'ngx-chips';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthorService} from './services/author-service/author.service';
import {BookCategoryService} from './services/book-category-service/book-category.service';
import {RestService} from './services/rest-service/rest.service';
import { NavbarComponent } from './components/navbar-component/navbar/navbar.component';
import { LoginComponent } from './components/login-component/login/login.component';
import {UserService} from './services/user-service/user.service';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    CreateBookComponent,
    NavbarComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [BookService, AuthorService, BookCategoryService, RestService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
