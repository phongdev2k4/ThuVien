package com.bookland.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookland.entity.Kho;
import com.bookland.entity.ThanhToan;
import com.bookland.service.ThanhToanService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/rest/thanhtoan")
public class ThanhToanRestController {
	@Autowired
	ThanhToanService thanhToanService;
    // API lấy lịch sử thanh toán của hội viên theo mã hội viên
    @GetMapping("/lichsuHV/{maHV}")
    public ResponseEntity<Page<ThanhToan>> getLichSuThanhToan(@PathVariable String maHV,
    		@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        // Lấy danh sách phân trang
        Page<ThanhToan> lichSuThanhToan = thanhToanService.TimLichSuThanhToanHV(maHV, page, size);
        // Trả về dữ liệu với HTTP 200
        return ResponseEntity.ok(lichSuThanhToan);
    }
	@PostMapping
	public ResponseEntity<ThanhToan> post(@RequestBody ThanhToan thanhToan) {
		ThanhToan createdthanhtoan =thanhToanService.create(thanhToan);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdthanhtoan); // 201 Created
	}
    
}
