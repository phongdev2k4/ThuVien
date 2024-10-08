import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { BooksComponent } from './components/admin/book/books/books.component';
import { AddBookComponent } from './components/admin/book/add-book/add-book.component';
import path from 'path';
import { AuthorsComponent } from './components/admin/author/authors/authors.component';
import { AddAuthorComponent } from './components/admin/author/add-author/add-author.component';

export const routes: Routes = [

    {
        path:'',
        component:HomeComponent
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
    {
        path:'AddAuthorsAdmin',
        component:AddAuthorComponent
    },
    
];
