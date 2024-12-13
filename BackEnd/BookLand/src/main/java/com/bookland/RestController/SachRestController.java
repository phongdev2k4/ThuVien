package com.bookland.RestController;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bookland.service.SachService;
import com.bookland.service.sachHinhAnhService;
import com.bookland.dao.SachDAO;
import com.bookland.dto.SachDTO;
import com.bookland.dto.addBookRequest;
import com.bookland.dto.addBookResponse;
import com.bookland.entity.*;
import com.bookland.utils.ImageUtils;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/rest/sach")
public class SachRestController {
	@Autowired
	SachService sachService;
	@Autowired
	sachHinhAnhService imageBookService;
    @Autowired
    SachDAO sachdao;
	@GetMapping
	public ResponseEntity<List<addBookResponse>> findAll() {
		List<addBookResponse> sachs = sachService.finAll();
		return ResponseEntity.ok(sachs); // 200 OK
	}
	@GetMapping("/search")
	public ResponseEntity<Page<SachDTO>> findAllSearch(
			@RequestParam(value = "searchKey", required = false) String searchKey,@PageableDefault(size = 5)Pageable pageable) {
		Page<SachDTO> sachs = sachService.searchSachDTO(searchKey,pageable);
		return ResponseEntity.ok(sachs); // 200 OK
	}
	
	  @GetMapping("/searchByName")
	    public List<addBookResponse> getBookDetailsByName(@RequestParam("tenSach") String tenSach123) {
	    	System.out.println(tenSach123);
	        return sachService.findBookDetailsByName(tenSach123);
	    }
 

	  @PostMapping(consumes = "multipart/form-data")
	    public ResponseEntity<addBookResponse> addSach(
	            @RequestPart("book") addBookRequest request,  
	            @RequestPart("files") MultipartFile[] files) throws IOException {
	        
	        addBookResponse response = sachService.create(request, files);  // Delegate to service layer
	        return ResponseEntity.ok(response);
	    }

	@DeleteMapping("{masach}")
	public ResponseEntity<Void> delete(@PathVariable("masach") String masach) {
		sachService.delete(masach);
		return ResponseEntity.noContent().build(); // 204 No Content
	}
	  @GetMapping("/cover")
	    public List<hinhAnhSach> getCoverImages() {
	        return imageBookService.getCoverImages();
	    }
	
}
