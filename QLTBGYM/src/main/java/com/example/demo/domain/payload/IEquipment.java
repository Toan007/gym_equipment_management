package com.example.demo.domain.payload;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

public interface IEquipment {
	
	
	 Integer getEquipmentId();
	
	 String getEquipmentName();
	 
//	 @JsonFormat(pattern = "dd-MM-yyyy")
	 Date getReceiptDate();
	 
	 String getName();
	 
	 String getDescription();
	 
	 String getStateDescription();
}