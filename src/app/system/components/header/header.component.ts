import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

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
