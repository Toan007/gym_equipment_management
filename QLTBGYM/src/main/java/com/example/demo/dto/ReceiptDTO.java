package com.example.demo.dto;

import lombok.Data;

@Data
public class ReceiptDTO {
	
	private Integer receiptId;
	
	private String date;
	
	private String suppName;
	
	private String total;

}
