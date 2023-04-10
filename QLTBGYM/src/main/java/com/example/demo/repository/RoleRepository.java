package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Role;
import com.example.demo.entity.Suppliers;

@Repository
public interface RoleRepository extends JpaRepository<Role,Integer>{
	 

	@Query("from Role where roleId=:roleId")
	public Role findRoleById(Integer roleId);
}