package com.example.demo.service;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.domain.payload.IEquipment;
import com.example.demo.entity.Account;
import com.example.demo.entity.Equipment;
import com.example.demo.entity.EquipmentGroup;
import com.example.demo.entity.EquipmentLog;
import com.example.demo.entity.Records;
import com.example.demo.model.EquipmentModel;
import com.example.demo.repository.EquipmentLogRepository;
import com.example.demo.repository.EquipmentRepository;

@Service
public class EquipmentService {
	@Autowired
	private EquipmentRepository equipmentRepository;

	@Autowired
	EquipmentLogService equiplogService;

	@Autowired
	RecordsService recordService;
	
	@Autowired
	EquipmentLogRepository equipLogRepos;

	// CREATE
	public Equipment createEquipment(EquipmentModel equip, Integer accountId, Integer equipGroup) {

		Equipment equipment = new Equipment();

		equipment.setEquipmentName(equip.getName());

		equipment.setUnit(equip.getUnit());

		Date date = new Date();
		
		EquipmentLog log = new EquipmentLog();
		log.setAction("Thêm mới");
		log.setStateDate(date);
		log.setStateDescription("Bình Thường");
//		log.setId(id);
		log.setEquipment(equipment);
		log.setCheckState(true);
		
		EquipmentGroup equipmentGroup = new EquipmentGroup();
		equipmentGroup.setId(equipGroup);
		
		equipment.setEquipmentGroup(equipmentGroup);
		
		equipment = equipmentRepository.save(equipment);

		log = equiplogService.createLog(log);
		
		Account acc = new Account();
		acc.setId(accountId);
		
		Records record = new Records();

		record.setRecordDate(date);
		record.setAction("Thêm thiết bị");
		record.setAccount(acc);

		record = recordService.createRecord(record);

		return equipment;
	}

	// READ
	public List<Equipment> getEquipment() {

		return equipmentRepository.findAll();
	}

	// DELETE
	public Equipment deleteEquipment(Integer id, Integer accountId) {

		Equipment equip = equipmentRepository.findById(id).get();
		Date date = new Date();
		EquipmentLog log = new EquipmentLog();
		log.setAction("Xóa");
		log.setStateDate(date);
		log.setStateDescription("Đã Xóa");
//		log.setId(id);
		log.setEquipment(equip);
		equipLogRepos.updateState(id);
		log.setCheckState(false);

		Account acc = new Account();
		acc.setId(accountId);
		log = equiplogService.createLog(log);

		Records record = new Records();

//		record.setId(accountId);
		record.setRecordDate(date);
		record.setAction("Xóa Thiết Bị");

		record.setAccount(acc);
		record = recordService.createRecord(record);

		log.setEquipment(equip);
		
		

		return equipmentRepository.save(equip);
	}

	// UPDATE
	public Equipment updateEquipment(EquipmentModel equipmentDetails,Integer equipId, Integer accountId) {

		Equipment equipment = equipmentRepository.findById(equipId).get();

		try {
			equipment.setEquipmentName(equipmentDetails.getName());

			equipment.setDescription(equipmentDetails.getDescription());

			equipment = equipmentRepository.save(equipment);

			Date date = new Date();
			Account acc = new Account();
			acc.setId(accountId);
			EquipmentLog log = new EquipmentLog();
			
			log.setAction("Chỉnh sửa");
			log.setStateDate(date);
			log.setStateDescription(equipmentDetails.getState_equipment());
			log.setEquipment(equipment);
			equipLogRepos.updateState(equipId);
			log.setCheckState(false);
			
			log.setCheckState(true);

			log = equiplogService.createLog(log);

			Records record = new Records();

			
			record.setRecordDate(date);
			record.setAction("Chỉnh sửa thiết bị");

			record.setAccount(acc);
			record = recordService.createRecord(record);
		}
		catch(Exception e) {
			System.out.println(e);
		}

		return equipment;
	}
	
	public List<IEquipment> getAllEquipment(){
		
		List<IEquipment> result = equipmentRepository.getAllEquip();
		
		return result;
		
	}
	
	public Equipment getEquip(Integer equipId) {
		
		Equipment equipment = equipmentRepository.findEquipById(equipId);
		
		return equipment;
	}
}
