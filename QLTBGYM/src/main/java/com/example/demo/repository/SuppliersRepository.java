package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Suppliers;

@Repository
public interface SuppliersRepository extends JpaRepository<Suppliers,Integer>{
	 
	@Query("from Suppliers where taxId =:taxId")
	public Suppliers findSupplierByTaxId(String taxId);
	
	@Query("from Suppliers where id=:supplierId")
	public Suppliers findSuppById(Integer supplierId);
	
}
