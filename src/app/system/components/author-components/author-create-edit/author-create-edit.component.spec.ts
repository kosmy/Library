import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorCreateEditComponent } from './author-create-edit.component';

describe('AuthorCreateEditComponent', () => {
  let component: AuthorCreateEditComponent;
  let fixture: ComponentFixture<AuthorCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
