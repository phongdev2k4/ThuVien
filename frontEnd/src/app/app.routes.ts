import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileEditComponent } from './components/user/profile-edit/profile-edit.component';
import { AddAuthorComponent } from './components/admin/author/add-author/add-author.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AuthorsComponent } from './components/admin/author/authors/authors.component';
import { ProfileComponent } from './components/admin/user/profile/profile.component';
import { AddUserComponent } from './components/admin/user/add-user/add-user.component';
import { UserListComponent } from './components/admin/user/user-list/user-list.component';
import { BansaosachlistComponent } from './components/admin/bansaosach/bansaosachlist/bansaosachlist.component';

export const routes: Routes = [
    { path: '', redirectTo: 'trangChu', pathMatch: 'full' },

    {
        path: 'trangChu',
        component: HomeComponent,
       
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
