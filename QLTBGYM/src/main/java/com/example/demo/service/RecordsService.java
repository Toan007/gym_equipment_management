package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.common.Utility;
import com.example.demo.dto.RecordDTO;
import com.example.demo.entity.Account;
import com.example.demo.entity.Records;
import com.example.demo.entity.Staff;
import com.example.demo.repository.RecordRepository;

@Service
public class RecordsService {

	@Autowired
	RecordRepository repository;
	
	public Records createRecord(Records record) {
		
		return repository.save(record);
		
	}
	
	public List<RecordDTO> getAllRecord(){
		
		List<Records> recordList = new ArrayList<>();
		
		recordList = repository.findAll();
		
		RecordDTO dto = null;
		
		List<RecordDTO> result = new ArrayList<>();
		
		for(Records record: recordList) {
			
			dto = new RecordDTO();
			
			Account account = record.getAccount();
					
			Staff staff = account.getStaff();
			
			dto.setStaffFirstName(staff.getFirstName());
			
			dto.setStaffLastName(staff.getLastName());
			
			dto.setAccountId(account.getId());
			
			dto.setAction(record.getAction());
			
			dto.setDate(record.getRecordDate().toString());
			
			result.add(dto);
				
		}
		
		return result;
	}
}
