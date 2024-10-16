import { Routes } from '@angular/router';
import { NhanvienComponent } from './nhanvien/nhanvien.component';
import { PhieumuonComponent } from './phieumuon/phieumuon.component';
import { PhieuphatComponent } from './phieuphat/phieuphat.component';
import { PhieutraComponent } from './phieutra/phieutra.component';



export const routesNhanvien: Routes = [
    {
        path:'NhanVien',
        component:NhanvienComponent
    },
    {
        path:'PhieuMuon',
        component:PhieumuonComponent
    },
    {
        path:'PhieuPhat',
        component:PhieuphatComponent
    },
    {
        path:'PhieuTra',
        component:PhieutraComponent
    },
    {
        path:'tableNhanVien',
        component:PhieumuonComponent
    },
    {
        path:'tablePhieuMuon',
        component:PhieumuonComponent
    },
    {
        path:'tablePhieuPhat',
        component:PhieumuonComponent
    },
    {
        path:'tablePhieuTra',
        component:PhieumuonComponent
    },
];
