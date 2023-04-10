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
@SequenceGenerator(name="equipment_group_seq", sequenceName = "equipment_group_seq", initialValue = 1)
public class EquipmentGroup {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "equipment_group_seq")
	private Integer id;
	
	private String equipGroupName;
	
	@JsonIgnore
	@OneToMany(mappedBy = "equipmentGroup", fetch = FetchType.LAZY)
	private List<Equipment> equipmentList;
	
}
