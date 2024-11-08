import { Routes } from '@angular/router';
import { ChitietComponent } from './components/chitiet/chitiet/chitiet.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileEditComponent } from './components/user/profile-edit/profile-edit.component';
import { AddAuthorComponent } from './components/admin/author/add-author/add-author.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { BooksComponent } from './components/admin/book/books/books.component';
import { AddBookComponent } from './components/admin/book/add-book/add-book.component';
import { AuthorsComponent } from './components/admin/author/authors/authors.component';
import { ProfileComponent } from './components/admin/user/profile/profile.component';
import { AddUserComponent } from './components/admin/user/add-user/add-user.component';
import { UserListComponent } from './components/admin/user/user-list/user-list.component';
import { TheloaiComponent } from './components/admin/theloai/theloai/theloai.component';
import { AddTheloaiComponent } from './components/admin/theloai/add-theloai/add-theloai.component';

export const routes: Routes = [
    {   
        path: '',
        redirectTo: 'trangChu', 
        pathMatch: 'full'
     },

    {
        path: 'trangChu',
        component: HomeComponent,
       
    },

    {
        path:'chitiet',
        component:ChitietComponent
    },

    { 
        path: 'login', 
        component: LoginComponent
 },
 { 
    path: 'register', 
    component: RegisterComponent
},
{ 
    path: 'editUser', 
    component: ProfileEditComponent
},
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

{
    path:'AdminListTheloai',
    component:TheloaiComponent
},
{
    path:'AdminAddTheloai',
    component:AddTheloaiComponent
},
];

