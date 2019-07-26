import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/shared/genre';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GenresService } from 'src/app/shared/genres.service';

@Component({
  selector: 'app-genre-delete',
  templateUrl: './genre-delete.component.html',
  styleUrls: ['./genre-delete.component.css']
})
export class GenreDeleteComponent implements OnInit {

  currentGenre: Genre;
  message: string;
  isLoaded: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private genresService: GenresService) { }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      let id = params['id'];
      this.genresService.getCertainGenre(id).subscribe((genre: Genre) => {
        this.currentGenre = genre;
        this.isLoaded = true;
      },
        error => this.message = error)
    })
  }
  deleteGenre() {    
    const id = this.activatedRoute.snapshot.params['id'];
    
    this.genresService.deleteGenre(id).subscribe(() => {
      this.message = `The ${this.currentGenre.name} was successfully deleted`;
      setTimeout(() => {
        this.returnToList()
      }, 1500);
    },
    error => this.message = error);
  }
  returnToList() {
    this.router.navigate(["/system/genres"])
  }



}
