package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonInclude(content = Include.NON_NULL)
public class AccountDTO {
	
	private Integer id;
	
	private String username;
	
	private String id_code;
	
	private String lastName;
	
	private String firstName;
	
	private String birthDate;
	
	private String roleName;
	
	private Boolean active;
	

}
