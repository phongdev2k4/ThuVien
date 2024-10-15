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

import com.bookland.entity.TacGia;
import com.bookland.entity.TheLoai;
import com.bookland.service.TheLoaiService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/theloai")
public class TheLoaiRestController {
	@Autowired
	TheLoaiService theLoaiService;
	@GetMapping
	public ResponseEntity<List<TheLoai>> findAll() {
		List<TheLoai> theloais = theLoaiService.finAll();
		return ResponseEntity.ok(theloais); // 200 OK
	}
	
	@PostMapping
	public ResponseEntity<TheLoai> post(@RequestBody TheLoai theLoai) {
		TheLoai createdTheLoai =theLoaiService.create(theLoai);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdTheLoai); // 201 Created
	}
	@DeleteMapping("{matheloai}")
	public ResponseEntity<Void> delete(@PathVariable("matheloai") String matheloai) {
		theLoaiService.delete(matheloai);
		return ResponseEntity.noContent().build(); // 204 No Content
	}

}
