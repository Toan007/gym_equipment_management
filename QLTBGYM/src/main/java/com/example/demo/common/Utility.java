package com.example.demo.common;

import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Utility {

	public static String convertFullDateToShortDate(Date date) {

		DateFormat df = new SimpleDateFormat("MM-dd-yyyy");
		return df.format(date);
	}

	
	public static Date convertDateStringToDate(String date) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSSS");
	
        return formatter.parse(date);
	}
	public static String formatFullDate(Date date) {

		DateFormat df = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
		return df.format(date);
	}

	public static String priceWithoutDecimal(Double price) {
		DecimalFormat formatter = new DecimalFormat("###,###,###");

		return formatter.format(price);
	}
}
