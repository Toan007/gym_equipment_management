package com.example.demo.dto;

import lombok.Data;

@Data
public class ReceiptDetailDTO {

//	private Integer receiptId;
	
	private String equipName;
	
	private String unit;
	
	private Integer quantity;
	
	private Integer itemPrice;
	
	private Double total;
}
