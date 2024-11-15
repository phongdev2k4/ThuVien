package com.bookland.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


public interface VnpayService {
	 public String createPaymentUrl(String txnRef, String amount, String orderInfo);
	 
	 void processPaymentResult(HttpServletRequest request, HttpServletResponse response) throws IOException;

}
