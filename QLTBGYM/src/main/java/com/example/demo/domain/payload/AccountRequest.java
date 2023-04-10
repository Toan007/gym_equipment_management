package com.example.demo.domain.payload;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonInclude(Include.NON_NULL)
public class AccountRequest {

	
	private String username;
	
	
	private Integer roleId;
	
	
	
}
