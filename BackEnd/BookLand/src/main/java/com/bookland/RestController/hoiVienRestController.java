package com.bookland.RestController;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookland.entity.HoiVien;
import com.bookland.service.hoiVienService;

@RestController
@RequestMapping("/hoiVien")
public class hoiVienRestController {
	 @Autowired
	 hoiVienService hv;
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
	 
}
