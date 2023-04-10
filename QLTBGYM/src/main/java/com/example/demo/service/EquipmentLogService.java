package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.common.Utility;
import com.example.demo.dto.EquipmentLogDTO;
import com.example.demo.entity.Equipment;
import com.example.demo.entity.EquipmentLog;
import com.example.demo.repository.EquipmentLogRepository;

@Service
public class EquipmentLogService {

	@Autowired
	EquipmentLogRepository repository;

	public EquipmentLog createLog(EquipmentLog log) {

		return repository.save(log);
	}

	public List<EquipmentLogDTO> getEquipLog() {

		List<EquipmentLog> equipLog = new ArrayList<>();

		equipLog = repository.findAll();

		EquipmentLogDTO dto = null;

		List<EquipmentLogDTO> result = new ArrayList<>();

		for (EquipmentLog equipmentLog : equipLog) {

			dto = new EquipmentLogDTO();
			Equipment equipment = equipmentLog.getEquipment();

			dto.setEquipmentName(equipment.getEquipmentName());

			dto.setEquipmentId(equipmentLog.getId());

			dto.setState(equipmentLog.getStateDescription());

			dto.setAction(equipmentLog.getAction());

			dto.setDate(equipmentLog.getStateDate().toString());

			result.add(dto);
		}
		return result;
	}
}
