package com.bookland.ServiceImpl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookland.dao.BanSaoSachDAO;
import com.bookland.dao.chiTietPhieuMuonDao;
import com.bookland.dao.chiTietPhieuTraDAO;
import com.bookland.dao.nhanVienDAO;
import com.bookland.dao.phieuTraDAO;
import com.bookland.entity.BanSaoSach;
import com.bookland.entity.ChiTietPhieuMuon;
import com.bookland.entity.ChiTietPhieuTra;
import com.bookland.entity.NhanVien;
import com.bookland.entity.PhieuMuon;
import com.bookland.entity.PhieuTra;
import com.bookland.service.PhieuTraService;

@Service
public class phieuTraServiceImpl implements PhieuTraService {
	@Autowired
	BanSaoSachDAO bssDao;
	
	@Autowired
	chiTietPhieuMuonDao ctpmDAO;

	@Autowired
	phieuTraDAO ptDAO;
	
	@Autowired
	nhanVienDAO nvDAO;
	@Autowired
	chiTietPhieuTraDAO ctptDAO;

	@Override
	public PhieuTra create(String maNV, String[] maVachArray) {
	    // Initialize PhieuTra object and NhanVien
	    NhanVien nv = nvDAO.findByTaiKhoanId(maNV);
	    PhieuTra pt = new PhieuTra();
	    pt.setNhanVien(nv);
	    pt.setNgayLapPhieuTra(new Date());
	    // Process each maVach in the array
	    for (String maVach : maVachArray) {
	        // Retrieve BanSaoSach for each maVach
	        BanSaoSach bss = bssDao.findByMaVach(maVach);
	        
	        if (bss != null) {
	            // Get ChiTietPhieuMuon list for the current BanSaoSach
	            List<ChiTietPhieuMuon> ctpm = ctpmDAO.findByBanSaoSachId(bss.getMaBanSaoSach());
	                // Retrieve PhieuMuon from the first ChiTietPhieuMuon
	                PhieuMuon phieuMuon = ctpm.get(0).getPhieuMuon();
	                // Set HoiVien and PhieuMuon for PhieuTra (using same PhieuTra for all maVach)
	                pt.setHoiVien(phieuMuon.getHoiVien());
	                pt.setPhieuMuon(phieuMuon); // Using the same PhieuMuon for all maVach
	        	    ptDAO.save(pt);

	            // Update BanSaoSach status to "Có sẵn" and save it
	            bss.setTrangThaiMuon("Có sẵn");
	            bssDao.save(bss);

	            // Create a new ChiTietPhieuTra and save it for each BanSaoSach
	            ChiTietPhieuTra ctpt = new ChiTietPhieuTra();
	            ctpt.setBanSaoSach(bss);
	            ctpt.setPhieuTra(pt);  // Link the same PhieuTra to all ChiTietPhieuTra
	            ctptDAO.save(ctpt);
	            System.out.println(ctpt.getPhieuTra().getMaPT());

	            // Mark the corresponding ChiTietPhieuMuon entries as returned
	            for (ChiTietPhieuMuon ctpm2 : ctpm) {
	                ctpm2.setReturned(true);
	                ctpmDAO.save(ctpm2);
	            }
	        }
	    }

	    // Save the PhieuTra once after processing all maVach values

	    return pt;
	}


}
