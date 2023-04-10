package com.example.demo.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Account;
import com.example.demo.entity.Records;
import com.example.demo.entity.Suppliers;
import com.example.demo.model.SupplierModel;
import com.example.demo.repository.SuppliersRepository;

@Service
public class SuppliersService {
	@Autowired
	SuppliersRepository repository;
	
	@Autowired
	ReceiptService receiptService;
	
	@Autowired 
	RecordsService recordService;
	
	public Suppliers createSupplier(SupplierModel model, Integer accountId) {
		Suppliers supplier = repository.findSupplierByTaxId(model.getTaxId());
		if(supplier == null) {
		
			supplier  = new Suppliers();
			supplier.setName(model.getName());
			supplier.setTaxId(model.getTaxId());
			supplier.setAddress(model.getAddress());
			
			Date date = new Date();
			Account acc = new Account();
			acc.setId(accountId);
			Records record = new Records();
			
			record.setRecordDate(date);
			record.setAction("Thêm nhà cung cấp");
			record.setAccount(acc);
			
			record = recordService.createRecord(record);
	
		}
		else
		{
			System.out.println("TaxId is exist! ");
		}
		
		return repository.save(supplier);
	}
	
	public List<Suppliers> getAllSuppliers(){
		
		List<Suppliers> supplierList = new ArrayList<>();
		
		supplierList = repository.findAll();
			
		return supplierList;
	}
	
	public void deleteSupplier(Integer id, Integer accountId) {
		
		Boolean isExist = receiptService.CheckSupplierInReceipt(id);
		if(isExist)
		{
			System.out.println("Nhà cung cấp lập hoá đơn!");
		}
		else {
			repository.deleteById(id);
			
			Date date = new Date();
			Account acc = new Account();
			acc.setId(accountId);
			Records record = new Records();
			
			record.setRecordDate(date);
			record.setAction("Xóa nhà cung cấp");
			record.setAccount(acc);
			
			record = recordService.createRecord(record);
			
		}
			
			
	}
	
	public Suppliers updateSupplier(Integer accountId,Integer id, SupplierModel details) {
		
		Suppliers supplier = repository.findById(id).get();
		
		Suppliers supp = repository.findSupplierByTaxId(details.getTaxId());
		if(supp != null && supp !=supplier){
			System.out.println("TaxId is exist!");
		}
		else
		{	supplier.setName(details.getName());
			
			supplier.setTaxId(details.getTaxId());
			
			supplier.setAddress(details.getAddress());
			
			Date date = new Date();
			Account acc = new Account();
			acc.setId(accountId);
			Records record = new Records();
			
			record.setRecordDate(date);
			record.setAction("Chỉnh sửa nhà cung cấp");
			record.setAccount(acc);
			
			record = recordService.createRecord(record);
		}

		return repository.save(supplier);
	}
	
	public Suppliers getSuppById(Integer id) {
		
		return repository.findSuppById(id);
	}
}
