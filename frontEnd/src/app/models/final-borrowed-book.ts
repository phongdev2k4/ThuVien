export class FinalBorrowedBook {
    maHV: string;
    searchTerm: string;
    tenSach: string[];
    ngayMuon: Date;
    ngayTra: Date;
     maNV: string;
  
    constructor(maHV: string, searchTerm: string, tenSach: string[], ngayMuon: Date, ngayTra: Date,maNV: string) {
      this.maHV = maHV;
      this.searchTerm = searchTerm;
      this.tenSach = tenSach;
      this.ngayMuon = ngayMuon;
      this.ngayTra = ngayTra;
      this.maNV = maNV;
    }
}
