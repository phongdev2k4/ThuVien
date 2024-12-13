package com.bookland.ServiceImpl;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookland.dao.BanSaoSachDAO;
import com.bookland.dao.chiTietPhieuMuonDao;
import com.bookland.dao.chiTietPhieuTraDAO;
import com.bookland.dao.nhanVienDAO;
import com.bookland.dao.phieuTraDAO;
import com.bookland.dto.phieuTraResponse;
import com.bookland.entity.BanSaoSach;
import com.bookland.entity.ChiTietPhieuMuon;
import com.bookland.entity.ChiTietPhieuTra;
import com.bookland.entity.NhanVien;
import com.bookland.entity.PhieuMuon;
import com.bookland.entity.PhieuTra;
import com.bookland.service.PhieuTraService;

import jakarta.persistence.EntityNotFoundException;

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
	public PhieuTra create(phieuTraResponse[] res) {
		System.out.print(res);
		NhanVien nv = nvDAO.findById(res[0].getMaNV())
				.orElseThrow(() -> new EntityNotFoundException("PhieuTra not found for ID: " + res[0].getMaNV()));
		PhieuTra pt = new PhieuTra();
		pt.setNhanVien(nv);
		pt.setNgayLapPhieuTra(new Date());
	    pt.setIsFine("KHONG_VI_PHAM");
	    boolean isFine = false;
		// Process each maVach in the array
		for (phieuTraResponse ptDTO : res) {
			// Retrieve BanSaoSach for each maVach
			BanSaoSach bss = bssDao.findByMaVach(ptDTO.getMaVach());
			if (bss != null) {
				// Get ChiTietPhieuMuon list for the current BanSaoSach
				List<ChiTietPhieuMuon> ctpm = ctpmDAO.findByBanSaoSachId(bss.getMaBanSaoSach());
				// Retrieve PhieuMuon from the first ChiTietPhieuMuon
				PhieuMuon phieuMuon = ctpm.get(0).getPhieuMuon();
				// Set HoiVien and PhieuMuon for PhieuTra (using same PhieuTra for all maVach)
				pt.setHoiVien(phieuMuon.getHoiVien());
				Date hanTraSach = phieuMuon.getHanTraSach(); // Due date for returning the book
				Date getDate = new Date(); // Get the current date as the actual return date
				System.out.print(getDate.compareTo(hanTraSach));
				// Check if the book is overdue
				if (!ptDTO.getStatus().equalsIgnoreCase("Mới")|| getDate.compareTo(hanTraSach) > 0) {
					if( getDate.compareTo(hanTraSach) == 0) {
						isFine = false;
					}
					else {
						isFine = true;
					}
					 // If overdue or book condition is not "Mới", set fine
				} 
				  if (isFine) {
				        pt.setIsFine("CHUA_PHAT");  // Set fine status if any book violates
				    }
				pt.setPhieuMuon(phieuMuon); // Using the same PhieuMuon for all maVach
				ptDAO.save(pt);

				// Update BanSaoSach status to "Có sẵn" and save it
				bss.setTrangThaiMuon("Có sẵn");
				bss.setTrangThaiBaoQuan(ptDTO.getStatus());
				bssDao.save(bss);

				// Create a new ChiTietPhieuTra and save it for each BanSaoSach
				ChiTietPhieuTra ctpt = new ChiTietPhieuTra();
				ctpt.setBanSaoSach(bss);
				
				ctpt.setPhieuTra(pt); // Link the same PhieuTra to all ChiTietPhieuTra
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

	@Override
	public List<PhieuTra> findAll() {
		// TODO Auto-generated method stub
		return ptDAO.findAll();
	}

	@Override
	public List<ChiTietPhieuTra> findAllByIdPT(Integer maPT) {
		// TODO Auto-generated method stub
		return ctptDAO.findAllByPhieuTraId(maPT);
	}

}
