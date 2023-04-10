package com.example.demo.controller;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.StaffDTO;
import com.example.demo.entity.Staff;
import com.example.demo.service.StaffService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/staff")
public class StaffController {

	@Autowired
	StaffService staffService;
	
	@PostMapping("/update/{staffId}")
	public ResponseEntity<Staff> updateStaff(@RequestBody StaffDTO staff, @PathVariable Integer staffId) throws ParseException {
		
		final Staff result = staffService.updateStaff(staff, staffId);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@GetMapping("/profile")
	public ResponseEntity<StaffDTO> getProfileStaff(@RequestParam Integer accountId){
		
		final StaffDTO result = staffService.getProfile(accountId);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
}
