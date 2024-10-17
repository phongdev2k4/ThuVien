package com.bookland.service;

import java.util.List;
import java.util.Optional;

import com.bookland.entity.TacGia;

public interface TacGiaService {

	public List<TacGia> finAll();

	public TacGia finById(String id);

	public TacGia create(TacGia tacGia);

	public void delete(String matg);


}
