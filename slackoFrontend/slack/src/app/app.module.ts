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
import { FooterComponent } from './components/footer-component/footer/footer.component';
import { NavbarComponent } from './components/navbar-component/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    BookComponent,
    CreateBookComponent,
    FooterComponent,
    NavbarComponent
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
  providers: [BookService, AuthorService, BookCategoryService, RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
