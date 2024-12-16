export class XuLiMuonOnlineDTO {
    maHV: string;
    idMuonOnline: number;
    tenSach: string[];
    ngayMuon: Date;
    ngayTra: Date;
    maNV: string;
  
    // Constructor to initialize the class properties
    constructor(
      maHV: string,
      idMuonOnline: number,
      tenSach: string[],
      ngayMuon: Date,
      ngayTra: Date,
      maNV: string
    ) {
      this.maHV = maHV;
      this.idMuonOnline = idMuonOnline;
      this.tenSach = tenSach;
      this.ngayMuon = ngayMuon;
      this.ngayTra = ngayTra;
      this.maNV = maNV;
    }
}
