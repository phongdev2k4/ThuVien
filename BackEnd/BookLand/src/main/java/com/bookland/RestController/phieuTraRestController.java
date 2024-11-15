package com.bookland.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookland.entity.BanSaoSach;
import com.bookland.entity.PhieuTra;
import com.bookland.service.PhieuTraService;


@RestController
@RequestMapping("/phieuTra")
public class phieuTraRestController {
	
	@Autowired
	PhieuTraService phieuTraService;
	
	@PostMapping("/create")
	public ResponseEntity<PhieuTra> post(@RequestParam String maNV,@RequestParam String []maVach) {
		PhieuTra PT  = phieuTraService.create( maNV,maVach);
		return ResponseEntity.status(HttpStatus.CREATED).body(PT); // 201 Created
	}

}
