import { Component, OnInit } from '@angular/core';
import { AuthorsService } from 'src/app/shared/authors.service';
import { Router } from '@angular/router';
import { Author } from 'src/app/shared/author';
import { GenresService } from 'src/app/shared/genres.service';
import { Genre } from 'src/app/shared/genre';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: Author[];
  empty: boolean = true;
  headElements = ['name', 'birthday'];
  isLoaded: boolean = false;
  message: string;
  genresIsEmpty: boolean;

  constructor(private authorsService: AuthorsService, private router: Router, private genresService: GenresService) { }

  ngOnInit() {
    this.authorsService.getAuthors().subscribe((data: Author[]) => {
      this.authors = data
      this.isLoaded = true;
      if (data.length != 0) {
        this.empty = false;
      }
    });
    this.genresService.getGenres().subscribe((genres: Genre[]) => {
      if (genres.length == 0) {
        this.genresIsEmpty = true;
      }
    });
  }
  authorDetails(author: Author) {
    this.router.navigate(['system/authors/details', author.id])
  }
  authorEdit(author: Author) {
    this.router.navigate(['system/authors/edit', author.id])
  }
  authorCreate() {
    this.router.navigate(['system/authors/create'])
  }
  authorDelete(author: Author) {
    this.router.navigate(['system/authors/delete', author.id])
  }
  addBook(author: Author) {
    if (this.genresIsEmpty) {
      this.message = "The list of genres is empty. Please, add genres before book creation";
      setTimeout(() => {
        this.router.navigate(['system/genres/create'])
      }, 3000)
    }
    else {
      this.router.navigate(['system/authors/createBookForAuthor', author.id])
    }
  }
}
