package com.bookland.ServiceImpl;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.bookland.dao.BanSaoSachDAO;
import com.bookland.dao.chiTietMuonOnlineDao;
import com.bookland.dao.chiTietPhieuMuonDao;
import com.bookland.dao.hoiVienDAO;
import com.bookland.dao.muonOnlineDao;
import com.bookland.dao.nhanVienDAO;
import com.bookland.dao.phieuMuonDAO;
import com.bookland.dto.addPhieuMuondto;
import com.bookland.dto.muonOnlineDTO;
import com.bookland.dto.xuLiMuonOnlineDTO;
import com.bookland.entity.BanSaoSach;
import com.bookland.entity.BorrowOnlineDetail;
import com.bookland.entity.ChiTietPhieuMuon;
import com.bookland.entity.HoiVien;
import com.bookland.entity.MuonOnline;
import com.bookland.entity.NhanVien;
import com.bookland.entity.PhieuMuon;
import com.bookland.entity.ThanhToan;
import com.bookland.service.BanSaoSachService;
import com.bookland.service.SachService;
import com.bookland.service.hoiVienService;
import com.bookland.service.phieuMuonService;

import jakarta.transaction.Transactional;
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
	muonOnlineDao molDao;
	
	@Autowired
	chiTietMuonOnlineDao dmolDao;

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
	public List<ChiTietPhieuMuon>  findChiTietPhieuMuonByHvID(String maHv,Integer id) {
		List<Integer> phieuMuonIdList = pmDao.findIdPhieuMuonByHoiVienMaHV(maHv,id);
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



	@Override
	public MuonOnline createMuonOnline(muonOnlineDTO dto) {
		MuonOnline mol = new MuonOnline();
		Optional<HoiVien> hoiVien = hv.findById(dto.getMaHV());
		hoiVien.ifPresent(mol::setHoiVien);
		HoiVien hv2 = hoiVien.orElse(new HoiVien());
		hv2.setTienNap(hv2.getTienNap() - dto.getTongTienSach());// If not present, create a new HoiVien
		hvDao.save(hv2);
		mol.setNgayHenLay(dto.getNgayHenLay());
		mol.setTinhTrang(false);
		mol.setNgayMuon(new Date());
		mol.setTienDatCoc(dto.getTongTienSach());
		mol.setPickedUp(true);
		molDao.save(mol);
		for(Integer bss: dto.getIdBanSaoSach()) {
			BorrowOnlineDetail bod = new BorrowOnlineDetail();
			BanSaoSach bsaoSach = bssDao.findBanSaoSachByMaBanSaoSach(bss);
			bod.setBanSaoSach(bsaoSach);
			bod.setBorrowOnline(mol);
			dmolDao.save(bod);
			bsaoSach.setTrangThaiMuon("Đang mượn");
			banSaoSachService.update(bsaoSach);
			
		}
		return mol;
	}
	@Override
	public List<MuonOnline> findAllMuonOnline() {
		// TODO Auto-generated method stub
		return molDao.findByTinhTrangFalseAndIsPickedUpTrue();
	}
	@Override
	public List<MuonOnline> findAllDaMuonOnline() {
		// TODO Auto-generated method stub
		return molDao.findByTinhTrangTrue();
	}
	@Override
	public Optional<MuonOnline> getMuonOnlineById(Long id) {
		// TODO Auto-generated method stub
		return molDao.findById(id);
	}
	@Override
	public PhieuMuon createPhieuMuonOnline(xuLiMuonOnlineDTO pmRequest) {
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
		MuonOnline mol = molDao.findById(pmRequest.getIdMuonOnline()).orElse(null);;
		mol.setTinhTrang(true);
		mol.setPickedUp(true);
		 molDao.save(mol);
		return pm;
		
		
	}
	@Override
	public List<BorrowOnlineDetail> getDetailsByMuonOnlineId(Long muonOnlineId) {
// TODO Auto-generated method stub
		return  dmolDao.findByMuonOnlineId(muonOnlineId);
	}


	@Override
	public List<ChiTietPhieuMuon> findChiTietPhieuMuonByHvID2(String maHV) {
		List<Integer> phieuMuonIdList = pmDao.findIdPhieuMuonByHoiVienMaHV2(maHV);
		  return chiTietPhieuMuonRepository.findAllByPhieuMuonIds(phieuMuonIdList);
	}
	@Scheduled(fixedDelay = 60000) // Lặp lại mỗi 15 phút
	@Transactional
	public void checkPendingBorrowOnline() {
		List<MuonOnline>  molList  = molDao.findByTinhTrangFalseAndIsPickedUpTrue();
		 Date currentDate = new Date(); 
		 for (MuonOnline mol : molList) {
	            if (mol.getNgayHenLay().after(currentDate)) {
	                mol.setPickedUp(false); // Update status
	                molDao.save(mol); // Save to database
	                List<BorrowOnlineDetail> getDetails =  dmolDao.findByMuonOnlineId(mol.getId());
	                for(BorrowOnlineDetail bss : getDetails) {
	                	BanSaoSach bss2 = bssDao.findBanSaoSachByMaBanSaoSach(bss.getBanSaoSach().getMaBanSaoSach());
	                	bss2.setTrangThaiMuon("Có sẵn");
	                	bssDao.save(bss2);
	                }
	            }
	        }
		System.out.print("hahaha");
		
	}


	@Override
	public List<MuonOnline> findAllViPhamDaMuonOnline() {
		// TODO Auto-generated method stub
		return  molDao.findByTinhTrangFalseAndIsPickedUpFalse();
	}


	@Override
	public boolean canUserBorrowToday(String maHV) {
		// TODO Auto-generated method stub
	     List<MuonOnline> borrowedToday =molDao.findBorrowedTodayByUser(maHV);
	        
	        int totalBooksBorrowed = 0;

	        // Count the total number of books borrowed in the details
	        for (MuonOnline muonOnline : borrowedToday) {
	            totalBooksBorrowed += muonOnline.getDetails().size();
	        }

	        // Business rule: Limit is 2 books per day
	        return totalBooksBorrowed < 2;
	}


	@Override
	public List<MuonOnline> findBorrowedTodayByUser(String maHV) {
		// TODO Auto-generated method stub
	    return molDao.findBorrowedTodayByUser(maHV);
	}


	@Override
	public long findBorrowedTodayByHV(String maHV) {
		// TODO Auto-generated method stub
		 return molDao.countBorrowedTodayByUser(maHV);
	}


}
