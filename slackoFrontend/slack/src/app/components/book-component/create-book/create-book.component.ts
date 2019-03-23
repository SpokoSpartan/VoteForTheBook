import { Component, OnInit } from '@angular/core';
import {Author} from '../../../models/Author';
import {BookCategory} from '../../../models/BookCategory';
import {AuthorService} from '../../../services/author-service/author.service';
import {BookCategoryService} from '../../../services/book-category-service/book-category.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BookDTO} from '../../../models/DTOs/BookDTO';
import {BookService} from '../../../services/book-service/book.service';
import {ImageService} from '../../../services/image-service/image.service';
import {API_URL} from '../../../config';
import {Chips} from '../../../models/Chips';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css']
})
export class CreateBookComponent implements OnInit {

  constructor(private authorService: AuthorService,
              private bookCategoryService: BookCategoryService,
              private bookService: BookService,
              private formBuilder: FormBuilder,
              private imageService: ImageService) { }

  authors: Author[] = [];
  categories: BookCategory[] = [];
  createBookParams: FormGroup;
  URL = API_URL + '/api/v1/image';

  ngOnInit() {
    this.initFormGroup();
    this.initParameters();
  }

  initFormGroup() {
    this.createBookParams = this.formBuilder.group({
      title: ['', [Validators.required]],
      isbn: ['', [Validators.required, Validators.pattern('(([0-9Xx][- ]*){13}|([0-9Xx][- ]*){10})')]],
      description: ['', [Validators.maxLength(2000)]],
      coverPictureUrl: ['', [Validators.maxLength(1000)]],
      publicationDate: ['', [Validators.max(Date.now()), Validators.required]],
      authors: ['', [Validators.required]],
      categories: ['', [Validators.required]]
    });
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

  createBookButtonClicked(createBookParams: any) {
    console.log(createBookParams)
    let categories: BookCategory[] = [];
    this.createBookParams.value.categories.forEach(category => {
      if (category.id != null && category.id > 0) {
        categories.push(new BookCategory(category.id, category.bookCategoryName));
      } else {
        categories.push(new BookCategory(null, category.display));
      }
    });
    let authors: Author[] = [];
    this.createBookParams.value.authors.forEach(author => {
      if (author.id != null && author.id > 0) {
        authors.push(new Author(author.id, author.authorFullName));
      } else {
        authors.push(new Author(null, author.display));
      }
    });
    const bookDto = new BookDTO(this.createBookParams.value.isbn, this.createBookParams.value.title,
      this.createBookParams.value.description, this.createBookParams.value.coverPictureUrl,
      this.createBookParams.value.publicationDate, authors, categories);
    this.bookService.createBook(bookDto).subscribe((response) => {
      console.log(response);
    });
  }

  async getBooksFromAPIs() {
    const bookIsbn = this.createBookParams.value.isbn;
    const response: any = await this.bookService.getBooksDTOByIsbn(bookIsbn);
    const booksDTO: BookDTO[] = response;
    if (booksDTO != null) {
      let authorsOnBeggining: Chips[] = [];
      let categoriesOnBeggining: Chips[] = [];
      let i = -1;
      if (booksDTO[0].authors != null) {
        booksDTO[0].authors.forEach(author => authorsOnBeggining.push(new Chips(author.authorFullName, i--)));
      }
      if (booksDTO[0].categories != null) {
        booksDTO[0].categories.forEach(author => categoriesOnBeggining.push(new Chips(author.bookCategoryName, i--)));
      }
      if (booksDTO.length === 1) {
        this.createBookParams.patchValue({
          title: booksDTO[0].title,
          isbn: bookIsbn,
          description: booksDTO[0].description,
          coverPictureUrl: booksDTO[0].coverPictureUrl,
          publicationDate: booksDTO[0].publicationDate.toString().substring(0, 10),
          authors: authorsOnBeggining,
          categories: categoriesOnBeggining
        });
      }
    }
  }

  async uploadCoverPicture(imageInput: any) {
    try {
      const fileToUpload: File = imageInput.files[0];
      const fd = new FormData();
      fd.append('file', fileToUpload);
      this.imageService.uploadImage(fd).subscribe( response => {
        const url: string = this.URL + '/getOne/' + response.id + '.jpg';
        this.createBookParams.patchValue({coverPictureUrl: url});
      });
    } catch (e) {
    }
  }
}
