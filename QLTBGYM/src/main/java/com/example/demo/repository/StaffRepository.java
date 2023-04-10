package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Staff;

@Repository
public interface StaffRepository extends JpaRepository<Staff,Integer>{
	 
	@Query("from Staff where id_code=:id_code")
	public Staff findidCodeStaff(String id_code);
	
	@Query("from Staff staff where account.id =:accountId")
	public Staff findStaffByAcounntId(Integer accountId);

}
