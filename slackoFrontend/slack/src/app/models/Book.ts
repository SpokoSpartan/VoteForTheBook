import {Author} from './Author';
import {BookCategory} from './BookCategory';

export class Book {
  id: number;
  isbn: string;
  title: string;
  description: string;
  coverPictureUrl: string;
  publicationDate: Date;
  authors: Author[];
  categories: BookCategory[];
  isVotedByUser: boolean;

  constructor(id: number, isbn: string, title: string, description: string, coverPictureUrl: string,
              publicationDate: Date, authors: Author[], categories: BookCategory[], isVotedByUser: boolean) {
    this.id = id;
    this.isbn = isbn;
    this.title = title;
    this.description = description;
    this.coverPictureUrl = coverPictureUrl;
    this.publicationDate = publicationDate;
    this.authors = authors;
    this.categories = categories;
    this.isVotedByUser = isVotedByUser;
  }
}
