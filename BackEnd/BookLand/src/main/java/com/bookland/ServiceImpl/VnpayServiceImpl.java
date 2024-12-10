package com.bookland.ServiceImpl;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.bookland.config.VNPayConfig;
import com.bookland.dao.ThanhToanDAO;
import com.bookland.dao.hoiVienDAO;
import com.bookland.entity.HoiVien;
import com.bookland.entity.ThanhToan;
import com.bookland.service.VnpayService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.ArrayList;

@Service
public class VnpayServiceImpl implements VnpayService {
	@Autowired
	ThanhToanDAO thanhToanDAO ;
	@Autowired
	hoiVienDAO hvDao;

	@Override
	public String createPaymentUrl(String userName, String amount) {
		Optional<HoiVien> hoiVien = hvDao.findByTaiKhoanHV_UserName(userName);
		String txnRef = VNPayConfig.getRandomNumber(8);
		// Kiểm tra tính duy nhất của mã giao dịch
		while (!isMaGiaoDichUnique(txnRef)) {
			txnRef = VNPayConfig.getRandomNumber(8); // Sinh lại mã nếu trùng
		}
		ThanhToan thanhtoan = new ThanhToan();
		thanhtoan.setMaGiaoDich(txnRef);
		thanhtoan.setTrangThaiThanhToan("Tự động");
		thanhtoan.setLoaiThanhToan("Nạp tiền");
		thanhtoan.setSoTien(Double.parseDouble(amount));
		thanhtoan.setThoiGianThanhToan(new Date());
		thanhtoan.setCongThanhToan("VNPay");
		thanhtoan.setTrangThaiGiaoDich("Đang chờ");
		thanhtoan.setGhiChu("Nạp tiền hội viên");
		thanhtoan.setHoiVien(hoiVien.get());
		thanhToanDAO.save(thanhtoan);
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
		vnp_Params.put("vnp_OrderInfo", "Nap Tien "); // Nội dung đơn hàng
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
		thanhtoan.setURlThanhToan(VNPayConfig.vnp_PayUrl + "?" + query.toString());
		thanhToanDAO.save(thanhtoan);
		return VNPayConfig.vnp_PayUrl + "?" + query.toString();
	}

	@Override
	public void processPaymentResult(HttpServletRequest request, HttpServletResponse response) throws IOException {
		// Lấy thông tin từ request
		String vnp_ResponseCode = request.getParameter("vnp_ResponseCode");
		String vnp_TxnRef = request.getParameter("vnp_TxnRef");
		String vnp_Amount = request.getParameter("vnp_Amount");
		String vnp_CardType = request.getParameter("vnp_CardType");
		Optional<ThanhToan> thanhtoan = thanhToanDAO.findByMaGiaoDich(vnp_TxnRef);
		Optional<HoiVien> hoivien=hvDao.findById(thanhtoan.get().getHoiVien().getMaHV());
		// Kiểm tra mã phản hồi từ VNPay (vnp_ResponseCode)
		if ("00".equals(vnp_ResponseCode)) {
			thanhtoan.get().setHinhThucThanhToan(vnp_CardType);
			thanhtoan.get().setTrangThaiGiaoDich("Thành công");
			thanhToanDAO.save(thanhtoan.get());
			Double tiencondon=hoivien.get().getTienNap()+thanhtoan.get().getSoTien();
			hoivien.get().setTienNap(tiencondon);
			hvDao.save(hoivien.get());
			// Nếu giao dịch thành công, chuyển hướng đến trang thành công trong Angular
                String successUrl = "http://localhost:4200/paymenSuccess?txnRef=" + vnp_TxnRef + "&amount=" + vnp_Amount;
                response.sendRedirect(successUrl);
		} else if ("04".equals(vnp_ResponseCode)) {
			// Giao dịch bị hủy
			thanhtoan.get().setTrangThaiGiaoDich("Đã hủy");
			thanhtoan.get().setHinhThucThanhToan(vnp_CardType);
			thanhToanDAO.save(thanhtoan.get());
		} else if ("24".equals(vnp_ResponseCode)) {// bấm nút hủy thanh toán 
			response.sendRedirect("http://localhost:4200/NapTien");
		} else {
			thanhtoan.get().setHinhThucThanhToan(vnp_CardType);
			thanhtoan.get().setTrangThaiGiaoDich("Thất bại");
			// Nếu giao dịch thất bại, chuyển hướng đến trang thất bại trong Angular
                String failureUrl = "http://localhost:4200/paymenFailure?txnRef=" + vnp_TxnRef + "&errorCode=" + vnp_ResponseCode;
                response.sendRedirect(failureUrl);
			thanhToanDAO.save(thanhtoan.get());
		}

	}

	// Phương thức kiểm tra tính duy nhất của mã giao dịch
	public boolean isMaGiaoDichUnique(String maGiaoDich) {
		// Kiểm tra xem mã giao dịch có tồn tại trong cơ sở dữ liệu không
		return !thanhToanDAO.findByMaGiaoDich(maGiaoDich).isPresent();
	}

	@Scheduled(fixedDelay = 900000) // Lặp lại mỗi 15 phút
	@Transactional
	public void checkPendingPayments() {
		List<ThanhToan> thanhtoans = thanhToanDAO.findByTrangThaiGiaoDich("Đang chờ");
		// Dùng vòng lặp for để duyệt qua từng giao dịch thanh toán
		for (ThanhToan thanhToan : thanhtoans) {
			// Lấy thời gian thanh toán của giao dịch hiện tại
			Date thoiGianThanhToan = thanhToan.getThoiGianThanhToan();
			// Lấy thời gian hiện tại
			Date currentTime = new Date();

			// Tính khoảng cách thời gian giữa thời gian thanh toán và thời gian hiện tại
			// (theo đơn vị milliseconds)
			long differenceInMillis = currentTime.getTime() - thoiGianThanhToan.getTime();

			// Chuyển 15 phút thành milliseconds (15 phút = 15 * 60 * 1000 milliseconds)
			long fifteenMinutesInMillis = 15 * 60 * 1000;

			// Kiểm tra xem thời gian thanh toán đã quá 15 phút hay chưa
			if (differenceInMillis > fifteenMinutesInMillis) {
				thanhToan.setTrangThaiGiaoDich("Hủy quá thời gian thanh toán");
				thanhToanDAO.save(thanhToan);
			}
		}
	}

}
