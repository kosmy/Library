import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system.component';
import { AuthorsComponent } from './components/author-components/authors/authors.component';
import { BooksComponent } from './components/book-components/books/books.component';
import { GenresComponent } from './components/genre-components/genres/genres.component';
import { AuthorDetailsComponent } from './components/author-components/author-details/author-details.component';
import { AuthorCreateEditComponent } from './components/author-components/author-create-edit/author-create-edit.component';
import { AuthorDeleteComponent } from './components/author-components/author-delete/author-delete.component';
import { BookDetailsComponent } from './components/book-components/book-details/book-details.component';
import { BookCreateEditComponent } from './components/book-components/book-create-edit/book-create-edit.component';
import { BookDeleteComponent } from './components/book-components/book-delete/book-delete.component';
import { BookCreateForAuthorComponent } from './components/book-components/book-create-for-author/book-create-for-author.component';
import { GenreCreateEditComponent } from './components/genre-components/genre-create-edit/genre-create-edit.component';
import { GenreDeleteComponent } from './components/genre-components/genre-delete/genre-delete.component';


const routes: Routes = [
  { path: 'system', component: SystemComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: 'authors'},
    { path: 'authors', component: AuthorsComponent},
    { path: 'authors/details/:id', component: AuthorDetailsComponent},
    { path: 'authors/create', component: AuthorCreateEditComponent},
    { path: 'authors/edit/:id', component: AuthorCreateEditComponent},
    { path: 'authors/delete/:id', component: AuthorDeleteComponent},
    { path: 'authors/createBookForAuthor/:id', component: BookCreateForAuthorComponent},
    { path: 'books', component: BooksComponent},
    { path: 'books/details/:id', component: BookDetailsComponent},
    { path: 'books/create', component: BookCreateEditComponent},
    { path: 'books/edit/:id', component: BookCreateEditComponent},
    { path: 'books/delete/:id', component: BookDeleteComponent},
    { path: 'genres', component: GenresComponent},
    { path: 'genres/create', component: GenreCreateEditComponent},
    { path: 'genres/edit/:id', component: GenreCreateEditComponent},
    { path: 'genres/delete/:id', component: GenreDeleteComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
