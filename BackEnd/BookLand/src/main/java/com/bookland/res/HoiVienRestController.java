package com.bookland.res;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookland.entity.HoiVien;

import com.bookland.service.HoiVienService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/hoivien")
public class HoiVienRestController {
	@Autowired
	HoiVienService hoiVienService;
	
	@GetMapping
	public ResponseEntity<List<HoiVien>> findAll() {
		List<HoiVien> hoiVien = hoiVienService.finAll();
		return ResponseEntity.ok(hoiVien); 
	}
	
	@PostMapping
	public ResponseEntity<HoiVien> post(@RequestBody HoiVien hoiVien) {
		HoiVien createdHoiVien = hoiVienService.create(hoiVien);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdHoiVien); // 201 Created
	}

	@DeleteMapping("{maHV}")
	public ResponseEntity<Void> delete(@PathVariable("maHV") String maHV) {
		hoiVienService.delete(maHV);
		return ResponseEntity.noContent().build(); // 204 No Content
	}

	@GetMapping("{id}")
	public ResponseEntity<HoiVien> findById(@PathVariable("id") String id) {
		HoiVien hoiVien = hoiVienService.finById(id);
		if (hoiVien != null) {
			return ResponseEntity.ok(hoiVien); // 200 OK
		} else {
			return ResponseEntity.notFound().build(); // 404 Not Found
		}
	}
	
}
