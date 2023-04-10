package com.example.demo.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.common.Utility;
import com.example.demo.domain.payload.CreateAccountRequest;
import com.example.demo.dto.AccountDTO;
import com.example.demo.entity.Account;
import com.example.demo.entity.Records;
import com.example.demo.entity.Role;
import com.example.demo.entity.Staff;
import com.example.demo.model.AccountModel;
import com.example.demo.repository.AccountRepository;
import com.example.demo.repository.RoleRepository;

@Service
public class AccountService {

	@Autowired
	AccountRepository repository;
	
	@Autowired
	StaffService staffService;
	
	@Autowired
	RecordsService recordService;
	
	@Autowired
	RoleRepository roleRepos;

	public Account cretateAccount(CreateAccountRequest acc) {
		
		Staff staff = new Staff();
		staff.setFirstName(acc.getStaff().getFirstName());
		staff.setLastName(acc.getStaff().getLastName());
		staff.setBirthDate(acc.getStaff().getBirthDate());
		staff.setId_code(acc.getStaff().getIdCode());
		staff = staffService.createStaff(staff);
		
		Account account = new Account();
		account.setUsername(acc.getAccount().getUsername());
		account.setPassword("123456");
		account.setActive(true);
		account.setAvatar(null);
		
		Role role = new Role();
		role.setRoleId(acc.getAccount().getRoleId());
		
		
		account.setRole(role);
		
		account.setStaff(staff);
		
		Date date = new Date();
		
		account = repository.save(account);
		
		
		Records record = new Records();
		
		record.setRecordDate(date);
		record.setAction("Thêm tài khoản");
		record.setAccount(account);
		
		record = recordService.createRecord(record);
		
		return account;
	}

	public Account resetPassword(Integer accountIdReset, Integer accountId) {
		Account acc = repository.findById(accountIdReset).get();

		acc.setPassword("123456");
		Date date = new Date();
		Account account = new Account();
		account.setId(accountId);
		Records record = new Records();
		
		record.setRecordDate(date);
		record.setAction("Đặt lại mật khẩu");
		record.setAccount(account);
		
		record = recordService.createRecord(record);
		
		return repository.save(acc);
	}

	public Account setStatus(Boolean isActive, Integer id) {

		Account acc = repository.findById(id).get();

		acc.setActive(isActive);
		return repository.save(acc);
	}
	

	public Account changePassword(Integer id, String oldPass,String newPass) {

		Account acc = repository.findById(id).get();
		if (acc.getPassword().equals(oldPass)) {
			acc.setPassword(newPass);
		}
		return repository.save(acc);
	}

	public Map<String, Boolean> login(String username, String password) {
		Map<String, Boolean> result = new HashMap<>();
		Account acc = repository.findAccountByUserName(username);
		
		if(acc == null) {
			result.put("userExist", false);
			return result;
		}
		result.put("userExist", true);
		if (!acc.getActive()) {
			result.putIfAbsent("isValid", false);
			return result;
		}
		result.put("isValid", true);
//		Account accwithpwd = repository.findUserAccountByPassword(password);
		
		if (acc.getPassword().equals(password)) {
			result.put("password", true);
		} else {
			result.put("password", false);
		}
		return result;
	}
	
	public AccountDTO getUser(String username) {
			
		Account foundAccount = repository.findAccountByUserName(username);
		foundAccount.setPassword(null);
		AccountDTO dto = new AccountDTO();
		
		Role role = foundAccount.getRole();
		
		dto.setActive(foundAccount.getActive());
		dto.setUsername(foundAccount.getUsername());
		dto.setId(foundAccount.getId());
		dto.setRoleName(role.getRoleName());
		
		return dto;
	}
	
	public List<AccountDTO> getAllAccount(){
		
		List<Account> accList = new ArrayList<>();
		
		accList = repository.findAll();
		AccountDTO dto = null;
		List<AccountDTO> result = new ArrayList<>();
		for(Account account: accList) {
			dto = new AccountDTO();
			dto.setId(account.getId());
		
			dto.setActive(account.getActive());
			dto.setUsername(account.getUsername());
			Staff staff = account.getStaff();
			
			dto.setBirthDate(Utility.convertFullDateToShortDate(staff.getBirthDate()));
			dto.setId_code(staff.getId_code());
			dto.setFirstName(staff.getFirstName());
			dto.setLastName(staff.getLastName());
			
			Role role = account.getRole();
			dto.setRoleName(role.getRoleName());
			
			result.add(dto);
		}
		
		return result;
		
	}
	
	public Account changeRole(Integer id, Integer roleId) {
		
		Account acc = repository.findById(id).get();
		
		Role role = roleRepos.findRoleById(roleId);	
		
		acc.setRole(role);
		
		
		return repository.save(acc);
	}
}
