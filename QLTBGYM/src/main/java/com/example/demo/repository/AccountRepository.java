package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Account;

public interface AccountRepository extends JpaRepository<Account,Integer>{
	 
	@Query("from Account where username=:username")
	public Account findAccountByUserName(String username);
	
	@Query("from Account where password=:password")
	public Account findUserAccountByPassword(String password);
	
	@Query("from Account where id=:id")
	public Account findAccountById(Integer id );
}
