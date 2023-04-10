package com.example.demo.entity;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

@Entity
@Data
@SequenceGenerator(name="receipt_seq", sequenceName = "receipt_seq", initialValue = 1)
public class Receipt {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "receipt_seq")
	private Integer id;
	
	private Date receiptDate;
	
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="supplierId", nullable = false)
	private Suppliers suppliers;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="acountId",nullable = false)
	private Account account;
	
	@JsonIgnore
	@OneToMany(mappedBy = "id.receipt")
	private List<ReceiptDetail> receiptDetailList;
	
	private Double totalPrice;
}
