package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ReceiptDetailDTO;
import com.example.demo.entity.Equipment;
import com.example.demo.entity.Receipt;
import com.example.demo.entity.ReceiptDetail;
import com.example.demo.entity.ReceiptDetailId;
import com.example.demo.model.ReceiptDetailModel;
import com.example.demo.repository.EquipmentRepository;
import com.example.demo.repository.ReceiptDetailRepository;
import com.example.demo.repository.ReceiptRepository;

@Service
public class ReceiptDetailService {

	@Autowired
	ReceiptDetailRepository repository;

	@Autowired
	ReceiptService receiptService;

	@Autowired
	EquipmentService equipmentService;

	@Autowired
	EquipmentRepository equipmentRepos;

	@Autowired
	ReceiptRepository receiptRepos;

	public List<ReceiptDetail> createReceiptDetail(ReceiptDetailModel model, Integer accountId, Integer equipGroup) {

		List<ReceiptDetail> receiptDetailList = new ArrayList<>();

		Receipt receipt = null;

		Equipment equip = null;

		Double total_price = Double.valueOf(model.getItemPrice() * model.getQuantity());
		receipt = receiptService.createReceipt(model.getReceipt(), accountId, total_price);

		for (int i = 0; i < model.getQuantity(); i++) {

			equip = equipmentService.createEquipment(model.getEquipment(), accountId, equipGroup);

			ReceiptDetail receiptDetail = new ReceiptDetail();
			receiptDetail.setItemPrice(model.getItemPrice());
			receiptDetail.setQuantity(model.getQuantity());

			ReceiptDetailId receiptDetailId = new ReceiptDetailId();
			receiptDetailId.setEquipment(equip);
			receiptDetailId.setReceipt(receipt);

			receiptDetail.setId(receiptDetailId);

			receiptDetailList.add(receiptDetail);
		}

		return repository.saveAll(receiptDetailList);
	}

	public List<ReceiptDetailDTO> getReceiptDetail(Integer receiptId){
		
		List<ReceiptDetail> list = new ArrayList<>();
		
		list = repository.findAll();
		
		ReceiptDetailDTO dto = null;
		
		List<ReceiptDetailDTO> result = new ArrayList<>();
		
		for(ReceiptDetail detail:list) {
			if(detail.getId().getReceipt().getId() == receiptId) {
				dto = new ReceiptDetailDTO();
			
			dto.setItemPrice(detail.getItemPrice());
			
			dto.setQuantity(detail.getQuantity());
			
			Equipment equip = detail.getId().getEquipment();
			
			dto.setEquipName(equip.getEquipmentName());
			
			
			Receipt receipt = detail.getId().getReceipt();
			
			dto.setTotal(receipt.getTotalPrice());
			
			dto.setUnit(equip.getUnit());
			
			result.add(dto);
			}						
		}
		return result;
	}

}
