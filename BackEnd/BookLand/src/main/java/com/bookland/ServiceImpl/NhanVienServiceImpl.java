package com.bookland.ServiceImpl;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bookland.dao.nhanVienDAO;
import com.bookland.dao.authorityDAO;
import com.bookland.dao.taiKhoanDAO;
import com.bookland.entity.Authority;
import com.bookland.entity.HoiVien;
import com.bookland.entity.NhanVien;
import com.bookland.entity.TaiKhoan;
import com.bookland.service.NhanVienService;
import com.bookland.utils.CloudinaryUtils;
import com.bookland.utils.ImageUtils;

import jakarta.transaction.Transactional;

@Service
public class NhanVienServiceImpl implements NhanVienService {

	@Autowired
	nhanVienDAO nhanVienDAO;
	@Autowired
	taiKhoanDAO taiKhoanDAO;
	@Autowired
	authorityDAO authorityDAO;
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public List<NhanVien> finAll() {
		List<NhanVien> nhanViens = nhanVienDAO.findAll();
		return nhanViens;
	}

	@Override
	public NhanVien create(NhanVien nhanVien, MultipartFile file) {
		if (file != null && !file.isEmpty()) {
			try {
				String linkanh_key = CloudinaryUtils.uploadImage(file, "Bookland/NhanVien");
				nhanVien.setHinhAnhNV(linkanh_key);
			} catch (Exception e) {
				e.printStackTrace();
			}

			nhanVien.getTaiKhoanNV().setPassword(passwordEncoder.encode(nhanVien.getTaiKhoanNV().getPassword()));
			TaiKhoan saveTaiKhoan = taiKhoanDAO.save(nhanVien.getTaiKhoanNV());
			for (Authority authority : nhanVien.getTaiKhoanNV().getAuthorities()) {
				authority.setTaiKhoan(saveTaiKhoan);
				Authority saveauthority = authorityDAO.save(authority);
			}
			Integer maxMaNV=nhanVienDAO.findMaxMaNVNumber();
			String newMaNV = null;
			if (maxMaNV != null) {
			    newMaNV = "nv" + (maxMaNV + 1);
			} else {
			    // Nếu maxMaNV là null, có thể đặt một giá trị mặc định
			    newMaNV = "nv1";  
			}
			nhanVien.setMaNV(newMaNV);
			NhanVien saveNhanVien = nhanVienDAO.save(nhanVien);
			return saveNhanVien;
		} else {
			Integer maxMaNV=nhanVienDAO.findMaxMaNVNumber();
			String newMaNV = null;
			if (maxMaNV != null) {
			    newMaNV = "nv" + (maxMaNV + 1);
			} else {
			    // Nếu maxMaNV là null, có thể đặt một giá trị mặc định
			    newMaNV = "nv1";  
			}
			nhanVien.setMaNV(newMaNV);
			nhanVien.getTaiKhoanNV().setPassword(passwordEncoder.encode(nhanVien.getTaiKhoanNV().getPassword()));
			TaiKhoan saveTaiKhoan = taiKhoanDAO.save(nhanVien.getTaiKhoanNV());
			for (Authority authority : nhanVien.getTaiKhoanNV().getAuthorities()) {
				authority.setTaiKhoan(saveTaiKhoan);
				Authority saveauthority = authorityDAO.save(authority);
			}
			NhanVien saveNhanVien = nhanVienDAO.save(nhanVien);

			return saveNhanVien;
		}

	}

	@Override
	@Transactional
	public void delete(String maNhanVien) {
		NhanVien nhanVien=nhanVienDAO.findById(maNhanVien).get();
		authorityDAO.deleteByTaiKhoanUserName(nhanVien.getTaiKhoanNV().getUserName());
		nhanVienDAO.deleteById(maNhanVien);
		taiKhoanDAO.deleteById(nhanVien.getTaiKhoanNV().getUserName());

	}

