package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.EquipmentLogDTO;
import com.example.demo.service.EquipmentLogService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/equipmentlog")
public class EquipmentLogController {

	@Autowired
	EquipmentLogService equipmentLogService;
	
	@GetMapping("/all")
	public ResponseEntity<List<EquipmentLogDTO>> getAllLog(){
		
		final List<EquipmentLogDTO> result = equipmentLogService.getEquipLog();
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
}
