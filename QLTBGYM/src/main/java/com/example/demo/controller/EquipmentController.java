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

import com.example.demo.domain.payload.IEquipment;
import com.example.demo.entity.Equipment;
import com.example.demo.model.EquipmentModel;
import com.example.demo.service.EquipmentService;

@RestController
@CrossOrigin("http://localhost:8000")
@RequestMapping("/api/equipment")
public class EquipmentController {
	@Autowired
	EquipmentService equipmentService;
	
	@PostMapping("/add")
	public ResponseEntity<Equipment> createEquipment(@RequestBody EquipmentModel equipment, @RequestParam Integer accountId, @RequestParam Integer equipGroup) {
		
		final Equipment result = equipmentService.createEquipment(equipment, accountId, equipGroup);
		
		return new ResponseEntity<>(result,HttpStatus.OK);
	}

	
	@GetMapping("/all")
	public ResponseEntity<List<IEquipment>> getAllEquipment(){
		
		final List<IEquipment> result = equipmentService.getAllEquipment();
		
		return new ResponseEntity<>(result,HttpStatus.OK);
	}
	
	@DeleteMapping("delete/{equipmentId}/{accountId}")
	public void deleteEquipment(@PathVariable Integer equipmentId, @PathVariable Integer accountId ) {
		
		equipmentService.deleteEquipment(equipmentId, accountId);
	}
	
	@CrossOrigin("http://localhost:8000")
	@PostMapping("/update/{equipId}/{accountId}")
	public ResponseEntity<Equipment> updateEquipment(@RequestBody EquipmentModel details,@PathVariable Integer equipId, @PathVariable Integer accountId) {
		
		final Equipment result = equipmentService.updateEquipment(details,equipId, accountId);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@GetMapping("/getequipment")
	public ResponseEntity<Equipment> getEquipment(@RequestParam Integer equipId) {
		
		final Equipment result = equipmentService.getEquip(equipId);
		
		return new ResponseEntity<>(result,HttpStatus.OK);
		
	}
}