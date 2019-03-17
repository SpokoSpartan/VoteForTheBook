import {Author} from '../Author';
import {BookCategory} from '../BookCategory';

export class BookDTO {
  isbn: string;
  title: string;
  description: string;
  coverPictureUrl: string;
  publicationDate: Date;
  authors: Author[];
  categories: BookCategory[];

  constructor(isbn: string, title: string, description: string, coverPictureUrl: string,
              publicationDate: Date, authors: Author[], categories: BookCategory[]) {
    this.isbn = isbn;
    this.title = title;
    this.description = description;
    this.coverPictureUrl = coverPictureUrl;
    this.publicationDate = publicationDate;
    this.authors = authors;
    this.categories = categories;
  }
}
