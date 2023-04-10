package com.example.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ReceiptDTO;
import com.example.demo.entity.Receipt;
import com.example.demo.entity.Suppliers;
import com.example.demo.model.ReceiptModel;
import com.example.demo.service.ReceiptService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/receipt")
public class ReceiptController {
	
	@Autowired
	ReceiptService receiptService;
	
	@PostMapping("/update/{receiptId}/{accountId}")
	public ResponseEntity<Receipt> updateReceipt( @RequestBody ReceiptModel receipt, @PathVariable Integer receiptId, @PathVariable Integer accountId){
		
		final Receipt result = receiptService.updateReceipt( receipt,receiptId, accountId);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
//	@PostMapping("/add")
//	public ResponseEntity<Receipt> createReceipt(@RequestBody ReceiptModel receipt, @RequestParam Integer accountId){
//		
//		final Receipt result = receiptService.createReceipt(receipt, accountId);
//		
//		return new ResponseEntity<>(result, HttpStatus.OK);
//	}

	
	@DeleteMapping("/delete/{id}")
	public void deleteReceipt(@PathVariable Integer id, @RequestParam Integer accountId) {
		
		receiptService.deleteReceipt(id, accountId);
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<ReceiptDTO>> getAllReceipt(){
		
		final List<ReceiptDTO> result = receiptService.getAllReceipt();
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@GetMapping("/get/{receiptId}")
	public ResponseEntity<Receipt> getReceipt(@PathVariable Integer receiptId){

		final Receipt result = receiptService.getReceiptById(receiptId);
		Suppliers suppliers = result.getSuppliers();
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@GetMapping("/info-receipt/{receiptId}")
	public ResponseEntity<Map<String,String>> infoReceipt(@PathVariable Integer receiptId){
		
		final Map<String, String> result = receiptService.getInfoReceipt(receiptId);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
		
		
	}
	
	
}
