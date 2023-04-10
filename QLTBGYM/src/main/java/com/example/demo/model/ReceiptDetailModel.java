package com.example.demo.model;

import lombok.Data;

@Data
public class ReceiptDetailModel {

	private Integer quantity;

	private Integer itemPrice;
	
	private EquipmentModel equipment = null;
	
	private ReceiptModel receipt = null;

}
