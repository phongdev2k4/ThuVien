package com.bookland.RestController;

import java.io.*;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bookland.service.SachService;
import com.bookland.entity.*;
import com.bookland.utils.ImageUtils;
import com.fasterxml.jackson.databind.ObjectMapper;


@RestController
@RequestMapping("/rest/sach")
public class SachRestController {
	@Autowired
	SachService sachService;

	@GetMapping
	public ResponseEntity<List<Sach>> findAll() {
		List<Sach> sachs = sachService.finAll();
		return ResponseEntity.ok(sachs); // 200 OK
	}

	@PostMapping
	public ResponseEntity<Sach> addSach(@RequestParam("sach") String sachJson,
			@RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
		if (file != null && !file.isEmpty()) {
			try {
				String nameImg = ImageUtils.saveImage(file, "book"); // tên hình 
				// Chuyển đổi JSON thành đối tượng Sach
				Sach sach = new ObjectMapper().readValue(sachJson, Sach.class);
				sach.setHinhAnhSach(nameImg); // lưu tên ảnh vào đối tượng

				// Gọi service để lưu sách
				Sach createdSach = sachService.create(sach);
				return ResponseEntity.status(HttpStatus.CREATED).body(createdSach);
			} catch (Exception e) {
				e.printStackTrace(); // In ra stack trace để debug
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			}

		} else {
			try {
				// Chuyển đổi JSON thành đối tượng Sach
				Sach sach = new ObjectMapper().readValue(sachJson, Sach.class);
				// Gọi service để lưu sách
				Sach createdSach = sachService.create(sach);
				return ResponseEntity.status(HttpStatus.CREATED).body(createdSach);
			} catch (Exception e) {
				e.printStackTrace(); // In ra stack trace để debug
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
			}
		}

	}

	@DeleteMapping("{masach}")
	public ResponseEntity<Void> delete(@PathVariable("masach") String masach) {
		sachService.delete(masach);
		return ResponseEntity.noContent().build(); // 204 No Content
	}
}
