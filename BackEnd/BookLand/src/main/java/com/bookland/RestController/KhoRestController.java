package com.bookland.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookland.entity.Kho;
import com.bookland.service.KhoService;

@RestController
@RequestMapping("/rest/kho")
public class KhoRestController {
  @Autowired
  KhoService khoService;
	@GetMapping
	public ResponseEntity<List<Kho>> findAll() {
		List<Kho> khos = khoService.finAll();
		return ResponseEntity.ok(khos); // 200 OK
	}
	@PostMapping
	public ResponseEntity<Kho> post(@RequestBody Kho kho) {
		Kho createdKho =khoService.create(kho);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdKho); // 201 Created
	}
	@DeleteMapping("{makho}")
	public ResponseEntity<Void> delete(@PathVariable("makho") int makho) {
		khoService.delete(makho);
		return ResponseEntity.noContent().build(); // 204 No Content
	}

}
