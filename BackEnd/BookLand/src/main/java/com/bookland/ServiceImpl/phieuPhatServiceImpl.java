package com.bookland.ServiceImpl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookland.dao.hoiVienDAO;
import com.bookland.dao.nhanVienDAO;
import com.bookland.dao.phieuPhatDAO;
import com.bookland.dao.phieuTraDAO;
import com.bookland.dto.phieuPhatDTO;
import com.bookland.entity.HoiVien;
import com.bookland.entity.NhanVien;
import com.bookland.entity.PhieuPhat;
import com.bookland.entity.PhieuTra;
import com.bookland.service.phieuPhatService;

import jakarta.persistence.EntityNotFoundException;
@Service
public class phieuPhatServiceImpl implements phieuPhatService {
	
	@Autowired
	hoiVienDAO hvDao;
	@Autowired
	nhanVienDAO nvDao;
	@Autowired
	phieuPhatDAO ppDao;
	
	@Autowired
	phieuTraDAO ptDao;
	@Override
	public PhieuPhat create(phieuPhatDTO ppRequest) {
		  Optional<HoiVien> hoiVienOptional = hvDao.findById(ppRequest.getMaHV());
		  PhieuTra pt = ptDao.findById(Integer.parseInt(ppRequest.getMaPT()))
                  .orElseThrow(() -> new EntityNotFoundException("PhieuTra not found for ID: " + ppRequest.getMaPT()));
		  NhanVien nv = nvDao.findByTaiKhoanId(ppRequest.getMaNV());
		    // Check if the HoiVien exists
		    if (hoiVienOptional.isPresent()) {
		        HoiVien hoiVien = hoiVienOptional.get();
		        
		        // Create the PhieuPhat object and set values (you can set others as well)
		        PhieuPhat pp = new PhieuPhat();
		        pp.setHoiVien(hoiVien);
		        pp.setNhanVien(nv);
		        pp.setSoNgayQuaHan(ppRequest.getSoNgayQuaHan());
		        pp.setPhieuTra(pt);
		        ppDao.save(pp);
		        
		        // Set other properties on pp from ppRequest
		        
		        return pp;
		    } else {
		        throw new EntityNotFoundException("HoiVien not found for ID: " + ppRequest.getMaHV());
		    }
	}

}
