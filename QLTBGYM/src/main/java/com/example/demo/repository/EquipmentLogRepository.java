package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.EquipmentLog;

@Repository
public interface EquipmentLogRepository extends JpaRepository<EquipmentLog,Integer>{
	 
	@Transactional
	@Modifying
	@Query("update EquipmentLog set checkState = false where equipment.id=:equipId")
	public void updateState(Integer equipId);
}
