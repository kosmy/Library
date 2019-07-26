import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toAuthors() {
    this.router.navigate(['system/authors'])
  }
  toBooks() {
    this.router.navigate(['system/books'])
  }
  toGenres() {
    this.router.navigate(['system/genres'])
  }
}
