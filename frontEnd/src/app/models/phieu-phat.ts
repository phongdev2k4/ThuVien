export class PhieuPhat { // Unique identifier for the penalty slip
    maHV: string;         // Member ID (Mã Hội Viên)
    maPT: string;         // Return slip ID (Mã Phiếu Trả)
    soNgayQuaHan: number; // Number of overdue days
    tienPhat: number;     // Fine amount
    maNV: string;         // Staff ID (Mã Nhân Viên)
  
    constructor(
      maPhieuPhat: number = 0,
      maHV: string = '',
      maPT: string = '',
      soNgayQuaHan: number = 0,
      tienPhat: number = 0.0,
      maNV: string = ''
    ) {
      this.maHV = maHV;
      this.maPT = maPT;
      this.soNgayQuaHan = soNgayQuaHan;
      this.tienPhat = tienPhat;
      this.maNV = maNV;
    }
  }
  