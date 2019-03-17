import { Component, OnInit } from '@angular/core';
import {Author} from '../../../models/Author';
import {BookCategory} from '../../../models/BookCategory';
import {AuthorService} from '../../../services/author-service/author.service';
import {BookCategoryService} from '../../../services/book-category-service/book-category.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  constructor(private authorService: AuthorService,
              private bookCategoryService: BookCategoryService) { }

  authors: Author[] = [];
  categories: BookCategory[] = [];

  ngOnInit() {
    this.initParameters();
  }

  async initParameters() {
    await this.initAuthors();
    await this.initBookCategories();
  }

  async initAuthors() {
    const response: any = await this.authorService.getAllAuthors();
    this.authors = response;
  }

  async initBookCategories() {
    const response: any = await this.bookCategoryService.getAllBookCategories();
    this.categories = response;
  }
}
