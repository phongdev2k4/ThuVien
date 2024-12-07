package com.bookland.service;

import java.util.List;

import com.bookland.entity.Kho;

public interface KhoService {
 public List<Kho> finAll();
 public Kho create(Kho kho);
 public void delete(int makho);
}
