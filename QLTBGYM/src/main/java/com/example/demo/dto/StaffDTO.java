package com.example.demo.dto;

import jakarta.persistence.Lob;
import lombok.Data;

@Data
public class StaffDTO {
	
	private Integer staffId;
	
	private String firstName;
	
	private String lastName;
	
	private String CMND;
	
	private String date;
	
	@Lob
	private byte[] avatar;

}
