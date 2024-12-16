package com.bookland.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.bookland.dto.addPhieuMuondto;
import com.bookland.dto.muonOnlineDTO;
import com.bookland.dto.xuLiMuonOnlineDTO;
import com.bookland.entity.BorrowOnlineDetail;
import com.bookland.entity.ChiTietPhieuMuon;
import com.bookland.entity.MuonOnline;
import com.bookland.entity.PhieuMuon;

@Service
public interface phieuMuonService {

	PhieuMuon create(addPhieuMuondto pmRequest);

	List<ChiTietPhieuMuon>  findChiTietPhieuMuonByHvID(String maHv,Integer id);

	List<PhieuMuon> findPhieuMuonByHvID(String maHV,String maVach);

	List<PhieuMuon> findAll();

	List<ChiTietPhieuMuon> findAllChiTiet();

	List<PhieuMuon> findAllDangMuon();

	List<ChiTietPhieuMuon> findAllChiTietByIdPm(Integer maPM);
	
	
	MuonOnline createMuonOnline(muonOnlineDTO dto);
	List<MuonOnline> findAllMuonOnline();
	List<MuonOnline> findAllDaMuonOnline();
	Optional<MuonOnline> getMuonOnlineById(Long id);
	PhieuMuon createPhieuMuonOnline(xuLiMuonOnlineDTO pmRequest);
	List<BorrowOnlineDetail> getDetailsByMuonOnlineId(Long muonOnlineId);

	List<ChiTietPhieuMuon> findChiTietPhieuMuonByHvID2(String maHV);

	List<MuonOnline> findAllViPhamDaMuonOnline();

	boolean canUserBorrowToday(String maHV);

	List<MuonOnline> findBorrowedTodayByUser(String maHV);

	long findBorrowedTodayByHV(String maHV);

}
