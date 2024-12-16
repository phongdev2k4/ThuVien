export class BorrowRequestDto {
    maHV: string; // Member ID // Borrow date in ISO format (e.g., yyyy-MM-dd)
    ngayHenLay: string; // Expected pick-up date in ISO format (e.g., yyyy-MM-dd)
    idBanSaoSach: number[]; 
    tongTienSach: number; // List of book copy IDs
  
    constructor(maHV: string, ngayMuon: string, ngayHenLay: string, idBanSaoSach: number[], tongTienSach: number) {
      this.maHV = maHV;
      this.ngayHenLay = ngayHenLay;
      this.idBanSaoSach = idBanSaoSach;
      this.tongTienSach =tongTienSach;
    }
}
