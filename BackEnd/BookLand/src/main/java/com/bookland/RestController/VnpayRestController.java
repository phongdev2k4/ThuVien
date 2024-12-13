package com.bookland.RestController;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookland.service.VnpayService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@RestController
@RequestMapping("/api/paymen")
public class VnpayRestController {
	@Autowired
	private VnpayService vnpayService;

	// Tạo URL thanh toán từ 3 tham số: mã giao dịch, tiền và nội dung đơn hàng
	@PostMapping("/vnpay/naptien")
	public ResponseEntity<String> createPaymentUrl(@RequestParam String userName,@RequestParam String amount) {
	    String paymentUrl = vnpayService.createPaymentUrl(userName,amount);
	    return ResponseEntity.ok(paymentUrl);  // Trả về chuỗi URL thanh toán
	}


	@GetMapping("/callback")
	public void handlePaymentReturn(HttpServletRequest request, HttpServletResponse response) throws IOException {
		// Gọi service để xử lý kết quả thanh toán và chuyển hướng đến trang Angular
		vnpayService.processPaymentResult(request, response);
	}
	
}
