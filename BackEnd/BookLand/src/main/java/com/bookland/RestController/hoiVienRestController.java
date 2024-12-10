package com.bookland.RestController;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
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

import com.bookland.dao.taiKhoanDAO;
import com.bookland.entity.HoiVien;
import com.bookland.service.hoiVienService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/hoiVien")
public class hoiVienRestController {
	@Autowired
	hoiVienService hv;
	@Autowired
	taiKhoanDAO taiKhoanDAO;
	@GetMapping("/search")
	public List<HoiVien> searchByHoTen(@RequestParam String name) {
		return hv.findHoiVienByName(name);
	}

	@GetMapping("/{maHV}")
	public ResponseEntity<HoiVien> getHoiVienById(@PathVariable String maHV) {
		Optional<HoiVien> hoiVien = hv.findById(maHV);
		if (hoiVien.isPresent()) {
			return ResponseEntity.ok(hoiVien.get());
		} else {
			return ResponseEntity.notFound().build(); // Return 404 if not found
		}
	}

	@GetMapping("/username/{username}")
	public ResponseEntity<HoiVien> getHoiVienByUsername(@PathVariable String username) {
		Optional<HoiVien> hoiVien = hv.findByUsername(username);
		return ResponseEntity.ok(hoiVien.get());

	}

	@GetMapping("/searchPage")
	public ResponseEntity<Page<HoiVien>> searchNhanViens(
			@RequestParam(value = "keyword", required = false) String keyword, Pageable pageable) {
		// Gọi phương thức tìm kiếm từ service
		Page<HoiVien> hoiviens = hv.searchHoiViens(keyword, pageable);
		return ResponseEntity.ok(hoiviens); // Trả về kết quả phân trang
	}

	@PutMapping("/update")
	public ResponseEntity<HoiVien> UpdateHoiViens(@RequestParam("userName") String userName,
			@RequestParam("hoivien") String hoivienJson, // Nhận đối tượng HoiVien dưới dạng JSON
			@RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

		// Chuyển đổi JSON thành đối tượng HoiVien
		ObjectMapper objectMapper = new ObjectMapper();
		HoiVien hoivien = objectMapper.readValue(hoivienJson, HoiVien.class);

		// Cập nhật hội viên (có thể xử lý file nếu có)
		HoiVien response = hv.updateHV(userName, hoivien, file);

		return ResponseEntity.ok(response);
	}

	@PutMapping()
	public ResponseEntity<HoiVien> updateHoiVien(@RequestParam("hoivien") String hoivienJson,
			@RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
		HoiVien hoiVien = new ObjectMapper().readValue(hoivienJson, HoiVien.class);

		HoiVien createdHoiVien = hv.update(hoiVien, file);
		return ResponseEntity.ok(createdHoiVien);
	}

	@GetMapping
	public ResponseEntity<List<HoiVien>> findAll() {
		List<HoiVien> hoiviens = hv.finAll();
		return ResponseEntity.ok(hoiviens); // 200 OK
	}

	@PostMapping()
	public ResponseEntity<?> addHoivien(@RequestParam("hoivien") String hoivienJson,
			@RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
		HoiVien hoiVien = new ObjectMapper().readValue(hoivienJson, HoiVien.class);
		// Kiểm tra tên đăng nhập đã tồn tại chưa
		if (taiKhoanDAO.existsByUserName(hoiVien.getTaiKhoanHV().getUserName())) {
			// Trả về lỗi dưới dạng JSON với thông báo "Tên đăng nhập đã tồn tại!"
			Map<String, String> errorResponse = new HashMap<>();
			errorResponse.put("message", "Tên đăng nhập đã tồn tại!");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
		}
		HoiVien createdHV = hv.create(hoiVien, file);
		return ResponseEntity.ok(createdHV);
	}

	@DeleteMapping("{maHoiVien}")
	public ResponseEntity<Void> delete(@PathVariable("maHoiVien") String maHoiVien) {
		try {
			hv.delete(maHoiVien);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return ResponseEntity.noContent().build(); // 204 No Content
	}
}
