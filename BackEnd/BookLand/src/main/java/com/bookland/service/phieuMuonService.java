package com.bookland.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bookland.dto.addPhieuMuondto;
import com.bookland.entity.ChiTietPhieuMuon;
import com.bookland.entity.PhieuMuon;

@Service
public interface phieuMuonService {

	PhieuMuon create(addPhieuMuondto pmRequest);

	List<ChiTietPhieuMuon>  findChiTietPhieuMuonByHvID(String maHv);

	List<PhieuMuon> findPhieuMuonByHvID(String maHV,String maVach);

	List<PhieuMuon> findAll();

	List<ChiTietPhieuMuon> findAllChiTiet();

	List<PhieuMuon> findAllDangMuon();

	List<ChiTietPhieuMuon> findAllChiTietByIdPm(Integer maPM);

}
