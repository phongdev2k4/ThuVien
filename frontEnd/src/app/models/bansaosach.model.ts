import { Kho } from "./kho.model";
import { Sach } from "./sach.model";

export interface BanSaoSach {
    maBanSaoSach: number;  // Mã bản sao sách
    sach: Sach;            // Đối tượng sách
    kho: Kho;              // Đối tượng kho
    trangThaiMuon: string; // Trạng thái mượn
    trangThaiBaoQuan: string; // Trạng thái bảo quản
    soLuong123: number; 
}