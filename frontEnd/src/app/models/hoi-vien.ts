export class HoiVien {
    maHV: string;                // Corresponds to @Column(name = "MaHV", length = 30)
    email: string;              // Corresponds to @Column(name = "Email", length = 255, unique = true)
    soDienThoai: string;        // Corresponds to @Column(name = "SoDienThoai", length = 20)
    hoTen: string;              // Corresponds to @Column(name = "HoTen", columnDefinition = "nvarchar(150)")
    diaChi: string;             // Corresponds to @Column(name = "DiaChi", columnDefinition = "nvarchar(255)")
    thoiGianDangKy: Date;      // Corresponds to @Column(name = "ThoiGianDangKy", columnDefinition = "datetime default CURRENT_TIMESTAMP")
    tinhTrang: boolean;         // Corresponds to @Column(name = "TinhTrang")
    tienNap: number;            // Corresponds to @Column(name = "TienNap")
  
    constructor(
      maHV: string,
      email: string,
      soDienThoai: string,
      hoTen: string,
      diaChi: string,
      thoiGianDangKy: Date,
      tinhTrang: boolean,
      tienNap: number
    ) {
      this.maHV = maHV;
      this.email = email;
      this.soDienThoai = soDienThoai;
      this.hoTen = hoTen;
      this.diaChi = diaChi;
      this.thoiGianDangKy = thoiGianDangKy;
      this.tinhTrang = tinhTrang;
      this.tienNap = tienNap;
    }
  }
  