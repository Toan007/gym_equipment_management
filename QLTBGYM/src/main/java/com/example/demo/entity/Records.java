package com.example.demo.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

@Entity
@Data
@SequenceGenerator(name="records_seq", sequenceName = "records_seq", initialValue = 1)
public class Records {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "records_seq")
	private Integer id;
	
	private Date recordDate;
	
	private String action;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="accountId", nullable =false )
	private Account account;

}
