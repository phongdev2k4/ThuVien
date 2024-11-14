package com.bookland.ServiceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bookland.dao.NhanVienDAO;
import com.bookland.dao.authorityDAO;
import com.bookland.dao.taiKhoanDAO;
import com.bookland.entity.Authority;
import com.bookland.entity.NhanVien;
import com.bookland.entity.TaiKhoan;
import com.bookland.service.NhanVienService;
import com.bookland.utils.ImageUtils;

import jakarta.transaction.Transactional;

@Service
public class NhanVienServiceImpl implements NhanVienService{
    
	@Autowired
	NhanVienDAO nhanVienDAO;
	@Autowired
	taiKhoanDAO taiKhoanDAO;
	@Autowired
	authorityDAO authorityDAO;
	@Override
	public List<NhanVien> finAll() {
		List<NhanVien> nhanViens=nhanVienDAO.findAll();
		return nhanViens;
	}

	@Override
	public NhanVien create(NhanVien nhanVien, MultipartFile file) {
		if (file != null && !file.isEmpty()) {
			try {
				nhanVien.setHinhAnhNV(ImageUtils.saveImage(file, "staff"));
			} catch (Exception e) {
				e.printStackTrace();
			}
			TaiKhoan saveTaiKhoan=taiKhoanDAO.save(nhanVien.getTaiKhoanNV());	
			for(Authority authority: nhanVien.getTaiKhoanNV().getAuthorities()) {
				authority.setTaiKhoan(saveTaiKhoan);
				Authority saveauthority=authorityDAO.save(authority);
			}
			NhanVien saveNhanVien=nhanVienDAO.save(nhanVien);
			
			return saveNhanVien;
		}else {
			TaiKhoan saveTaiKhoan=taiKhoanDAO.save(nhanVien.getTaiKhoanNV());	
			for(Authority authority: nhanVien.getTaiKhoanNV().getAuthorities()) {
				authority.setTaiKhoan(saveTaiKhoan);
				Authority saveauthority=authorityDAO.save(authority);
			}
			NhanVien saveNhanVien=nhanVienDAO.save(nhanVien);
			
			return saveNhanVien;
		}
		
	}


	@Override
	@Transactional
	public void delete(String maNhanVien) {
		authorityDAO.deleteByTaiKhoanUserName(maNhanVien);
		nhanVienDAO.deleteById(maNhanVien);
		taiKhoanDAO.deleteById(maNhanVien);
		
	}

	@Override
	@Transactional
	public NhanVien update(NhanVien nhanVien, MultipartFile file) {
		if (file != null && !file.isEmpty()) {
			try {
				nhanVien.setHinhAnhNV(ImageUtils.saveImage(file, "staff"));
			} catch (Exception e) {
				e.printStackTrace();
			}
			TaiKhoan saveTaiKhoan=taiKhoanDAO.save(nhanVien.getTaiKhoanNV());
			authorityDAO.deleteByTaiKhoanUserName(nhanVien.getTaiKhoanNV().getUserName());
			for(Authority authority: nhanVien.getTaiKhoanNV().getAuthorities()) {
				authority.setTaiKhoan(saveTaiKhoan);
				Authority saveauthority=authorityDAO.save(authority);
			}
			NhanVien saveNhanVien=nhanVienDAO.save(nhanVien);
			
			return saveNhanVien;
		}else {
			TaiKhoan saveTaiKhoan=taiKhoanDAO.save(nhanVien.getTaiKhoanNV());
			authorityDAO.deleteByTaiKhoanUserName(nhanVien.getTaiKhoanNV().getUserName());
			for(Authority authority: nhanVien.getTaiKhoanNV().getAuthorities()) {
				authority.setTaiKhoan(saveTaiKhoan);
				Authority saveauthority=authorityDAO.save(authority);
			}
			NhanVien saveNhanVien=nhanVienDAO.save(nhanVien);
			
			return saveNhanVien;
		}
		
	}


}
