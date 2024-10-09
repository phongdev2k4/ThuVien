import { Routes } from '@angular/router';
import { AddAuthorComponent } from './author/add-author/add-author.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BooksComponent } from './book/books/books.component';
import { AddBookComponent } from './book/add-book/add-book.component';
import { AuthorsComponent } from './author/authors/authors.component';


export const routesAdmin: Routes = [
    {
        path:'AddAuthorsAdmin',
        component:AddAuthorComponent
    },
    {
        path:'DashboardAdmin',
        component:DashboardComponent
    },
    {
        path:'bookadmin',
        component:BooksComponent
    },
    {
        path:'addBookadmin',
        component:AddBookComponent
    },
    {
        path:'AuthorsAdmin',
        component:AuthorsComponent
    },
];
