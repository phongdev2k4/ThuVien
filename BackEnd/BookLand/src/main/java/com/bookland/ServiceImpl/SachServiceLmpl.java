package com.bookland.ServiceImpl;

import java.awt.image.BufferedImage;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bookland.dao.SachDAO;
import com.bookland.dao.SachTheLoaiDAO;
import com.bookland.dao.TacGiaDAO;
import com.bookland.dao.TheLoaiDAO;
import com.bookland.dto.SachDTO;
import com.bookland.dto.addBookRequest;
import com.bookland.dto.addBookResponse;
import com.bookland.service.SachService;
import com.bookland.service.sachHinhAnhService;
import com.bookland.utils.CloudinaryService;
import com.cloudinary.Cloudinary;



import com.bookland.entity.Sach;
import com.bookland.entity.SachTheLoai;
import com.bookland.entity.TacGia;
import com.bookland.entity.TheLoai;
import com.bookland.entity.hinhAnhSach;


@Service
public class SachServiceLmpl implements SachService{
    
	@Autowired
	SachDAO sachDAO;
	@Autowired
	TacGiaDAO tgDAO;
	@Autowired
	TheLoaiDAO tlDAO;
	@Autowired
	SachTheLoaiDAO stlDAO;
	@Autowired
	sachHinhAnhService imgService;
	
	@Autowired
	CloudinaryService cloudinaryService;
	
	
	
	
	
	@Override
	public List<addBookResponse> finAll() {
		  List<Object[]> results = sachDAO.findAllBooksWithDetails();

	        return results.stream()
	            .map(this::mapToAddBookResponse)
	            .collect(Collectors.toList());
	}
	   private addBookResponse mapToAddBookResponse(Object[] row) {
	        String maSach = (String) row[0];
	        String tenSach = (String) row[2]; // Comma-separated genres
	        String tenTacGia = (String) row[4];
	        String moTa = (String) row[5];
	        

	        // Convert the comma-separated string to a List<String>
	        List<String> Images = Arrays.asList(((String) row[1]).split(", "));
	        List<String> tenTheLoai = Arrays.asList(((String) row[3]).split(", "));

	        return new addBookResponse(
	            maSach,Images ,tenSach,tenTheLoai, tenTacGia, moTa
	        );
	    }

//	@Override
//	public Sach create(Sach sach) {
//		return sachDAO.save(sach);
//	}

	@Override
	public void delete(String masach) {
		sachDAO.deleteById(masach);
		
	}

