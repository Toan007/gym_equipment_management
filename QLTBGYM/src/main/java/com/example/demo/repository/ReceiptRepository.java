package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Receipt;

@Repository
public interface ReceiptRepository extends JpaRepository<Receipt,Integer>{
	
	@Query("from Receipt where suppliers.id=:supplierId")
	public Receipt FindSupplierInReceipt(Integer supplierId);

	@Query("SELECT receipt from Receipt receipt where id=:receiptId")
	public Receipt FindReceiptInReceipt(Integer receiptId);

}
