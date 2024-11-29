package com.bookland.ServiceImpl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.bookland.dao.BanSaoSachDAO;
import com.bookland.dao.chiTietPhieuMuonDao;
import com.bookland.dao.hoiVienDAO;
import com.bookland.dao.nhanVienDAO;
import com.bookland.dao.phieuMuonDAO;
import com.bookland.dto.addPhieuMuondto;
import com.bookland.entity.BanSaoSach;
import com.bookland.entity.ChiTietPhieuMuon;
import com.bookland.entity.HoiVien;
import com.bookland.entity.NhanVien;
import com.bookland.entity.PhieuMuon;
import com.bookland.service.BanSaoSachService;
import com.bookland.service.SachService;
import com.bookland.service.hoiVienService;
import com.bookland.service.phieuMuonService;
@Service
public class phieuMuonServiceImpl implements phieuMuonService {

	@Autowired
	hoiVienDAO hvDao;
	@Autowired
	nhanVienDAO nvDao;
	@Autowired
	chiTietPhieuMuonDao ctmDao;
	@Autowired
	BanSaoSachDAO bssDao;
	
	@Autowired
	phieuMuonDAO pmDao;
	@Autowired
	 hoiVienService hv;
	@Autowired
	BanSaoSachService banSaoSachService;
	

    @Autowired
    private chiTietPhieuMuonDao chiTietPhieuMuonRepository;
	
	@Override
	public PhieuMuon create(addPhieuMuondto pmRequest) {
		PhieuMuon pm = new PhieuMuon();
		pm.setHanTraSach(pmRequest.getNgayTra());
		pm.setNgayLapPhieu(pmRequest.getNgayMuon());
		Optional<HoiVien> hoiVien = hv.findById(pmRequest.getMaHV());
		hoiVien.ifPresent(pm::setHoiVien);
		NhanVien nv =  nvDao.findByTaiKhoanId(pmRequest.getMaNV()); 
		pm.setNhanVien(nv);
		pmDao.save(pm);
		for(String bss: pmRequest.getTenSach()) {
			ChiTietPhieuMuon ctpm = new ChiTietPhieuMuon();
			BanSaoSach bsaoSach = bssDao.findBanSaoSachByMaBanSaoSach(Integer.parseInt(bss));
			ctpm.setBanSaoSach(bsaoSach);
			ctpm.setPhieuMuon(pm);
			ctmDao.save(ctpm);
			bsaoSach.setTrangThaiMuon("Đang mượn");
			banSaoSachService.update(bsaoSach);
		}
	
		return pm;
	}


	@Override
	public List<ChiTietPhieuMuon>  findChiTietPhieuMuonByHvID(String maHv) {
		List<Integer> phieuMuonIdList = pmDao.findIdPhieuMuonByHoiVienMaHV(maHv);
		  return chiTietPhieuMuonRepository.findAllByPhieuMuonIds(phieuMuonIdList);
	}


	@Override
	public List<PhieuMuon> findPhieuMuonByHvID(String maHV, String maVach) {
		BanSaoSach bss = bssDao.findByMaVach(maVach);
		List<PhieuMuon> listPm = pmDao.findByMaBanSaoSachAndMaHV(bss.getMaBanSaoSach(), maHV);
		return listPm;
	}


	@Override
	public List<PhieuMuon> findAll() {	
		return pmDao.findAll();
	}


	@Override
	public List<ChiTietPhieuMuon> findAllChiTiet() {
		// TODO Auto-generated method stub
		return ctmDao.findAll();
	}


	@Override
	public List<PhieuMuon> findAllDangMuon() {
		// TODO Auto-generated method stub
		return pmDao.findByAllPhieuMuon();
	}


	@Override
	public List<ChiTietPhieuMuon> findAllChiTietByIdPm(Integer maPM) {
		// TODO Auto-generated method stub
		return ctmDao.findAllByPhieuMuonId(maPM);
	}






}