	@Override
	public addBookResponse create(addBookRequest request,MultipartFile[] files) {
		System.out.print(files);
		Sach s = new Sach();
		s.setTenSach(request.getTenSach());
		s.setMoTa(request.getMoTa());
		s.setMaSach(request.getMaSach());
		s.setTienSach(request.getTienSach());
		
		
		//tao tacGia
		TacGia tg  = tgDAO.findByMaTacGia(request.getMaTacGia());
		s.setTacGia(tg);
		s.setMoTa(request.getMoTa());
		s.setNxb(request.getNxb());
		
		//them sach vao databasex
		System.out.print(s);
		sachDAO.save(s);
		
		
		//tao the loai sach
		for(String a : request.getTheLoaiIds()) {
		SachTheLoai stl = new SachTheLoai();
		stl.setSach(s);
		stl.setTheLoai(tlDAO.findByMaTheLoai(a));
		stlDAO.save(stl);
}



		//tao bang trung gian sach va tL
		List<SachTheLoai> sachTheLoaiList = stlDAO.findByMaSach(s.getMaSach());
		List<String> tenTheLoai = new ArrayList<>();
		for(SachTheLoai a : sachTheLoaiList) {
			TheLoai tl = tlDAO.findByMaTheLoai(a.getTheLoai().getMaTheLoai());
			tenTheLoai.add(tl.getTenTheLoai());
		}
		
//		/////>>>>them hinh anh vao database + cloudinary 
		List<String> UrlImage  = new ArrayList<>();
		  List<String> failedUploads = new ArrayList<>();
		  for (int i = 0; i < files.length; i++) {
			    MultipartFile multipartFile = files[i];
			    try {
			        // Upload the image to Cloudinary
			        Map result = cloudinaryService.upload(multipartFile);

			        // Determine the image type based on its position
			        String imageType;
			        switch (i) {
			            case 0:
			                imageType = "COVER";
			                break;
			            case 1:
			                imageType = "BACKSIDE";
			                break;
			            case 2:
			                imageType = "FRONTSIDE";
			                break;
			            default:
			                imageType = "OTHER";
			                break;
			        }

			        // Create the HinhAnhSach entity
			        hinhAnhSach image = new hinhAnhSach(
			            (String) result.get("original_filename"),
			            (String) result.get("url"),
			            (String) result.get("public_id"),
			            s // The associated Sach entity
			        );
			        image.setImageType(imageType); // Set the image type

			        // Save the image metadata to the database
			        imgService.save(image);
			        UrlImage.add(image.getImageUrl());
			    } catch (Exception e) {
			        failedUploads.add(multipartFile.getOriginalFilename());
			    }
			}


//	       
		
		////>>>>>
		//return response cho client 
		addBookResponse response = new addBookResponse();
		response.setMaSach(s.getMaSach());	
		response.setTenSach(s.getTenSach());
		response.setTenTheLoai(tenTheLoai);
		response.setTenTacGia(s.getTacGia().getTenTacGia());
		response.setMoTa(s.getMoTa());
		response.setImageUrl(UrlImage);
		return response;
	}
	@Override
	public List<Sach> findAllBooks() {
		return sachDAO.findAll();
	}
	@Override
	public List<addBookResponse> findBookDetailsByName(String tenSach) {
		 List<Object[]> results = sachDAO.findBookDetailsByName(tenSach);
	        return results.stream()
	            .map(this::mapToAddBookResponse)
	            .collect(Collectors.toList());
		

	}
	@Override
	public List<SachDTO> findAllSachDTO() {
		 List<Object[]> results = sachDAO.finAllSachs();
		 List<SachDTO> sachs = new ArrayList<>();
		 for (Object[] result : results) {
			 SachDTO sach=new SachDTO();
			 result[7] = filterDuplicateresult(result[7]);
			 result[8] = filterDuplicateresult(result[8]);
			 
			 sach.setMaSach((String) result[0]);
			 sach.setTenSach((String) result[1]);
			 sach.setNamXB((int) result[2]);
			 sach.setNxb((String) result[3]);
			 sach.setTienSach((double) result[4]);
			 sach.setMoTa((String) result[5]);
			 // lấy thông tin tác giả
		        // Tách chuỗi theo dấu phẩy
		     String[] thongtintacgia = splitStringByDelimiter(result[6],",");
              TacGia tacGia =new TacGia();
              tacGia.setMaTacGia(thongtintacgia[0]);
              tacGia.setTenTacGia(thongtintacgia[1]);
              // Gọi hàm convertStringToDate với chuỗi ngày sinh và định dạng tương ứng
              Date ngaySinh = convertStringToDate(thongtintacgia[2], "yyyy-MM-dd HH:mm:ss.SSSSSS");

              // Kiểm tra nếu chuyển đổi thành công và gán vào đối tượng tác giả
              if (ngaySinh != null) {
                  tacGia.setNgaySinh(ngaySinh);
              }
              tacGia.setQuocGia(thongtintacgia[3]);
              sach.setTacGia(tacGia);
              //  lấy thể loại 
              // Tách thành danh sách các mảng
              String[] theLoaiArray =((String) result[7]).split("\\|");
              List<SachDTO.TheLoais> theloais=new ArrayList<>();
              for(String tl:theLoaiArray) {
            	  SachDTO.TheLoais theLoai = new SachDTO.TheLoais();
                  String[] cttl=tl.split(",");
                  theLoai.setMaTheLoai(cttl[0]);
                  theLoai.setTenTheLoai(cttl[1]);
                  theLoai.setMoTa(cttl[2]);
                  theloais.add(theLoai);
              }
              sach.setTheloai(theloais);
              // lấy ảnh 
              String [] anhSach=((String) result[8]).split("\\|");
              SachDTO.HinhAnhSach hinhAnhSach = new SachDTO.HinhAnhSach();
              for(String as:anhSach) {
            	  String[] ctas=as.split(",");
            	  if(ctas[2].equals("COVER")) {
            		 SachDTO.HinhAnh cover = new SachDTO.HinhAnh();
            		 cover.setImageUrl(ctas[5]);
            		 cover.setImageDescription(ctas[2]);
            	      hinhAnhSach.setCover(cover);
            	  }
            	  if(ctas[2].equals("BACKSIDE")) {
            		 SachDTO.HinhAnh cover = new SachDTO.HinhAnh();
            		 cover.setImageUrl(ctas[5]);
            		 cover.setImageDescription(ctas[2]);
            	      hinhAnhSach.setBackside(cover);
            	  }
            	  if(ctas[2].equals("FRONTSIDE")) {
            		 SachDTO.HinhAnh cover = new SachDTO.HinhAnh();
            		 cover.setImageUrl(ctas[5]);
            		 cover.setImageDescription(ctas[2]);
            	      hinhAnhSach.setFrontside(cover);
            	  } 
            	  
              }
              sach.setHinhAnhSach(hinhAnhSach);
              sach.setTongSoBanCung((int)result[9]);
              sach.setSoBanCungCon((int)result[10]);
             sachs.add(sach);
		 }
		return sachs;
	}
	
