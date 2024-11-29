package com.bookland.ServiceImpl;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookland.dao.chiTietPhieuPhatDao;
import com.bookland.dao.chiTietPhieuTraDAO;
import com.bookland.dao.hoiVienDAO;
import com.bookland.dao.nhanVienDAO;
import com.bookland.dao.phieuPhatDAO;
import com.bookland.dao.phieuTraDAO;
import com.bookland.dto.phieuPhatDTO;
import com.bookland.entity.*;
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
	
	@Autowired
	chiTietPhieuTraDAO ctptDao;
	
	@Autowired
	chiTietPhieuPhatDao ctppDao;
	
	@Override
	public PhieuPhat create(phieuPhatDTO ppRequest) {
		  Optional<HoiVien> hoiVienOptional = hvDao.findById(ppRequest.getMaHV());
		  PhieuTra pt = ptDao.findById(Integer.parseInt(ppRequest.getMaPT()))
                  .orElseThrow(() -> new EntityNotFoundException("PhieuTra not found for ID: " + ppRequest.getMaPT()));
		  NhanVien nv =	nvDao.findById((ppRequest.getMaNV()))
                  .orElseThrow(() -> new EntityNotFoundException("PhieuTra not found for ID: " + ppRequest.getMaNV()));
		    // Check if the HoiVien exists
		    if (hoiVienOptional.isPresent()) {
		        HoiVien hoiVien = hoiVienOptional.get();
		        
		        // Create the PhieuPhat object and set values (you can set others as well)
		        PhieuPhat pp = new PhieuPhat();
		        pp.setHoiVien(hoiVien);
		        pp.setNhanVien(nv);
		        pp.setSoNgayQuaHan(ppRequest.getSoNgayQuaHan());
		        pp.setPhieuTra(pt);
		        pp.setTienPhat(ppRequest.getTienPhat());
		        pp.setNgayLapPhieu(new Date());
		        pp.setViPhamPhieuTra(ppRequest.getMoTa());
		        ppDao.save(pp);
		      
		        
		        List<ChiTietPhieuTra> ctpt = ctptDao.findAllByPhieuTraId(pt.getMaPT());
		        for(ChiTietPhieuTra ct : ctpt  ) {
		        	if(!ct.getBanSaoSach().getTrangThaiBaoQuan().equalsIgnoreCase("Mới")) {
		        		ChiTietPhieuPhat ctpp = new ChiTietPhieuPhat();
			        	ctpp.setBanSaoSach(ct.getBanSaoSach());
			        	ctpp.setLyDo(ct.getBanSaoSach().getTrangThaiBaoQuan());
			        	ctpp.setPhieuPhat(pp);
			        	if(ct.getBanSaoSach().getTrangThaiBaoQuan().equalsIgnoreCase("Mất")) {
			        		ctpp.setSoTienPhat(ct.getBanSaoSach().getSach().getTienSach());
			        	}
			        	else {
			        		ctpp.setSoTienPhat(5000);
			        	}
			        	ctppDao.save(ctpp);
		        	}
		        }
		     

		        
		        pt.setIsFine("DA_PHAT");
		        ptDao.save(pt);
		        // Set other properties on pp from ppRequest
		        
		        return pp;
		    } else {
		        throw new EntityNotFoundException("HoiVien not found for ID: " + ppRequest.getMaHV());
		    }
	}
	@Override
	  public List<PhieuTra> findAllPhieuTraViPham() {
        // Get all PhieuTra objects with their associated PhieuMuon
		 List<Integer> maPTList = ptDao.findDistinctMaPTWithUnpaidFine();
        List<PhieuTra> phieuTraList = new ArrayList<>();
        for (Integer maPT : maPTList) {
            PhieuTra phieuTra = ptDao.findById(maPT)
                    .orElseThrow(() -> new EntityNotFoundException("PhieuTra not found for ID: " + maPT));
            
            // Add PhieuTra to the list
            phieuTraList.add(phieuTra);
        }
        return phieuTraList;
    }
	@Override
	public List<PhieuPhat> findAll() {
		// TODO Auto-generated method stub
		return  ppDao.findAll();
	}
	@Override
	public List<ChiTietPhieuPhat> findAllChiTietSachPhat(Integer maPP) {
		// TODO Auto-generated method stub
		return ctppDao.findAllByPhieuPhatId(maPP);
	}

}
