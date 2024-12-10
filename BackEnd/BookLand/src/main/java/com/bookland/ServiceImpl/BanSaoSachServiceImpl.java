package com.bookland.ServiceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bookland.dao.BanSaoSachDAO;
import com.bookland.entity.BanSaoSach;
import com.bookland.service.BanSaoSachService;
import com.bookland.utils.BarcodeGeneratorUtils;
@Service
public class BanSaoSachServiceImpl implements BanSaoSachService {
    @Autowired
    BanSaoSachDAO banSaoSachDAO;
    
    
	@Override
	public List<BanSaoSach> finAll() {
		List<BanSaoSach> banSaoSachs=banSaoSachDAO.findAll();
		return banSaoSachs;
	}


	@Override
	public void delete(int mabansaosach) {
		banSaoSachDAO.deleteById(mabansaosach);
		
	}

	@Override
	public List<BanSaoSach> create(BanSaoSach bansaosach, int soluong) {
		List<BanSaoSach> createdBanSaoSachs = new ArrayList<>();
		for(int i=0;i<soluong;i++ ) {
			Integer maxMaBanSaoSach = banSaoSachDAO.findMaxMaBanSaoSach();
		    int number = (maxMaBanSaoSach != null) ? maxMaBanSaoSach + 1 : 1; 
			String formatted = String.format("%011d", number);
			String machecksum = BarcodeGeneratorUtils.generateFullUPC(formatted);
			String nameimae=BarcodeGeneratorUtils.generateBarcode(machecksum, "Bookland/Barcode");  
			bansaosach.setHinhAnhMaVach(nameimae);
			bansaosach.setMaVach(machecksum);
			
	        // Tạo bản sao mới từ bản sao gốc
	        BanSaoSach newBanSaoSach = new BanSaoSach();
	        newBanSaoSach.setHinhAnhMaVach(nameimae);
	        newBanSaoSach.setMaVach(machecksum);
	        newBanSaoSach.setSach(bansaosach.getSach());
	        newBanSaoSach.setKho(bansaosach.getKho());
	        newBanSaoSach.setTrangThaiMuon(bansaosach.getTrangThaiMuon());
	        newBanSaoSach.setTrangThaiBaoQuan(bansaosach.getTrangThaiBaoQuan());
	     
			createdBanSaoSachs.add(banSaoSachDAO.save(newBanSaoSach));
		}
		  return createdBanSaoSachs; // Trả về danh sách các bản sao đã được tạo
	}


	@Override
	public BanSaoSach update(BanSaoSach banSaoSach) {
		return banSaoSachDAO.save(banSaoSach);
	}


	@Override
	public BanSaoSach findByMaVach(String maVach) {	
		BanSaoSach bss =  banSaoSachDAO.findByMaVach(maVach);
		long sl = 0 ;
		sl =banSaoSachDAO.countByMaSachAndTrangThaiMuon(bss.getSach().getMaSach(),"Có sẵn","Mới");
		bss.setSoLuong123(sl);//
		return bss;
	}


}
