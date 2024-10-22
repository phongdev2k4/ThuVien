package com.bookland.ServiceImpl;

import java.util.Date;
import java.util.HashSet;
import java.util.Optional;
import java.util.Random;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.bookland.dao.authorityDAO;
import com.bookland.dao.chucVuDAO;
import com.bookland.dao.hoiVienDAO;
import com.bookland.dao.taiKhoanDAO;
import com.bookland.service.taiKhoanService;
import com.bookland.dto.SignupRequest;
import com.bookland.dto.SignupResponse;
import com.bookland.entity.Authority;
import com.bookland.entity.HoiVien;
import com.bookland.entity.TaiKhoan;



@Service
public class taiKhoanServiceImpl implements taiKhoanService{

	@Autowired
	taiKhoanDAO dao;
	
	@Autowired
	hoiVienDAO hvdao;
	
	@Autowired
	chucVuDAO cvdao;
	
	@Autowired
	authorityDAO authdao;
	@Autowired
	private PasswordEncoder passwordEncoder;
	 private Set<String> existingIds = new HashSet<>(); // To store existing IDs
	    private Random random = new Random();

	    public String generateUniqueMaHV() {
	        String uniqueId;
	        do {
	            int randomNumber = random.nextInt(100000); // Adjust range as needed
	            uniqueId = "ps" + randomNumber;
	        } while (existingIds.contains(uniqueId));

	        existingIds.add(uniqueId); // Store the newly generated ID
	        return uniqueId;
	    }
	@Override
	public TaiKhoan doRegister(TaiKhoan request) {
		request.setPassword(passwordEncoder.encode(request.getPassword()));
		
		return dao.save(request);
	}
	@Override
	public SignupResponse doRegister13(SignupRequest request) {
		Optional<TaiKhoan> users = dao.findByUserName(request.getUsername());
		
		SignupResponse response = new SignupResponse();
		
		if (users.isPresent()) {
			response.setResponse("User details Already found");
			return response;
		}
		/// tao tai khoan cho user truoc 
		TaiKhoan tk = new TaiKhoan();
		
		tk.setUserName(request.getUsername());
		tk.setPassword(passwordEncoder.encode(request.getPassword()));
		dao.save(tk);
		
		// set quyen cho user mac dinh la R3 = CUS 
	
		Authority authority  = new Authority();
		authority.setTaiKhoan(tk);
		//set mac dinh chuc vu R3 = CUS
		authority.setChucVu(cvdao.findByid("R3"));
		
		authdao.save(authority);
		
		
		HoiVien user = new HoiVien();
		user.setDiaChi(request.getAddress());
		user.setSoDienThoai(request.getMobileno());
		user.setHoTen(request.getName());
		user.setTaiKhoanHV(tk);
		user.setMaHV(generateUniqueMaHV());
		user.setThoiGianDangKy(new Date());
		hvdao.save(user);
		
		response.setResponse("User created with id ");

		return response;

	}
	

}
