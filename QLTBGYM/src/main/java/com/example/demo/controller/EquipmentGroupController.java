package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.EquipmentGroup;
import com.example.demo.entity.Suppliers;
import com.example.demo.service.EquipmentGroupService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/equipmentgroup")
public class EquipmentGroupController {
	
	@Autowired
	EquipmentGroupService equipGroupService;

	@PostMapping("/add")
	public ResponseEntity<EquipmentGroup>  createEquipGroup(@RequestParam String equipGroupName) {

		final EquipmentGroup result =  equipGroupService.addEquipGroup(equipGroupName);
		
		return new ResponseEntity<>(result,HttpStatus.OK);
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<EquipmentGroup>> getEquipGroup()
	{
		final List<EquipmentGroup> result = equipGroupService.getAllEquipGroup();
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@PostMapping("/update/{equipGroupId}")
	public ResponseEntity<EquipmentGroup> updateEquipGroup(@PathVariable Integer equipGroupId, @RequestParam String equipGroupName) {
		
		final EquipmentGroup result = equipGroupService.upadteEquipGroup(equipGroupId, equipGroupName);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{equipGroupId}")
	public void deleteEquipGroup(@PathVariable Integer equipGroupId) {
		
		 equipGroupService.deleteEquipGroup(equipGroupId);
	}
}
