package com.example.demo.domain.payload;

import java.sql.Date;

import lombok.Data;

@Data
public class StaffRequest {
	
//	private Integer staffId;
	private Date birthDate;
	private String firstName;
	private String lastName;
	private String idCode;

}
