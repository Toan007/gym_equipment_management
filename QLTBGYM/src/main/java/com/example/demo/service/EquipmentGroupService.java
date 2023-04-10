package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.EquipmentGroup;
import com.example.demo.entity.Suppliers;
import com.example.demo.repository.EquipmentGroupRepository;

@Service
public class EquipmentGroupService {

	@Autowired
	EquipmentGroupRepository repository;

	public EquipmentGroup addEquipGroup(String equipGroupName) {

		EquipmentGroup EquipGroup = new EquipmentGroup();

		EquipGroup.setEquipGroupName(equipGroupName);

		return repository.save(EquipGroup);
	}

	public List<EquipmentGroup> getAllEquipGroup() {

		List<EquipmentGroup> equipGroupList = new ArrayList<>();

		equipGroupList = repository.findAll();

		return equipGroupList;
	}
	
	public EquipmentGroup upadteEquipGroup(Integer equipGroupid, String equipGroupName) {
		
		EquipmentGroup equip = repository.findById(equipGroupid).get();
		
		equip.setEquipGroupName(equipGroupName);
		
		return repository.save(equip);
	}
	
	public void deleteEquipGroup(Integer equipGroupId) {
		
		 repository.deleteById(equipGroupId);
			
	}
}
