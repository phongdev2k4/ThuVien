package com.bookland.RestController;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bookland.dao.BanSaoSachDAO;
import com.bookland.dto.BanSaoSachWithCoverImageDTO;
import com.bookland.entity.BanSaoSach;
import com.bookland.entity.TacGia;
import com.bookland.service.BanSaoSachService;
import com.bookland.utils.BarcodeGeneratorUtils;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/rest/bansaosach")
public class BanSaoSachRestController {
	@Autowired
	BanSaoSachService banSaoSachService;

	@Autowired
	BanSaoSachDAO banSaoSachDAO;

	@GetMapping
	public ResponseEntity<List<BanSaoSach>> findAll() {
		List<BanSaoSach> bansaosachs = banSaoSachService.finAll();
		return ResponseEntity.ok(bansaosachs); // 200 OK
	}
    
	@PostMapping("/update")
	public ResponseEntity<BanSaoSach> post(@RequestBody BanSaoSach banSaoSach) {
		BanSaoSach createdbansaosach = banSaoSachService.update(banSaoSach);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdbansaosach); // 201 Created
	}

	@PostMapping
	public ResponseEntity<List<BanSaoSach>> post(@RequestBody Map<String, Object> request) {
		BanSaoSach bansaosach = new ObjectMapper().convertValue(request.get("bansaosach"), BanSaoSach.class);
		int soLuong = (int) request.get("soLuong");

		List<BanSaoSach> createdBanSaoSachs = banSaoSachService.create(bansaosach, soLuong);

		return ResponseEntity.status(HttpStatus.CREATED).body(createdBanSaoSachs); // 201 Created
	}

	@DeleteMapping("{mabansaosach}")
	public ResponseEntity<Void> delete(@PathVariable("mabansaosach") int mabansaosach) {
		banSaoSachService.delete(mabansaosach);
		return ResponseEntity.noContent().build(); // 204 No Content
	}
	
	@GetMapping("/mavach/{maVach}")
	public ResponseEntity<BanSaoSach> findByMaVach(@PathVariable String maVach) {
	    BanSaoSach banSaoSach = banSaoSachService.findByMaVach(maVach);
	    
	    if (banSaoSach == null) {
	        return ResponseEntity.notFound().build(); // 404 Not Found nếu không tìm thấy
	    }
	    
	    return ResponseEntity.ok(banSaoSach); // 200 OK với bản sao sách
	}
	 @GetMapping("/with-cover-images")
	    public List<BanSaoSachWithCoverImageDTO> getBanSaoSachWithCoverImages() {
	        return banSaoSachService.getBanSaoSachWithCoverImages();
	    }
	  @GetMapping("/findBySachIds")
	    public Map<String, BanSaoSach> findBanSaoSachBySachIds(@RequestParam List<String> sachIds) {
	        return banSaoSachService.findBanSaoSachBySachIds(sachIds);
	    }

}
