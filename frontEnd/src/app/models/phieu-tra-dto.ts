export class PhieuTraDTO {
    maVach: string;
  status: string;
  maNV: string;

  constructor(maVach: string, status: string, maNV: string) {
    this.maVach = maVach;
    this.status = status;
    this.maNV = maNV;
  }
}
