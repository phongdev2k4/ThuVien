package com.bookland.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.bookland.DAO.taiKhoanDAO;
import com.bookland.entity.Authority;
import com.bookland.entity.TaiKhoan;







@Component
public class UserInfoUserDetailsService implements UserDetailsService {

	@Autowired
	private taiKhoanDAO repository;

	  @Override
	    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	        TaiKhoan user = repository.findByUserName(username)
	            .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
	        List<GrantedAuthority> authorities = new ArrayList<>();
	        for (Authority authority : user.getAuthorities()) {
	            authorities.add(new SimpleGrantedAuthority(authority.getChucVu().getTenChucVu())); // Adjust as necessary
	        }
	        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), authorities);
	    }
}
