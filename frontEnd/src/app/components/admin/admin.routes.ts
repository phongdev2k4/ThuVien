import { Routes } from '@angular/router';
import { AddAuthorComponent } from './author/add-author/add-author.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BooksComponent } from './book/books/books.component';
import { AddBookComponent } from './book/add-book/add-book.component';
import { AuthorsComponent } from './author/authors/authors.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProfileEditComponent } from './user/profile-edit/profile-edit.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UserListComponent } from './user/user-list/user-list.component';


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
    {
        path:'Profileadmin',
        component:ProfileComponent
    },
    {
        path:'ProfileEditadmin',
        component:ProfileEditComponent
    },
    {
        path:'AddUserComponentadmin',
        component:AddUserComponent
    },
    {
        path:'UserListadmin',
        component:UserListComponent
    },

];
