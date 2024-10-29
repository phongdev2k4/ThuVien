import { Routes } from '@angular/router';
import { NhanvienComponent } from './nhanvien/nhanvien.component';
import { PhieumuonComponent } from './phieumuon/phieumuon.component';
import { PhieuphatComponent } from './phieuphat/phieuphat.component';
import { PhieutraComponent } from './phieutra/phieutra.component';
import { TableNhanvienComponent } from './table-nhanvien/table-nhanvien.component';
import { TablePhieumuonComponent } from './table-phieumuon/table-phieumuon.component';
import { TablePhieuphatComponent } from './table-phieuphat/table-phieuphat.component';
import { TablePhieutraComponent } from './table-phieutra/table-phieutra.component';



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
        component:TableNhanvienComponent
    },
    {
        path:'tablePhieuMuon',
        component:TablePhieumuonComponent
    },
    {
        path:'tablePhieuPhat',
        component:TablePhieuphatComponent
    },
    {
        path:'tablePhieuTra',
        component:TablePhieutraComponent
    },
];
