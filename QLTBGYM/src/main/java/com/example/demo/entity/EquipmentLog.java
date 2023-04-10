package com.example.demo.entity;


import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;

@Entity
@Data
@SequenceGenerator(name="equipment_log_seq", sequenceName = "equipment_log_seq", initialValue = 1)
public class EquipmentLog {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "equipment_log_seq")
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="equimentId", nullable = false)
	private Equipment equipment;
	
	private Date stateDate;
	
	private String stateDescription;
	
	private Boolean checkState;
	
	private String action;

}
