package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.RecordDTO;
import com.example.demo.service.RecordsService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/record")
public class RecordController {

	@Autowired
	RecordsService recordService;
	
	@GetMapping("/all")
	public ResponseEntity<List<RecordDTO>> getAllRecord(){
		
		final List<RecordDTO> result = recordService.getAllRecord();
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
}
