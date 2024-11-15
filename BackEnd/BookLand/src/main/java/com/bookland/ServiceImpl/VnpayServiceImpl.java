package com.bookland.ServiceImpl;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.stereotype.Service;

import com.bookland.config.VNPayConfig;
import com.bookland.service.VnpayService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

@Service
public class VnpayServiceImpl implements VnpayService {

	@Override
	public String createPaymentUrl(String txnRef, String amount, String orderInfo) {
		if (txnRef == null || txnRef.isEmpty()) {
			txnRef = VNPayConfig.getRandomNumber(8); // Tạo mã giao dịch ngẫu nhiên nếu không được truyền vào
		}
		// Tạo các tham số cho VNPAY
		Map<String, String> vnp_Params = new HashMap<>();
		vnp_Params.put("vnp_Version", "2.1.0");
		vnp_Params.put("vnp_Command", "pay");
		vnp_Params.put("vnp_TmnCode", VNPayConfig.vnp_TmnCode);

		// Kiểm tra và chuyển đổi số tiền (amount) sang đơn vị đồng
		long amountLong = 0;
		try {
			amountLong = Long.parseLong(amount) * 100; // Đơn vị tiền tệ là đồng (cent)
		} catch (NumberFormatException e) {
			throw new IllegalArgumentException("Số tiền không hợp lệ");
		}
		vnp_Params.put("vnp_Amount", String.valueOf(amountLong));
		vnp_Params.put("vnp_CurrCode", "VND");
		vnp_Params.put("vnp_TxnRef", txnRef); // Mã giao dịch
		vnp_Params.put("vnp_OrderInfo", orderInfo); // Nội dung đơn hàng
		vnp_Params.put("vnp_OrderType", "other"); // Loại đơn hàng
		vnp_Params.put("vnp_Locale", "vn"); // Ngôn ngữ hiển thị (tiếng Việt mặc định)
		vnp_Params.put("vnp_ReturnUrl", VNPayConfig.vnp_ReturnUrl); // URL trả về sau khi thanh toán
		vnp_Params.put("vnp_IpAddr", "192.168.1.100");
		// Thời gian tạo giao dịch
		Calendar cld = Calendar.getInstance();
		String vnp_CreateDate = new java.text.SimpleDateFormat("yyyyMMddHHmmss").format(cld.getTime());
		vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

		// Thời gian hết hạn giao dịch (15 phút)
		cld.add(Calendar.MINUTE, 15); // Thêm 15 phút để tạo thời gian hết hạn
		String vnp_ExpireDate = new java.text.SimpleDateFormat("yyyyMMddHHmmss").format(cld.getTime());
		vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

		// Sắp xếp các tham số theo tên
		List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
		Collections.sort(fieldNames);

		StringBuilder query = new StringBuilder();
		StringBuilder hashData = new StringBuilder();
		Iterator<String> itr = fieldNames.iterator();
		while (itr.hasNext()) {
			String fieldName = itr.next();
			String fieldValue = vnp_Params.get(fieldName);
			if (fieldValue != null && fieldValue.length() > 0) {
				try {
					// Xây dựng dữ liệu hash
					hashData.append(fieldName).append("=")
							.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));

					// Xây dựng query URL
					query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString())).append("=")
							.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
					if (itr.hasNext()) {
						query.append("&");
						hashData.append("&");
					}
				} catch (UnsupportedEncodingException e) {
					throw new RuntimeException("Không thể mã hóa URL", e);
				}
			}
		}

		// Tạo Secure Hash
		String vnp_SecureHash = VNPayConfig.hmacSHA512(VNPayConfig.secretKey, hashData.toString());
		query.append("&vnp_SecureHash=").append(vnp_SecureHash);

		// Trả về URL thanh toán hoàn chỉnh
		return VNPayConfig.vnp_PayUrl + "?" + query.toString();
	}

    @Override
    public void processPaymentResult(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // Lấy thông tin từ request
        String vnp_ResponseCode = request.getParameter("vnp_ResponseCode");
        String vnp_TxnRef = request.getParameter("vnp_TxnRef");
        String vnp_Amount = request.getParameter("vnp_Amount");

        // Kiểm tra mã phản hồi từ VNPay (vnp_ResponseCode)
        if ("00".equals(vnp_ResponseCode)) {
            // Nếu giao dịch thành công, chuyển hướng đến trang thành công trong Angular
            String successUrl = "http://localhost:4200/paymenSuccess?txnRef=" + vnp_TxnRef + "&amount=" + vnp_Amount;
            response.sendRedirect(successUrl);
        } else {
            // Nếu giao dịch thất bại, chuyển hướng đến trang thất bại trong Angular
            String failureUrl = "http://localhost:4200/paymenFailure?txnRef=" + vnp_TxnRef + "&errorCode=" + vnp_ResponseCode;
            response.sendRedirect(failureUrl);
        }
    }



}
