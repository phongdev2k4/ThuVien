package com.bookland.service;

import java.util.List;

import com.bookland.entity.*;

public interface SachService {

	public List<Sach> finAll();

	public Sach create(Sach sach);

	public void delete(String masach);
}
