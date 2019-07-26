import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/shared/genre';
import { GenresService } from 'src/app/shared/genres.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {

  genres: Genre[];
  empty: boolean = true;
  isLoaded: boolean = false;
  headElements = ['name'];

  constructor(private genresService: GenresService, private router: Router) { }

  ngOnInit() {
    this.genresService.getGenres().subscribe((data: Genre[]) => {
      this.genres = data
      this.isLoaded = true;
      if (data.length != 0) {
        this.empty = false;
      }
    })
  }
  genreDetails(genre: Genre) {
    this.router.navigate(['system/genres/details', genre.id])
  }
  genreEdit(genre: Genre) {
    this.router.navigate(['system/genres/edit', genre.id])
  }
  genreCreate() {
    this.router.navigate(['system/genres/create'])
  }
  genreDelete(genre: Genre) {
    this.router.navigate(['system/genres/delete', genre.id])
  }
}
