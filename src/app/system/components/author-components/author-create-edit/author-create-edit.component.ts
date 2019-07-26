import { Component, OnInit } from '@angular/core';
import { AuthorsService } from 'src/app/shared/authors.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Author } from 'src/app/shared/author';
import { BooksService } from 'src/app/shared/books.service';
import { Book } from 'src/app/shared/book';

@Component({
  selector: 'app-author-create-edit',
  templateUrl: './author-create-edit.component.html',
  styleUrls: ['./author-create-edit.component.css']
})
export class AuthorCreateEditComponent implements OnInit {

  currentAuthor: Author;
  currentBook: Book;
  message: string;
  authorForm: FormGroup;
  isLoaded: boolean = false;

  constructor(private authorsService: AuthorsService, private router: Router, private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.buildForm();
    this.getAuthorFromRoute();
  }

  buildForm() {
    this.authorForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern('[A-Za-z]*'),
        Validators.minLength(2),
        Validators.maxLength(15)
      ]),
      surname: new FormControl(null, [
        Validators.required,
        Validators.pattern('[A-Za-z]*'),
        Validators.minLength(2),
        Validators.maxLength(15)
      ]),
      fName: new FormControl(null, [
        Validators.pattern('[A-Za-z]*'),
        Validators.minLength(2),
        Validators.maxLength(15)
      ]),
      birthday: new FormControl(null, Validators.required),
    })
  }

  checkError(element: string, errorType: string) {
    return this.authorForm.get(element).hasError(errorType) &&
      this.authorForm.get(element).touched
  }
  getAuthorFromRoute() {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params["id"];

      if (id) {
        this.authorsService.getCertainAuthor(id).subscribe(
          (author: Author) => {
            this.currentAuthor = author;
            this.authorForm.patchValue(this.currentAuthor);
            this.isLoaded = true;
          },
          (error) => this.message = error
        );
      }
      else {
        this.currentAuthor = new Author(null, null, null, null, null, null);
        this.authorForm.patchValue(this.currentAuthor);
        this.isLoaded = true;
      }
    })
  }

  onSubmit(authorForm: FormGroup) {
    this.currentAuthor.name = authorForm.value.name;
    this.currentAuthor.name = this.currentAuthor.name[0].toUpperCase() + this.currentAuthor.name.slice(1);

    this.currentAuthor.surname = authorForm.value.surname;
    this.currentAuthor.surname = this.currentAuthor.surname[0].toUpperCase() + this.currentAuthor.surname.slice(1);

    this.currentAuthor.fName = authorForm.value.fName;
    if (this.currentAuthor.fName != undefined) {
      this.currentAuthor.fName = this.currentAuthor.fName[0].toUpperCase() + this.currentAuthor.fName.slice(1);
    }

    this.currentAuthor.birthday = authorForm.value.birthday;

    if (this.currentAuthor.id) {
      this.authorsService.editAuthor(this.currentAuthor).subscribe(
        () => {
          this.message = "The Author was successfully updated";
          setTimeout(() => {
            this.returnToList()
          }, 1500)
        },
        (error) => this.message = error
      );
    }
    else {
      this.currentAuthor.books = [];
      this.authorsService.addAuthor(this.currentAuthor).subscribe(
        () => {
          this.message = "The Author was successfully added"
          setTimeout(() => {
            this.returnToList()
          }, 1500)
        },
        error => this.message = error
      );
    }
  }
  returnToList() {
    this.router.navigate(["system/authors"]);
  }

  
}
