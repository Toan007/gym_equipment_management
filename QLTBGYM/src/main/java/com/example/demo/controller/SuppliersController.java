package com.example.demo.controller;

import java.util.List;

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

import com.example.demo.entity.Suppliers;
import com.example.demo.model.SupplierModel;
import com.example.demo.service.SuppliersService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/suppliers")
public class SuppliersController {
	@Autowired
	SuppliersService supplierService;
	
	
	@PostMapping("/create")
	public ResponseEntity<Suppliers> createSuppliers(@RequestBody SupplierModel model,@RequestParam Integer accountId){
		
		final Suppliers result = supplierService.createSupplier(model ,accountId);
		
		return new ResponseEntity<>(result,HttpStatus.OK);
	}
	
	@GetMapping("/all")
	public ResponseEntity<List<Suppliers>> getAllSupp()
	{
		final List<Suppliers> result = supplierService.getAllSuppliers();
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@PostMapping("/update/{id}/{accountId}")
	public ResponseEntity<Suppliers> updateSupp(@PathVariable Integer accountId,@PathVariable Integer id, @RequestBody SupplierModel supp){
		
		final Suppliers result = supplierService.updateSupplier(accountId, id, supp);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@DeleteMapping("/delete/{id}/{accountId}")
	public void deleteSuppliers(@PathVariable Integer id, @PathVariable Integer accountId){
		
		 supplierService.deleteSupplier(id,accountId);
	}
}
