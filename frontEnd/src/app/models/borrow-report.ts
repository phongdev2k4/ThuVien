export interface BorrowReport {
    borrowDate: string; // Use `string` for dates to simplify JSON parsing
    totalPhieuMuon: number;
    totalBooksBorrowed: number;
}
