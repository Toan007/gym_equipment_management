package com.example.demo.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.common.Utility;
import com.example.demo.dto.ReceiptDTO;
import com.example.demo.entity.Account;
import com.example.demo.entity.Receipt;
import com.example.demo.entity.Records;
import com.example.demo.entity.Suppliers;
import com.example.demo.model.ReceiptModel;
import com.example.demo.repository.AccountRepository;
import com.example.demo.repository.ReceiptRepository;
import com.example.demo.repository.SuppliersRepository;

@Service

public class ReceiptService {

	@Autowired
	ReceiptRepository repository;

	@Autowired
	RecordsService recordService;

	@Autowired
	SuppliersRepository suppRepos;

	@Autowired
	AccountRepository accountRepository;
	public Receipt createReceipt(ReceiptModel receiptDetails, Integer accountId, Double total_price) {

		Receipt receipt = new Receipt();

		receipt.setReceiptDate(receiptDetails.getReceiptDate());

		Suppliers supp = new Suppliers();
		supp.setId(receiptDetails.getSupplier().getId());

		receipt.setSuppliers(supp);

		receipt.setTotalPrice(total_price);
		
		Records record = new Records();
		Date date = new Date();
		
		Account acc = accountRepository.findAccountById(accountId);
		acc.setId(accountId);
		record.setRecordDate(date);
		record.setAction("Thêm hóa đơn");
		
		record.setAccount(acc);

		record = recordService.createRecord(record);
		
		
		receipt.setAccount(acc);
		
		return repository.save(receipt);
	}

	public void deleteReceipt(Integer id, Integer accountId) {
		
		Records record = new Records();
		Date date = new Date();
		
		Account acc = new Account();
		acc.setId(accountId);
		
		record.setRecordDate(date);
		record.setAction("Xóa hóa đơn");
		
		record.setAccount(acc);

		record = recordService.createRecord(record);

		repository.deleteById(id);
	}

	public List<ReceiptDTO> getAllReceipt() {
		
		List<Receipt> receiptList = new ArrayList<>();
		
		receiptList = repository.findAll();
		
		List<ReceiptDTO> result = new ArrayList<>();
		
		ReceiptDTO dto = null;
		
		for(Receipt receipt: receiptList) {
			
			dto = new ReceiptDTO();
			
			Suppliers supplier = receipt.getSuppliers();
			
			dto.setReceiptId(receipt.getId());
			
			dto.setDate(receipt.getReceiptDate().toString());
			
			dto.setSuppName(supplier.getName());
			
			dto.setTotal(Utility.priceWithoutDecimal(receipt.getTotalPrice()));
			
			result.add(dto);
		}
		
		return result;
	}

	public Receipt updateReceipt(ReceiptModel details, Integer receiptId, Integer accountId) {

		Receipt receipt = repository.findById(receiptId).get();

		receipt.setReceiptDate(details.getReceiptDate());

		Suppliers supp = new Suppliers();

		supp.setId(details.getSupplier().getId());
		supp = suppRepos.findSuppById(supp.getId());
		receipt.setSuppliers(supp);
		
		Date date = new Date();
		Account acc = new Account();
		acc.setId(accountId);

		Records record = new Records();

		record.setRecordDate(date);
		record.setAction("Chỉnh sửa hóa đơn");
		record.setAccount(acc);

		record = recordService.createRecord(record);
		return repository.save(receipt);
	}

	public Boolean CheckSupplierInReceipt(Integer id) {

		Receipt repceipt = repository.FindSupplierInReceipt(id);
		if (repceipt != null)
			return true;
		else
			return false;
	}
	
	public Receipt getReceiptById(Integer receiptId) {
		
		Receipt receipt = repository.FindReceiptInReceipt(receiptId);
		
		return receipt;
	}
	
	public Map<String, String> getInfoReceipt(Integer ReceiptId){
		
		Receipt receipt = repository.findById(ReceiptId).get();
		
		Suppliers supp = receipt.getSuppliers();
		
		Map<String, String> result = new HashMap<>();
		
		result.put("receiptID", receipt.getId().toString());
		
		result.put("receiptDate", receipt.getReceiptDate().toString());
		
		result.put("supplierName", supp.getName());
		
		result.put("supplierID", supp.getId().toString());
		
		return result;
		
		
	}
	
	
}
