package com.bookland.Service;

import org.springframework.stereotype.Service;

import com.bookland.dto.SignupRequest;
import com.bookland.dto.SignupResponse;
import com.bookland.entity.TaiKhoan;



@Service
public interface taiKhoanService {

	TaiKhoan doRegister(TaiKhoan request);

	SignupResponse doRegister13(SignupRequest request);



}
