package com.bookland.config;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.bookland.entity.Authority;
import com.bookland.entity.TaiKhoan;





public class UserInfoUserDetails implements UserDetails {

	private static final long serialVersionUID = -8773921465190832995L;
	private String name;
	private String password;
	private List<GrantedAuthority> authorities;

	public UserInfoUserDetails(TaiKhoan userInfo) {
		name = userInfo.getUserName();
		password = userInfo.getPassword();

		authorities = new ArrayList<>();
//		authorities = Arrays.stream("USER".split(","))
//		.map(SimpleGrantedAuthority::new)
//		.collect(Collectors.toList());
		for (Authority authority : userInfo.getAuthorities()) {
            // Add each role (chucVu.tenChucVu) to the list of granted authorities
            String roleName = authority.getChucVu().getTenChucVu();
            authorities.add(new SimpleGrantedAuthority(roleName));
        }
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return name;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return false;
	}


}
