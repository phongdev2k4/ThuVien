package com.bookland.exeption;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
	  @ExceptionHandler(NullPointerException.class)
	    public ResponseEntity<String> handleNullPointerException(NullPointerException ex) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: The requested item could not be found.");
	    }

	    @ExceptionHandler(Exception.class)
	    public ResponseEntity<String> handleGeneralException(Exception ex) {
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + ex.getMessage());
	    }

}
