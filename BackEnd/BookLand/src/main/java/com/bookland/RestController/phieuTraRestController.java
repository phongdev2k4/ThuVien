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

import com.bookland.dto.phieuTraResponse;
import com.bookland.entity.BanSaoSach;
import com.bookland.entity.ChiTietPhieuTra;
import com.bookland.entity.PhieuMuon;
import com.bookland.entity.PhieuTra;
import com.bookland.service.PhieuTraService;


@RestController
@RequestMapping("/phieuTra")
public class phieuTraRestController {
	
	@Autowired
	PhieuTraService phieuTraService;
	
	@PostMapping("/create")
	public ResponseEntity<PhieuTra> post(@RequestBody phieuTraResponse []res) {
		PhieuTra PT  = phieuTraService.create(res);
		return ResponseEntity.status(HttpStatus.CREATED).body(PT); // 201 Created
	}
	
	@GetMapping
	public ResponseEntity<List<PhieuTra>>findAll() {
		List<PhieuTra> pt =  phieuTraService.findAll();
		return ResponseEntity.status(HttpStatus.CREATED).body(pt);
		
	}
	@GetMapping("/findChiTietPhieuTraByPtId")
	public ResponseEntity<List<ChiTietPhieuTra>>findAllChiTietPhieuTraById(@RequestParam("maPT") Integer maPT) {
		List<ChiTietPhieuTra> pt =  phieuTraService.findAllByIdPT(maPT);
		return ResponseEntity.status(HttpStatus.CREATED).body(pt);
		
	}

}
