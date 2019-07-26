import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system.component';
import { HeaderComponent } from './components/header/header.component';
import { ContentComponent } from './components/content/content.component';
import { FooterComponent } from './components/footer/footer.component';
import { AuthorsComponent } from './components/author-components/authors/authors.component';
import { BooksComponent } from './components/book-components/books/books.component';
import { SystemRoutingModule } from './system-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavComponent } from './components/content/nav/nav.component';
import { SectionComponent } from './components/content/section/section.component';
import { AuthorDetailsComponent } from './components/author-components/author-details/author-details.component';
import { AuthorCreateEditComponent } from './components/author-components/author-create-edit/author-create-edit.component';
import { AuthorDeleteComponent } from './components/author-components/author-delete/author-delete.component';
import { BookDetailsComponent } from './components/book-components/book-details/book-details.component';
import { BookCreateEditComponent } from './components/book-components/book-create-edit/book-create-edit.component';
import { BookDeleteComponent } from './components/book-components/book-delete/book-delete.component';
import { AuthorsService } from '../shared/authors.service';
import { BookCreateForAuthorComponent } from './components/book-components/book-create-for-author/book-create-for-author.component';
import { BooksService } from '../shared/books.service';
import { GenresComponent } from './components/genre-components/genres/genres.component';
import { GenreCreateEditComponent } from './components/genre-components/genre-create-edit/genre-create-edit.component';
import { GenreDeleteComponent } from './components/genre-components/genre-delete/genre-delete.component';
import { MDBBootstrapModule} from 'angular-bootstrap-md';
import { WavesModule, TableModule, IconsModule } from 'angular-bootstrap-md';
import { GenresService } from '../shared/genres.service';

@NgModule({
  declarations: [
    SystemComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    AuthorsComponent,
    BooksComponent,
    NavComponent,
    SectionComponent,
    AuthorDetailsComponent,
    AuthorCreateEditComponent,
    AuthorDeleteComponent,
    BookDetailsComponent,
    BookCreateEditComponent,
    BookDeleteComponent,
    BookCreateForAuthorComponent,
    GenresComponent,
    GenreCreateEditComponent,
    GenreDeleteComponent  
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    WavesModule,
    TableModule,
    IconsModule,
    MDBBootstrapModule
  ],
  providers: [
    AuthorsService,
    BooksService,
    GenresService
  ]

})
export class SystemModule { }
