package com.bookland.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.bookland.config.VNPayConfig;
import com.bookland.dao.ThanhToanDAO;
import com.bookland.dao.hoiVienDAO;
import com.bookland.entity.HoiVien;
import com.bookland.entity.ThanhToan;
import com.bookland.service.ThanhToanService;

import jakarta.transaction.Transactional;

@Service
public class ThanhToanServiceImpl implements ThanhToanService{
    @Autowired
    ThanhToanDAO thanhToanDAO;
    @Autowired 
    hoiVienDAO hoiVienDAO;
	@Override
	public Page<ThanhToan> TimLichSuThanhToanHV(String maHV, int page, int size) {
		Pageable pageable = PageRequest.of(page, size);
		 return thanhToanDAO.findByHoiVien_MaHVOrderByThoiGianThanhToanDesc(maHV, pageable);
	}
	@Override
	@Transactional
	public ThanhToan create(ThanhToan thanhToan) {
		String txnRef = VNPayConfig.getRandomNumber(8);
		// Kiểm tra tính duy nhất của mã giao dịch
		while (!isMaGiaoDichUnique(txnRef)) {
			txnRef = VNPayConfig.getRandomNumber(8); // Sinh lại mã nếu trùng
		}
		thanhToan.setMaGiaoDich(txnRef);
		HoiVien hoivien=hoiVienDAO.findById(thanhToan.getHoiVien().getMaHV()).get();
		thanhToan.setTrangThaiGiaoDich("Thành công");
		ThanhToan response =thanhToanDAO.save(thanhToan);
		if(thanhToan.getLoaiThanhToan().equals("Nạp Tiền")) {  
		  hoivien.setTienNap(hoivien.getTienNap()+ thanhToan.getSoTien());;
		  return response;
		}else if(thanhToan.getLoaiThanhToan().equals("Rút Tiền")) {
			  hoivien.setTienNap(hoivien.getTienNap()- thanhToan.getSoTien());
			  return response;
			  
		}
		return response;
	}
	// Phương thức kiểm tra tính duy nhất của mã giao dịch
	public boolean isMaGiaoDichUnique(String maGiaoDich) {
		// Kiểm tra xem mã giao dịch có tồn tại trong cơ sở dữ liệu không
		return !thanhToanDAO.findByMaGiaoDich(maGiaoDich).isPresent();
	}
}
