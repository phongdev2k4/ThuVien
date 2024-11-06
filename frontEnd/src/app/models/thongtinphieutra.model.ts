export interface ThongTinPhieuTra {
    maPT : string;
    hoiVien : {
        maHV: string;
        hoTen: string;
        soDienThoai: string;
    };
    nhanVien : string;
    ngayLapPhieuTra : string;
    phieuPhatList : string;
    PhieuMuon : {
        maPM: string;
        ngayLapPhieu: string;
        hanTraSach: string;
    };
    BanSaoSach : {
        Sach : string;
        tinhTrang : string;
    }

}