	@Override
	@Transactional
	public NhanVien update(NhanVien nhanVien, MultipartFile file) {
		String userName=nhanVien.getTaiKhoanNV().getUserName();
		Optional<TaiKhoan> tk = taiKhoanDAO.findById(userName);
		NhanVien nv=nhanVienDAO.findByTaiKhoanId(userName);
		String mkhientai=tk.get().getPassword();
		if(!mkhientai.equalsIgnoreCase(nhanVien.getTaiKhoanNV().getPassword())) {
		 nhanVien.getTaiKhoanNV().setPassword(passwordEncoder.encode(nhanVien.getTaiKhoanNV().getPassword()));
		}
		if (file != null && !file.isEmpty()) {
			try {
				if(nhanVien.getHinhAnhNV()!=null) {
					if(nv.getHinhAnhNV().equals("")) {
						String linkanh_key = CloudinaryUtils.uploadImage(file, "Bookland/NhanVien");
						nhanVien.setHinhAnhNV(linkanh_key);
					}else {
						String keyAnh=nhanVien.getHinhAnhNV().split(",")[1];
						CloudinaryUtils.deleteImage(keyAnh);
						String linkanh_key = CloudinaryUtils.uploadImage(file, "Bookland/NhanVien");
						nhanVien.setHinhAnhNV(linkanh_key);
					}

				}else {
					String linkanh_key = CloudinaryUtils.uploadImage(file, "Bookland/NhanVien");
					nhanVien.setHinhAnhNV(linkanh_key);
				}

			} catch (Exception e) {
				e.printStackTrace();
			}
			TaiKhoan saveTaiKhoan = taiKhoanDAO.save(nhanVien.getTaiKhoanNV());
			authorityDAO.deleteByTaiKhoanUserName(nhanVien.getTaiKhoanNV().getUserName());
			for (Authority authority : nhanVien.getTaiKhoanNV().getAuthorities()) {
				authority.setTaiKhoan(saveTaiKhoan);
				Authority saveauthority = authorityDAO.save(authority);
			}
			NhanVien saveNhanVien = nhanVienDAO.save(nhanVien);

			return saveNhanVien;
		} else {
			TaiKhoan saveTaiKhoan = taiKhoanDAO.save(nhanVien.getTaiKhoanNV());
			authorityDAO.deleteByTaiKhoanUserName(nhanVien.getTaiKhoanNV().getUserName());
			for (Authority authority : nhanVien.getTaiKhoanNV().getAuthorities()) {
				authority.setTaiKhoan(saveTaiKhoan);
				Authority saveauthority = authorityDAO.save(authority);
			}
			NhanVien saveNhanVien = nhanVienDAO.save(nhanVien);

			return saveNhanVien;
		}

	}

    @Override
    public Page<NhanVien> searchNhanViens(String keyword, Pageable pageable) {
        
        return nhanVienDAO.searchNhanViens(keyword, pageable);
    }

	@Override
	public NhanVien finByUserName(String username) {
         return nhanVienDAO.findByTaiKhoanId(username);
	}

	@Override
	public NhanVien updateNV(String userName, NhanVien nhanvien, MultipartFile file) {
		TaiKhoan tk=taiKhoanDAO.findByUserName(userName).get();
		NhanVien nhanvienv=nhanVienDAO.findByTaiKhoanId(userName);
		nhanvienv.setEmail(nhanvien.getEmail());
		nhanvienv.setHoTen(nhanvien.getHoTen());
		nhanvienv.setSoDienThoai(nhanvien.getSoDienThoai());
		nhanvienv.setDiaChi(nhanvien.getDiaChi());
		nhanvienv.setGioiTinh(nhanvien.getGioiTinh());
		nhanvienv.setNgaySinh(nhanvien.getNgaySinh());
		if (file != null && !file.isEmpty()) {
			String linkanh_key;
			try {
				if(nhanvienv.getHinhAnhNV()!=null) {
					if(nhanvienv.getHinhAnhNV().equals("")) {
						linkanh_key = CloudinaryUtils.uploadImage(file,"Bookland/NhanVien");
						nhanvienv.setHinhAnhNV(linkanh_key);
					}else {
						String keyAnh=nhanvienv.getHinhAnhNV().split(",")[1];
						CloudinaryUtils.deleteImage(keyAnh);
						linkanh_key = CloudinaryUtils.uploadImage(file,"Bookland/NhanVien");
						nhanvienv.setHinhAnhNV(linkanh_key);
					}

				}else {
					linkanh_key = CloudinaryUtils.uploadImage(file,"Bookland/NhanVien");
					nhanvienv.setHinhAnhNV(linkanh_key);
				}

			} catch (IOException e) {
			}
			
		}
		NhanVien saveNhavien=nhanVienDAO.save(nhanvienv);
		return saveNhavien;
	}

}
