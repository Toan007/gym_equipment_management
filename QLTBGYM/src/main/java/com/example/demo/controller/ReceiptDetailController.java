package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ReceiptDetailDTO;
import com.example.demo.entity.ReceiptDetail;
import com.example.demo.model.ReceiptDetailModel;
import com.example.demo.service.ReceiptDetailService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/receiptdetail")
public class ReceiptDetailController {
	
	@Autowired
	ReceiptDetailService receiptDetailService;
	
	
	@PostMapping("/create")
	public ResponseEntity<List<ReceiptDetail>> createReceiptDetail(@RequestBody ReceiptDetailModel model, @RequestParam Integer accountId, @RequestParam Integer equipGroup){
		
		final List<ReceiptDetail> result = receiptDetailService.createReceiptDetail(model, accountId, equipGroup);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@GetMapping("/all/{receiptId}")
	public ResponseEntity<List<ReceiptDetailDTO>> getAllReceiptDetail(@PathVariable Integer receiptId){
		
		final List<ReceiptDetailDTO> result = receiptDetailService.getReceiptDetail(receiptId);
		
		return new ResponseEntity<>(result, HttpStatus.OK);
		
		
	}

}
