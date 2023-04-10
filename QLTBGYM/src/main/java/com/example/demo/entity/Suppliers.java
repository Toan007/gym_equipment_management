package com.example.demo.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

@Entity
@Data
@SequenceGenerator(name="suppliers_seq", sequenceName = "suppliers_seq", initialValue = 1)
public class Suppliers {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "suppliers_seq")
	private Integer id;
	
	private String name;
	
	private String taxId;
	
	private String address;
	
	@JsonIgnore()
	@OneToMany(mappedBy = "suppliers", fetch = FetchType.LAZY)
	private List<Receipt> receiptList;
}
