package com.example.demo.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

@Entity
@Data
@SequenceGenerator(name="staff_seq", sequenceName = "staff_seq", initialValue = 1)
public class Staff {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "staff_seq")
	private Integer id;
	
	private String id_code;
	
	private String firstName;
	
	private String lastName;
	
	private Date birthDate; 
	
	@JsonIgnore
	@OneToOne(mappedBy = "staff", fetch = FetchType.LAZY)
	private Account account;

}
