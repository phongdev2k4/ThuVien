package com.bookland.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookland.Service.taiKhoanService;
import com.bookland.config.JWTService;
import com.bookland.dto.DashboardResponse;
import com.bookland.dto.*;
import com.bookland.dto.LoginResponse;
import com.bookland.entity.TaiKhoan;






@RestController
@RequestMapping("/api")
//@CrossOrigin("*")
public class LoginController {
	@Autowired
	private JWTService jwtService;
	
	@Autowired
	private  taiKhoanService tkService;
	
	@Autowired
	private AuthenticationManager authenticationManager;

	
	@PostMapping("/dangKi")
	public TaiKhoan doRegister(@RequestBody TaiKhoan request) {
		return tkService.doRegister(request) ;
	}
	@PostMapping("/doRegister")
	public ResponseEntity<SignupResponse> doRegister(@RequestBody SignupRequest request) {
		return new ResponseEntity<>(tkService.doRegister13(request), HttpStatus.CREATED);
	}

	@PostMapping("/dangNhap")
	public ResponseEntity<LoginResponse> doLogin(@RequestBody LoginRequest request) {
	    LoginResponse response = new LoginResponse();
	
	    
	    System.out.print(request.getUserName());
	    System.out.println("Password: " + request.getPassword());
	   
	    
	    // Print the incoming username and password (for debugging purposes)
	   

	    // Perform authentication
	    try {
	        Authentication authentication = authenticationManager.authenticate(
	            new UsernamePasswordAuthenticationToken(request.getUserName(), request.getPassword())
	            
	        );
	        System.out.println("Authenticated: " + authentication.isAuthenticated());
            System.out.println("Principal: " + authentication.getPrincipal());

	        // If authentication is successful
	        if (authentication.isAuthenticated()) {
	            // Generate the token using the username
	            String token = jwtService.generateToken(request.getUserName());
	            response.setToken(token);
	            return new ResponseEntity<>(response, HttpStatus.CREATED);
	        } else {
	            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	        }
	    } catch (Exception e) {
	        // If authentication fails, return 401 Unauthorized
	        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
	    }
	}
	
	@GetMapping("/trangChu")
	public ResponseEntity<DashboardResponse> dashboard() {
		DashboardResponse response = new DashboardResponse();
		response.setResponse("Successfully");
		
		System.out.println("Dashboard Response");
		var auth = SecurityContextHolder.getContext().getAuthentication();
		System.out.println("Role: " + auth.getPrincipal());
		
		return new ResponseEntity<>(response, HttpStatus.OK);
	}



	
	
	

}
