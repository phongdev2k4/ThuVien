export interface Sach {
    maSach: string;       // Mã sách
    tenSach: string;      // Tên sách
    nxb: string;          // Nhà xuất bản
    namXB: number;        // Năm xuất bản
    tacGia: {             // Đối tượng tác giả
        maTacGia: string;   // Mã tác giả
        tenTacGia: string;  // Tên tác giả
        ngaySinh: Date;     // Ngày sinh
        quocGia: string;    // Quốc gia
    };
    hinhAnhSach: string;  // Hình ảnh sách
    theLoai: {             // Đối tượng thể loại
        maTheLoai: string;  // Mã thể loại
        tenTheLoai: string; // Tên thể loại
    };
    moTa: string;         // Mô tả sách
}
