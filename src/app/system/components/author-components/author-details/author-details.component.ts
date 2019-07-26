import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/shared/author';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthorsService } from 'src/app/shared/authors.service';
import { GenresService } from 'src/app/shared/genres.service';
import { Genre } from 'src/app/shared/genre';

@Component({
  selector: 'app-author-details',
  templateUrl: './author-details.component.html',
  styleUrls: ['./author-details.component.css']
})
export class AuthorDetailsComponent implements OnInit {

  currentAuthor: Author;
  message: string;
  isLoaded: boolean = false;
  genresIsEmpty: boolean = false;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authorsService: AuthorsService,private genresService: GenresService) { }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.params['id'];

    this.authorsService.getAuthors().subscribe((data: Author[]) => {
      console.log(data)
      this.currentAuthor = data.find(item => item.id == id);
      console.log(this.currentAuthor)
      this.isLoaded = true
    })

    this.genresService.getGenres().subscribe((genres: Genre[]) => {
      if (genres.length == 0) {
        this.genresIsEmpty = true;
      }
    });
  }
  returnToAuthors() {
    this.router.navigate(["system/authors"]);
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
