package com.bookland.RestController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookland.dao.taiKhoanDAO;
import com.bookland.dto.ChangePasswordRequest;
import com.bookland.service.taiKhoanService;

@RestController
@RequestMapping("/rest/taikhoan")
public class TaiKhoanRestController {
	@Autowired
	private  taiKhoanService tkService;
	
	@PutMapping("/change-password")
	public ResponseEntity<String> changePassword(@RequestBody ChangePasswordRequest request) {
	    boolean success = tkService.changePassword(request.getUserName(), request.getOldPassword(), request.getNewPassword());
	    if (success) {
	        return ResponseEntity.ok("Mật khẩu đã được thay đổi thành công");
	    }
	    return ResponseEntity.status(400).body("Mật khẩu cũ không đúng hoặc có lỗi");
	}

}
