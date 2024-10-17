package com.bookland.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookland.DAO.hoiVienDAO;
import com.bookland.entity.HoiVien;





@RestController
@RequestMapping("/api/user")
public class UserController {
	@Autowired
	hoiVienDAO hvDAO;
	@GetMapping("{user_id}") // Thêm biến đường dẫn "user_id"

    public ResponseEntity<?> getHoiVienById(@PathVariable("user_id") String userId) {
        try {
        	 System.out.print(userId);
            HoiVien hv = hvDAO.findByTaiKhoanId(userId);
            System.out.print(hv.getHoTen());
         
            return ResponseEntity.ok(hv);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