    // Hàm lọc để loại bỏ các phần tử trùng lặp
    public String filterDuplicateresult(Object result) {
        // Tách chuỗi theo dấu '|'
        String[] theLoaiArray = ((String) result).split("\\|");

        // Sử dụng Set để loại bỏ các phần tử trùng lặp
        Set<String> uniqueTheLoaiSet = new HashSet<>();
        for (String item : theLoaiArray) {
            uniqueTheLoaiSet.add(item);
        }

        // Kết hợp lại các phần tử duy nhất thành chuỗi
        return String.join("|", uniqueTheLoaiSet);
    }
    public  String[] splitStringByDelimiter(Object result, String delimiter) {
        // Kiểm tra nếu chuỗi input hoặc delimiter là null hoặc trống
        if (result == null || delimiter == null || delimiter.isEmpty()) {
            return new String[0];  // Trả về mảng rỗng nếu có vấn đề
        }

        // Dùng phương thức split() của String để tách chuỗi theo dấu phân cách
        return ((String) result).split(delimiter);
    }
    public Date convertStringToDate(String dateString, String pattern) {
        SimpleDateFormat sdf = new SimpleDateFormat(pattern); // Khởi tạo đối tượng SimpleDateFormat với pattern
        try {
            // Chuyển đổi chuỗi thành đối tượng Date
            return sdf.parse(dateString);
        } catch (Exception e) {
            // In lỗi nếu có
            return null;
        }
    }
	@Override
	public Page<SachDTO> searchSachDTO(String searchKey, Pageable pageable) {
		Page<Object[]> results = sachDAO.findAllSachsBySearchKey(searchKey, pageable);
		 List<SachDTO> sachs = new ArrayList<>();
		 for (Object[] result : results) {
			 SachDTO sach=new SachDTO();
			 result[7] = filterDuplicateresult(result[7]);
			 result[8] = filterDuplicateresult(result[8]);
			 
			 sach.setMaSach((String) result[0]);
			 sach.setTenSach((String) result[1]);
			 sach.setNamXB((int) result[2]);
			 sach.setNxb((String) result[3]);
			 sach.setTienSach((double) result[4]);
			 sach.setMoTa((String) result[5]);
			 // lấy thông tin tác giả
		        // Tách chuỗi theo dấu phẩy
		     String[] thongtintacgia = splitStringByDelimiter(result[6],",");
             TacGia tacGia =new TacGia();
             tacGia.setMaTacGia(thongtintacgia[0]);
             tacGia.setTenTacGia(thongtintacgia[1]);
             // Gọi hàm convertStringToDate với chuỗi ngày sinh và định dạng tương ứng
             Date ngaySinh = convertStringToDate(thongtintacgia[2], "yyyy-MM-dd HH:mm:ss.SSSSSS");

             // Kiểm tra nếu chuyển đổi thành công và gán vào đối tượng tác giả
             if (ngaySinh != null) {
                 tacGia.setNgaySinh(ngaySinh);
             }
             tacGia.setQuocGia(thongtintacgia[3]);
             sach.setTacGia(tacGia);
             //  lấy thể loại 
             // Tách thành danh sách các mảng
             String[] theLoaiArray =((String) result[7]).split("\\|");
             List<SachDTO.TheLoais> theloais=new ArrayList<>();
             for(String tl:theLoaiArray) {
           	  SachDTO.TheLoais theLoai = new SachDTO.TheLoais();
                 String[] cttl=tl.split(",");
                 theLoai.setMaTheLoai(cttl[0]);
                 theLoai.setTenTheLoai(cttl[1]);
                 theLoai.setMoTa(cttl[2]);
                 theloais.add(theLoai);
             }
             sach.setTheloai(theloais);
             // lấy ảnh 
             String [] anhSach=((String) result[8]).split("\\|");
             SachDTO.HinhAnhSach hinhAnhSach = new SachDTO.HinhAnhSach();
             for(String as:anhSach) {
           	  String[] ctas=as.split(",");
           	  if(ctas[2].equals("COVER")) {
           		 SachDTO.HinhAnh cover = new SachDTO.HinhAnh();
           		 cover.setImageUrl(ctas[5]);
           		 cover.setImageDescription(ctas[2]);
           	      hinhAnhSach.setCover(cover);
           	  }
           	  if(ctas[2].equals("BACKSIDE")) {
           		 SachDTO.HinhAnh cover = new SachDTO.HinhAnh();
           		 cover.setImageUrl(ctas[5]);
           		 cover.setImageDescription(ctas[2]);
           	      hinhAnhSach.setBackside(cover);
           	  }
           	  if(ctas[2].equals("FRONTSIDE")) {
           		 SachDTO.HinhAnh cover = new SachDTO.HinhAnh();
           		 cover.setImageUrl(ctas[5]);
           		 cover.setImageDescription(ctas[2]);
           	      hinhAnhSach.setFrontside(cover);
           	  } 
           	  
             }
             sach.setHinhAnhSach(hinhAnhSach);
             sach.setTongSoBanCung((int)result[9]);
             sach.setSoBanCungCon((int)result[10]);
            sachs.add(sach);
		 }
		return new PageImpl<>(sachs, pageable, results.getTotalElements());
	}



}
