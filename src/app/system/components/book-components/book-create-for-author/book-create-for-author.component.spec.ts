import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCreateForAuthorComponent } from './book-create-for-author.component';

describe('BookCreateForAuthorComponent', () => {
  let component: BookCreateForAuthorComponent;
  let fixture: ComponentFixture<BookCreateForAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCreateForAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCreateForAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
