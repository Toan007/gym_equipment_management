package com.example.demo.service;

import java.text.ParseException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.common.Utility;
import com.example.demo.dto.StaffDTO;
import com.example.demo.entity.Account;
import com.example.demo.entity.Staff;
import com.example.demo.repository.StaffRepository;

@Service
public class StaffService {
	@Autowired
	StaffRepository staffRepository;

	public Staff createStaff(Staff staff) {

		return staffRepository.save(staff);
	}

	public Staff updateStaff(StaffDTO detail, Integer staffId) throws ParseException {

		Staff staffs = staffRepository.findById(staffId).get();
		
		Staff temp = staffRepository.findidCodeStaff(detail.getCMND());
		if (temp != null && temp != staffs) {
			return null;

		} else {
			Account account = staffs.getAccount();

			staffs.setBirthDate(Utility.convertDateStringToDate(detail.getDate()));

			staffs.setFirstName(detail.getFirstName());

			staffs.setLastName(detail.getLastName());

			staffs.setId_code(detail.getCMND());

			account.setAvatar(detail.getAvatar());
		}

		return staffRepository.save(staffs);
	}

	public StaffDTO getProfile(Integer accountId) {
		Staff staff = new Staff();
		staff = staffRepository.findStaffByAcounntId(accountId);

		Account account = staff.getAccount();

		StaffDTO dto = new StaffDTO();

		dto.setStaffId(staff.getId());

		dto.setFirstName(staff.getFirstName());

		dto.setLastName(staff.getLastName());

		dto.setCMND(staff.getId_code());

		dto.setDate(Utility.convertFullDateToShortDate(staff.getBirthDate()));

		dto.setAvatar(account.getAvatar());

		return dto;

	}

	public Boolean changeAvatar() {

		return true;
	}

}
