package com.example.demo.model;

import java.util.Date;

import com.example.demo.domain.payload.SupplierRequest;

import lombok.Data;

@Data
public class ReceiptModel {
	
	private Integer receiptId;
	
	private Date receiptDate;
	
	private SupplierRequest supplier;

}
