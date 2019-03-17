import { TestBed } from '@angular/core/testing';

import { BookCategoryService } from './book-category.service';

describe('BookCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookCategoryService = TestBed.get(BookCategoryService);
    expect(service).toBeTruthy();
  });
});
