package com.bookland.RestController;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bookland.dto.SachDTO;
import com.bookland.entity.NhanVien;
import com.bookland.entity.Sach;
import com.bookland.entity.TacGia;
import com.bookland.service.NhanVienService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/rest/nhavien")
public class NhanVienRestController {
	@Autowired
	NhanVienService nhanVienService;
	@GetMapping
	public ResponseEntity<List<NhanVien>> findAll() {
		List<NhanVien> nhanViens = nhanVienService.finAll();
		return ResponseEntity.ok(nhanViens); // 200 OK
	}
	@PostMapping()
	public ResponseEntity<NhanVien> addNhanVien(@RequestParam("nhanvien") String nhanvienJson,
			@RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
		NhanVien nhanVien = new ObjectMapper().readValue( nhanvienJson, NhanVien.class);
		
		NhanVien createdNhanVien = nhanVienService.create(nhanVien, file);
		return ResponseEntity.ok(createdNhanVien);
	}
	
	@PutMapping()
	public ResponseEntity<NhanVien> updateNhanVien(@RequestParam("nhanvien") String nhanvienJson,
			@RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
		NhanVien nhanVien = new ObjectMapper().readValue( nhanvienJson, NhanVien.class);
		
		NhanVien createdNhanVien = nhanVienService.update(nhanVien, file);
		return ResponseEntity.ok(createdNhanVien);
	}
    
	@DeleteMapping("{maNhanVien}")
	public ResponseEntity<Void> delete(@PathVariable("maNhanVien") String maNhanVien) {
		nhanVienService.delete(maNhanVien);
		return ResponseEntity.noContent().build(); // 204 No Content
	}
}
