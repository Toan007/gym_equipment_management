package com.example.demo.domain.payload;

import lombok.Data;

@Data
public class CreateAccountRequest {
	
	private AccountRequest account;
	private StaffRequest staff;

}
