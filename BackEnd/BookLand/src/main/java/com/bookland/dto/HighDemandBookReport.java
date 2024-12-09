package com.bookland.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class HighDemandBookReport {
	  private String bookName;
	    private long borrowCount;
	    private long availableCopies;
	    private long damagedCopies;

}
