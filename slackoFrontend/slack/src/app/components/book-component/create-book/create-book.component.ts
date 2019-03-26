import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
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
import {DatePipe} from '@angular/common';
import {SnackbarService} from 'ngx-snackbar';
import {Book} from '../../../models/Book';
import {Router} from '@angular/router';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe extends DatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return super.transform(value, 'yyyy-MM-dd');
  }
}

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
              private imageService: ImageService,
              private dateFormatPipe: DateFormatPipe,
              private snackbarService: SnackbarService,
              private router: Router) { }

  authors: Chips[] = [];
  authorsDB: Author[] = [];
  categories: Chips[] = [];
  categoriesDB: BookCategory[] = [];
  createBookParams: FormGroup;
  URL = API_URL + '/api/v1/image';
  actualDate = this.dateFormatPipe.transform(new Date());
  waitingForResponse = false;

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
    this.authorsDB = response;
    this.authorsDB.forEach(author => this.authors.push(new Chips(author.authorFullName, author.authorFullName)));
  }

  async initBookCategories() {
    const response: any = await this.bookCategoryService.getAllBookCategories();
    this.categoriesDB = response;
    this.categoriesDB.forEach(category => this.categories.push(new Chips(category.bookCategoryName, category.bookCategoryName)));
  }

  createBookButtonClicked(createBookParams: any) {
    let categories: BookCategory[] = [];
    this.createBookParams.value.categories.forEach(chip => {
      let existOnDB = false;
      this.categoriesDB.forEach(category => {
        if (category.bookCategoryName === chip.display) {
          categories.push(category);
          existOnDB = true;
        }
      });
      if (!existOnDB) {
        categories.push(new BookCategory(null, chip.display));
      }
    });
    let authors: Author[] = [];
    this.createBookParams.value.authors.forEach(chip => {
      let existOnDB = false;
      this.authorsDB.forEach(author => {
        if (author.authorFullName === chip.display) {
          authors.push(author);
          existOnDB = true;
        }
      });
      if (!existOnDB) {
        authors.push(new Author(null, chip.display));
      }
    });
    const bookDto = new BookDTO(this.createBookParams.value.isbn, this.createBookParams.value.title,
      this.createBookParams.value.description, this.createBookParams.value.coverPictureUrl,
      this.createBookParams.value.publicationDate, authors, categories);
    this.bookService.createBook(bookDto).subscribe((response) => {
      const book: Book = response;
      console.log(book);
      if (book.id == null) {
        this.addSnackbar('An error occur: open console', 4000, 'red');
      } else {
        this.addSnackbar('Book created successfully', 4000, 'green');
        this.router.navigateByUrl('present-books');
      }
    });
  }

  async getBooksFromAPIs() {
    this.addSnackbar('Please wait ', 10000, 'green');
    this.waitingForResponse = true;
    const bookIsbn = this.createBookParams.value.isbn;
    const response: any = await this.bookService.getBooksDTOByIsbn(bookIsbn);
    const booksDTO: BookDTO[] = response;
    if (booksDTO != null && booksDTO.length > 0) {
      let authorsOnBeggining: Chips[] = [];
      let categoriesOnBeggining: Chips[] = [];
      if (booksDTO[0].authors != null) {
        booksDTO[0].authors.forEach(author => {
          authorsOnBeggining.push(new Chips(author.authorFullName, author.authorFullName));
        });
      }
      if (booksDTO[0].categories != null) {
        booksDTO[0].categories.forEach(author => {
          categoriesOnBeggining.push(new Chips(author.bookCategoryName, author.bookCategoryName));
        });
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
      this.clearSnackbar();
    } else {
      this.addSnackbar('Nothing found ', 3000, 'black');
    }
    this.waitingForResponse = false;
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

  addSnackbar(message: string, time: number, col: string) {
    this.snackbarService.add({
      msg: message.bold(),
      timeout: time,
      action: {
        text: 'OK',
        onClick: (snack) => {
         this.snackbarService.clear();
        }
      },
      color: col,
      background: 'Silver'
    });
  }
  clearSnackbar() {
    this.snackbarService.clear();
  }
}
