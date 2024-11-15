package com.bookland.RestController;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookland.service.VnpayService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
@RestController
public class VnpayRestController {
    @Autowired
    private VnpayService vnpayService;

    // Tạo URL thanh toán từ 3 tham số: mã giao dịch, tiền và nội dung đơn hàng
    @PostMapping("/createPaymentUrl")
    public String createPaymentUrl(@RequestParam String txnRef, // Mã giao dịch
                                   @RequestParam String amount, // Số tiền
                                   @RequestParam String orderInfo) { // Nội dung đơn hàng
        return vnpayService.createPaymentUrl(txnRef, amount, orderInfo);
    }
    
    @GetMapping("/vnpay-return")
    public void handlePaymentReturn(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Gọi service để xử lý kết quả thanh toán và chuyển hướng đến trang Angular
    	vnpayService.processPaymentResult(request, response);
    }
}
