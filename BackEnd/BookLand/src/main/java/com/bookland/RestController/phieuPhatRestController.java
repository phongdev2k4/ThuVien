package com.bookland.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookland.dto.addPhieuMuondto;
import com.bookland.dto.phieuPhatDTO;
import com.bookland.entity.PhieuMuon;
import com.bookland.entity.PhieuPhat;
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


}
