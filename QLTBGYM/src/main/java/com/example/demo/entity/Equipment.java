package com.example.demo.entity;

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
@SequenceGenerator(name="equipment_seq", sequenceName = "equipment_seq", initialValue = 1)
public class Equipment {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "equipment_seq")
	private Integer id;
	
	private String equipmentName;
	
	private String unit;
	
	@JsonIgnore
	@OneToMany(mappedBy = "id.equipment", fetch = FetchType.LAZY)
	private List<ReceiptDetail> receiptDetailList;
	
	@JsonIgnore
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="equipmentGroupId",nullable = false)
	private EquipmentGroup equipmentGroup;
	
	@JsonIgnore
	@OneToMany(mappedBy = "equipment", fetch = FetchType.LAZY)
	private List<EquipmentLog> equipmentLogList;
	
	private String description;
	
}
