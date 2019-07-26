import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreCreateEditComponent } from './genre-create-edit.component';

describe('GenreCreateEditComponent', () => {
  let component: GenreCreateEditComponent;
  let fixture: ComponentFixture<GenreCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
