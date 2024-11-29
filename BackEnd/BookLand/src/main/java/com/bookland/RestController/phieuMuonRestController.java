package com.bookland.RestController;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookland.dto.addPhieuMuondto;
import com.bookland.entity.ChiTietPhieuMuon;
import com.bookland.entity.HoiVien;
import com.bookland.entity.PhieuMuon;
import com.bookland.entity.TacGia;
import com.bookland.service.phieuMuonService;

@RestController
@RequestMapping("/phieuMuon")
public class phieuMuonRestController {
	@Autowired
	phieuMuonService pmService;

	@PostMapping
	public ResponseEntity<PhieuMuon> post(@RequestBody addPhieuMuondto pmRequest) {
		PhieuMuon pm = pmService.create(pmRequest);
		return ResponseEntity.status(HttpStatus.CREATED).body(pm); // 201 Created
	}

	@GetMapping("/{maHV}")
	public ResponseEntity<List<ChiTietPhieuMuon>> getChiTiethBhieuMuonByHoiVienId(@PathVariable String maHV) {
		List<ChiTietPhieuMuon> ctpm = pmService.findChiTietPhieuMuonByHvID(maHV);
		return ResponseEntity.status(HttpStatus.CREATED).body(ctpm);
	}
	@GetMapping("/findPhieuMuon")
	public ResponseEntity<List<PhieuMuon>> getPhieuMuonByHoiVienId(@RequestParam String maHV,@RequestParam String maVach) {
		List<PhieuMuon> pm = pmService.findPhieuMuonByHvID(maHV,maVach);
		return ResponseEntity.status(HttpStatus.CREATED).body(pm);
		
	}
	@GetMapping
	public ResponseEntity<List<PhieuMuon>>findAll() {
		List<PhieuMuon> pm = pmService.findAll();
		return ResponseEntity.status(HttpStatus.CREATED).body(pm);
		
	}
	@GetMapping("/findAllPhieuMuonDangMuon")
	public ResponseEntity<List<PhieuMuon>>findAllDangMuon() {
		List<PhieuMuon> pm = pmService.findAllDangMuon();
		return ResponseEntity.status(HttpStatus.CREATED).body(pm);
		
	}
	@GetMapping("/getAllChiTietPhieuMuon")
	public ResponseEntity<List<ChiTietPhieuMuon>>findAllChiTietPhieuMuon() {
		List<ChiTietPhieuMuon> pm = pmService.findAllChiTiet();
		return ResponseEntity.status(HttpStatus.CREATED).body(pm);
		
	}
	@GetMapping("/findChiTietPhieuMuonByPmId")
	public ResponseEntity<List<ChiTietPhieuMuon>>findAllChiTietPhieuMuonByIdPm(@RequestParam("maPM") Integer maPM) {
		List<ChiTietPhieuMuon> pm = pmService.findAllChiTietByIdPm(maPM);
		return ResponseEntity.status(HttpStatus.CREATED).body(pm);
		
	}
	

}
