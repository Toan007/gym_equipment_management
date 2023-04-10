package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.ReceiptDetail;
import com.example.demo.entity.ReceiptDetailId;

@Repository
public interface ReceiptDetailRepository extends JpaRepository<ReceiptDetail,ReceiptDetailId>{
	
//	@Query("from ReceiptDetail where id.receipt.id:=receiptId")
//	public ReceiptDetail findReceiptDetailByID(Integer receiptId);
	 

}
