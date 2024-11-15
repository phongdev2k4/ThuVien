import { Routes } from '@angular/router';
import { AddAuthorComponent } from './author/add-author/add-author.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthorsComponent } from './author/authors/authors.component';
import { ProfileComponent } from './user/profile/profile.component';
import { ProfileEditComponent } from './user/profile-edit/profile-edit.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { BansaosachlistComponent } from './bansaosach/bansaosachlist/bansaosachlist.component';
import { AddBansaosachComponent } from './bansaosach/add-bansaosach/add-bansaosach.component';
import { TheloaiComponent } from './theloai/theloai/theloai.component';
import { AddTheloaiComponent } from './theloai/add-theloai/add-theloai.component';
import { BooksComponent } from './book/books/books.component';
import { AddBookComponent } from './book/add-book/add-book.component';
import { UpdateBansaosachComponent } from './bansaosach/update-bansaosach/update-bansaosach.component';
import { KholistComponent } from './kho/kholist/kholist.component';
import { AddkhoComponent } from './kho/addkho/addkho.component';
import { UpdateKhoComponent } from './kho/update-kho/update-kho.component';
import { BarcodeScannerComponent } from './testbarcode/barcode-scanner/barcode-scanner.component';
import { NhanvienComponent } from './nhanviens/nhanvien/nhanvien.component';
import { AddNhanvienComponent } from './nhanviens/add-nhanvien/add-nhanvien.component';
import { UpdateNhanvienComponent } from './nhanviens/update-nhanvien/update-nhanvien.component';
import { VnpayThanhcongComponent } from './ThongBao/vnpay-thanhcong/vnpay-thanhcong.component';
import { VnpayThatbaiComponent } from './ThongBao/vnpay-thatbai/vnpay-thatbai.component';


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
        path:'BanSaoSachList',
        component:BansaosachlistComponent
    },
    {
        path:'AddBanSaoSach',
        component:AddBansaosachComponent
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
        path:'bookadmin',
        component:BooksComponent
    },
    {
        path:'addBookadmin',
        component:AddBookComponent
    }, 
    {
        path:'updatebansaosach',
        component:UpdateBansaosachComponent
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
        path:'testBarcode',
        component:BarcodeScannerComponent
    },
    {
        path:'quanlynhanvien',
        component:NhanvienComponent
    },
    {
        path:'addNhanVien',
        component:AddNhanvienComponent
    },
    {
        path:'updateNhanVien',
        component:UpdateNhanvienComponent
    },

    { path: 'paymenSuccess',
     component: VnpayThanhcongComponent
    },

    { path: 'paymenFailure',
     component: VnpayThatbaiComponent  
    },
];
