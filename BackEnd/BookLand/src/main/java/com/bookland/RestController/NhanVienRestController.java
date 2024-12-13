package com.bookland.RestController;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bookland.dao.nhanVienDAO;
import com.bookland.dao.taiKhoanDAO;
import com.bookland.entity.HoiVien;
import com.bookland.entity.NhanVien;
import com.bookland.service.NhanVienService;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/rest/nhavien")
public class NhanVienRestController {
	@Autowired
	NhanVienService nhanVienService;
	@Autowired
	taiKhoanDAO taiKhoanDAO;
	@Autowired
	nhanVienDAO nhanVienDAO;
	@GetMapping
	public ResponseEntity<List<NhanVien>> findAll() {
		List<NhanVien> nhanViens = nhanVienService.finAll();
		return ResponseEntity.ok(nhanViens); // 200 OK
	}
	@GetMapping("/search")
	public ResponseEntity<Page<NhanVien>> searchNhanViens(
	        @RequestParam(value = "keyword", required = false) String keyword,Pageable pageable) {
	    // Gọi phương thức tìm kiếm từ service
	    Page<NhanVien> nhanViens = nhanVienService.searchNhanViens(keyword, pageable);
	    return ResponseEntity.ok(nhanViens); // Trả về kết quả phân trang
	}
	@PostMapping()
	public ResponseEntity<?> addNhanVien(@RequestParam("nhanvien") String nhanvienJson,
			@RequestParam(value = "file", required = false) MultipartFile file) throws IOException {
		NhanVien nhanVien = new ObjectMapper().readValue( nhanvienJson, NhanVien.class);
		
		
	    // Kiểm tra tên đăng nhập đã tồn tại chưa
	    if (taiKhoanDAO.existsByUserName(nhanVien.getTaiKhoanNV().getUserName())) {
	        // Trả về lỗi dưới dạng JSON với thông báo "Tên đăng nhập đã tồn tại!"
	        Map<String, String> errorResponse = new HashMap<>();
	        errorResponse.put("message", "Tên đăng nhập đã tồn tại!");
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
	    }

	    // Kiểm tra email đã tồn tại chưa
	    if (nhanVienDAO.existsByEmail(nhanVien.getEmail())) {
	        // Trả về lỗi dưới dạng JSON với thông báo "Email đã tồn tại!"
	        Map<String, String> errorResponse = new HashMap<>();
	        errorResponse.put("message", "Email đã tồn tại!");
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
	    }
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
	   @PutMapping("/update")
	  public ResponseEntity<NhanVien> UpdateHoiViens(
			 @RequestParam("userName") String userName,
	          @RequestParam("nhanvien") String nhanvienJson,  // Nhận đối tượng HoiVien dưới dạng JSON
	          @RequestParam(value = "file", required = false) MultipartFile file) throws IOException {

	      // Chuyển đổi JSON thành đối tượng HoiVien
	      ObjectMapper objectMapper = new ObjectMapper();
	      NhanVien nhanVien = objectMapper.readValue(nhanvienJson, NhanVien.class);

	      // Cập nhật hội viên (có thể xử lý file nếu có)
	      NhanVien response = nhanVienService.updateNV(userName,nhanVien, file);

	      return ResponseEntity.ok(response);
	  }
	@DeleteMapping("{maNhanVien}")
	public ResponseEntity<Void> delete(@PathVariable("maNhanVien") String maNhanVien) {
		try {
			nhanVienService.delete(maNhanVien);
		} catch (Exception e) {
			// TODO: handle exception
		}
		return ResponseEntity.noContent().build(); // 204 No Content
	}
    @GetMapping("/username/{username}")
    public NhanVien getNhanVienByUsername(@PathVariable String username) {
        return nhanVienService.finByUserName(username);
    }
}
