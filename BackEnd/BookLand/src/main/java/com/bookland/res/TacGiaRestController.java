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
import com.bookland.service.TacGiaService;

@CrossOrigin("*")
@RestController
@RequestMapping("/rest/tacgia")
public class TacGiaRestController {
	@Autowired
	TacGiaService tacGiaService;

	@GetMapping
	public ResponseEntity<List<TacGia>> findAll() {
		List<TacGia> tacGias = tacGiaService.finAll();
		return ResponseEntity.ok(tacGias); // 200 OK
	}

	@PostMapping
	public ResponseEntity<TacGia> post(@RequestBody TacGia tacGia) {
		TacGia createdTacGia = tacGiaService.create(tacGia);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdTacGia); // 201 Created
	}

	@DeleteMapping("{matacgia}")
	public ResponseEntity<Void> delete(@PathVariable("matacgia") String matacgia) {
		tacGiaService.delete(matacgia);
		return ResponseEntity.noContent().build(); // 204 No Content
	}

	@GetMapping("{id}")
	public ResponseEntity<TacGia> findById(@PathVariable("id") String id) {
		TacGia tacGia = tacGiaService.finById(id);
		if (tacGia != null) {
			return ResponseEntity.ok(tacGia); // 200 OK
		} else {
			return ResponseEntity.notFound().build(); // 404 Not Found
		}
	}
}
