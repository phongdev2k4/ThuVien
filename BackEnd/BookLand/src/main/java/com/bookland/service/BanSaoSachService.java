package com.bookland.service;

import java.util.List;
import com.bookland.entity.BanSaoSach;

public interface BanSaoSachService {
  
	public List<BanSaoSach> finAll();

	public List<BanSaoSach> create(BanSaoSach bansaosach,int soluong);
    public BanSaoSach update(BanSaoSach banSaoSach);
	public void delete(int mabansaosach);
	public BanSaoSach findByMaVach(String maVach);
}
