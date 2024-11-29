package com.bookland.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookland.dto.addPhieuMuondto;
import com.bookland.dto.phieuPhatDTO;
import com.bookland.entity.ChiTietPhieuPhat;
import com.bookland.entity.ChiTietPhieuTra;
import com.bookland.entity.PhieuMuon;
import com.bookland.entity.PhieuPhat;
import com.bookland.entity.PhieuTra;
import com.bookland.service.phieuMuonService;
import com.bookland.service.phieuPhatService;

@RestController
@RequestMapping("/phieuPhat")
public class phieuPhatRestController {
	@Autowired
	phieuPhatService ppService;
	@PostMapping
	public ResponseEntity<PhieuPhat> post(@RequestBody phieuPhatDTO ppRequest) {
		PhieuPhat pp  = ppService.create(ppRequest);
		return ResponseEntity.status(HttpStatus.CREATED).body(pp); // 201 Created
	}
	@GetMapping("/PhieuTraViPham")
	public ResponseEntity<List<PhieuTra>>findAllPhieuTraViPham() {
		List<PhieuTra> pt =  ppService.findAllPhieuTraViPham();
		return ResponseEntity.status(HttpStatus.CREATED).body(pt);
		
	}

	@GetMapping
	public ResponseEntity<List<PhieuPhat>>findAll() {
		List<PhieuPhat> pm = ppService.findAll();
		return ResponseEntity.status(HttpStatus.CREATED).body(pm);
		
	}
	
	@GetMapping("/findAllChiTietPhieuPhatSachByPhieuPhat")
	public ResponseEntity<List<ChiTietPhieuPhat>>findAllChiTietSachPhatByPhieuPhat(@RequestParam Integer maPP) {
		List<ChiTietPhieuPhat> ctpp =  ppService.findAllChiTietSachPhat(maPP);
		return ResponseEntity.status(HttpStatus.CREATED).body(ctpp);
		
	}

}
