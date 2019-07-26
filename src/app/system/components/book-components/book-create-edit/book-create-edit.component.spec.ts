import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCreateEditComponent } from './book-create-edit.component';

describe('BookCreateEditComponent', () => {
  let component: BookCreateEditComponent;
  let fixture: ComponentFixture<BookCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
