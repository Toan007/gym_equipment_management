package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.domain.payload.IEquipment;
import com.example.demo.entity.Equipment;

public interface EquipmentRepository extends JpaRepository<Equipment,Integer>{
	 

	@Query(nativeQuery = true, value = "SELECT equipment.id as equipmentId, equipment.equipment_name as equipmentName, receipt.receipt_date as receiptDate, suppliers.name as name, equipment.description as description, equipment_log.state_description as stateDescription FROM qltb_gym.equipment, qltb_gym.receipt, qltb_gym.equipment_log, qltb_gym.suppliers, qltb_gym.receipt_detail WHERE receipt.supplier_id = suppliers.id and equipment.id = equipment_log.equiment_id and receipt.id = receipt_detail.receipt_id and receipt_detail.equipment_id = equipment.id and equipment_log.check_state = 1 order by receipt.receipt_date DESC")
	public List<IEquipment> getAllEquip();
	
	@Query("FROM Equipment where id=:equipId")
	public Equipment findEquipById(Integer equipId);
	

}

