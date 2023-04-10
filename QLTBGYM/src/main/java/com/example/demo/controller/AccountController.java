package com.example.demo.controller;

import java.util.List;
import java.util.Map;

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

import com.example.demo.domain.payload.CreateAccountRequest;
import com.example.demo.domain.payload.UserLoginRequest;
import com.example.demo.dto.AccountDTO;
import com.example.demo.entity.Account;
import com.example.demo.service.AccountService;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/account")
public class AccountController {

	@Autowired
	AccountService accountService;

	@PostMapping("/login")
	public ResponseEntity<Map<String, Boolean>> login(@RequestBody UserLoginRequest userRequest) {

		final Map<String, Boolean> result = accountService.login(userRequest.getUsername(), userRequest.getPassword());
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@PostMapping("/changePassword")
	public ResponseEntity<Account> changePass(@RequestParam Integer accountId,
			@RequestParam String oldPass, @RequestParam String newPass) {

		final Account result = accountService.changePassword(accountId, oldPass, newPass);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@PostMapping("/add")
	public ResponseEntity<Account> createAccount(@RequestBody CreateAccountRequest account) {

		final Account result = accountService.cretateAccount(account);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@PostMapping("/resetPass/{accountIdReset}/{accountId}")
	public ResponseEntity<Account> resetPass(@PathVariable Integer accountIdReset, @PathVariable Integer accountId) {

		final Account result = accountService.resetPassword(accountIdReset, accountId);
		return new ResponseEntity<>(result, HttpStatus.OK);

	}

	@PostMapping("/setStatus/{isActive}/{accountId}")
	public ResponseEntity<Account> setStatus(@PathVariable Boolean isActive, @PathVariable Integer accountId) {

		final Account result = accountService.setStatus(isActive, accountId);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@GetMapping("/all")
	public ResponseEntity<List<AccountDTO>> getAllAccount() {

		final List<AccountDTO> result = accountService.getAllAccount();

		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@PostMapping("/changeRole")
	public ResponseEntity<Account> changeRoleAccount(@RequestParam Integer accountId, @RequestParam Integer roleId) {

		final Account result = accountService.changeRole(accountId, roleId);

		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	@GetMapping("/getAccount/{username}")

	public ResponseEntity<AccountDTO> getAccount(@PathVariable String username) {

		final AccountDTO result = accountService.getUser(username);

		return new ResponseEntity<>(result, HttpStatus.OK);
	}

}
