import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Genre } from 'src/app/shared/genre';
import { GenresService } from 'src/app/shared/genres.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-genre-create-edit',
  templateUrl: './genre-create-edit.component.html',
  styleUrls: ['./genre-create-edit.component.css']
})
export class GenreCreateEditComponent implements OnInit {

  message: string;
  messageWarning: string;
  genreForm: FormGroup;
  isLoaded: boolean = false;
  genres: Genre[];
  currentGenre: Genre;
  isSame: boolean = false;

  constructor(private genresService: GenresService, private router: Router, private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.genresService.getGenres().subscribe(data => this.genres = data);
    this.buildForm();
    this.getGenreFromRoute();
  }

  buildForm() {
    this.genreForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.pattern('[A-Za-z]*'),
        Validators.minLength(2),
        Validators.maxLength(15)
      ])
    })
  }

  checkError(element: string, errorType: string) {
    return this.genreForm.get(element).hasError(errorType) &&
      this.genreForm.get(element).touched
  }
  getGenreFromRoute() {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params["id"];

      if (id) {
        this.genresService.getCertainGenre(id).subscribe(
          (genre: Genre) => {
            this.currentGenre = genre;
            this.genreForm.patchValue(this.currentGenre);
            this.isLoaded = true;
          },
          (error) => this.message = error
        );
      }
      else {
        this.currentGenre = new Genre(null, null);
        this.genreForm.patchValue(this.currentGenre);
        this.isLoaded = true;
      }
    })
  }

  onSubmit(genreForm: FormGroup) {
    this.checkSame(genreForm);

    if (this.isSame) {
      this.messageWarning = 'The Genre already exists';
      setTimeout(() => {
      this.messageWarning = ""
      }, 2000);
      this.isSame = false;
    }
    else {
      this.currentGenre.name = genreForm.value.name;
      this.currentGenre.name = this.currentGenre.name[0].toUpperCase() + this.currentGenre.name.slice(1);

      if (this.currentGenre.id) {
        this.genresService.editGenre(this.currentGenre).subscribe(
          () => {
            this.message = "The Genre was successfully updated";
            setTimeout(() => {
              this.returnToList()
            }, 1500)
          },
          (error) => this.message = error
        );
      }
      else {
        this.genresService.addGenre(this.currentGenre).subscribe(
          () => {
            this.message = "This Genre was successfully added"
            setTimeout(() => {
              this.returnToList()
            }, 1500)
          },
          error => this.message = error
        );
      }
    }
  }

  returnToList() {
    this.router.navigate(["system/genres"]);
  }

  checkSame(genreForm) {
    genreForm.value.name = genreForm.value.name[0].toUpperCase() + genreForm.value.name.slice(1) ;
    for (let genre of this.genres) {
      if (genre.name == genreForm.value.name) {
        this.isSame = true;
      }
    }
  }
}
