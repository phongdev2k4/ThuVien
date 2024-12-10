import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileEditComponent } from './components/user/profile-edit/profile-edit.component';
import { AddAuthorComponent } from './components/admin/author/add-author/add-author.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { BooksComponent } from './components/admin/book/books/books.component';
import { AddBookComponent } from './components/admin/book/add-book/add-book.component';
import { AuthorsComponent } from './components/admin/author/authors/authors.component';

import { TheloaiComponent } from './components/admin/theloai/theloai/theloai.component';
import { AddTheloaiComponent } from './components/admin/theloai/add-theloai/add-theloai.component';
import { authGuard } from './guards/auth.guard';
import { KholistComponent } from './components/admin/kho/kholist/kholist.component';
import { AddkhoComponent } from './components/admin/kho/addkho/addkho.component';
import { UpdateKhoComponent } from './components/admin/kho/update-kho/update-kho.component';
import { BansaosachlistComponent } from './components/admin/bansaosach/bansaosachlist/bansaosachlist.component';
import { AddBansaosachComponent } from './components/admin/bansaosach/add-bansaosach/add-bansaosach.component';
import { UpdateBansaosachComponent } from './components/admin/bansaosach/update-bansaosach/update-bansaosach.component';

import { ListPhieuTraComponent } from './components/admin/phieu-tra/list-phieu-tra/list-phieu-tra.component';
import { LapPhieuTraComponent } from './components/admin/phieu-tra/lap-phieu-tra/lap-phieu-tra.component';
import { PhieuphatComponent } from './components/admin/phieuphat/lapPhieuPhat/phieuphat.component';
import { PhieuMuonComponent } from './components/admin/phieu-muon/lapPhieuMuon/phieu-muon.component';
import { TablePhieuMuonComponent } from './components/admin/phieu-muon/table-phieu-muon/table-phieu-muon.component';
import { TablePhieuphatComponent } from './components/admin/phieuphat/table-phieuphat/table-phieuphat.component';
import { ReportsComponent } from './components/admin/reports/reports.component';
import { LapPhieuMuonOnlineComponent } from './components/user/lap-phieu-muon-online/lap-phieu-muon-online.component';
import { ProfilecusEditComponent } from './components/user/profilecus-edit/profilecus-edit.component';
// import { PhieuphatComponent } from './components/admin/phieu-tra/phieuphat/phieuphat.component';


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
    component:DashboardComponent,
    
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
    path:'ProfileEditadmin',
    component:ProfileEditComponent
},


{
    path:'AdminListTheloai',
    component:TheloaiComponent
},
{
    path:'AdminAddTheloai',
    component:AddTheloaiComponent
},
{
    path:'PhieuMuon',
    component:PhieuMuonComponent
},
{
    path:'PhieuMuonList',
    component:TablePhieuMuonComponent
},
{
    path:'ListkhoAdmin',
    component:KholistComponent
},
{
    path:'addKhoAdmin',
    component:AddkhoComponent
},
{
    path:'updateKhoAdmin',
    component:UpdateKhoComponent
},
{
    path:'BanSaoSachList',
    component:BansaosachlistComponent
},
{
    path:'AddBanSaoSach',
    component:AddBansaosachComponent
},
{
    path:'updatebansaosach',
    component:UpdateBansaosachComponent
},

{
    path:'TablePhieuTra',
    component: ListPhieuTraComponent
},
{
    path:'LapPhieuTra',
    component:LapPhieuTraComponent
},
{
    path:'PhieuPhat',
    component:PhieuphatComponent
},
{
    path:'TablePhieuPhat',
    component:TablePhieuphatComponent
},
{
    path:'Report',
    component:ReportsComponent
},
{
    path:'lapPhieuMuonOnline',
    component:LapPhieuMuonOnlineComponent
},
{
    path:'Profilecus',
    component:ProfilecusEditComponent
},



];
