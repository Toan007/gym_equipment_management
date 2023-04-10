package com.example.demo.entity;

import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import lombok.Data;

@Entity
@Data

public class ReceiptDetail {
	
	@EmbeddedId 
	private ReceiptDetailId id;
	
	private Integer quantity;
	
	private Integer itemPrice;

}
