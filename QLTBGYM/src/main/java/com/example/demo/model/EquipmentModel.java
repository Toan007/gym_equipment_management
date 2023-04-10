package com.example.demo.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

import lombok.Data;

@Data
@JsonInclude(content = Include.NON_NULL)
public class EquipmentModel {
	
	private Integer id;
	
	private String name;
	
	private String description;
	
	private String unit;
	
	private String state_equipment;

}
