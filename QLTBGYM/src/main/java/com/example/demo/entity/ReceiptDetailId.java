package com.example.demo.entity;

import java.io.Serializable;

import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Embeddable
public class ReceiptDetailId implements Serializable {
	@ManyToOne
	@JoinColumn(name="receiptId", nullable = false)
	private Receipt receipt;
	
	@ManyToOne
	@JoinColumn(name="equipmentId", nullable = false)
	private Equipment equipment;
}
