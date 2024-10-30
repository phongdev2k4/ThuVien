package com.bookland.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bookland.dto.addBookResponse;
import com.bookland.entity.Sach;

public interface SachDAO extends JpaRepository<Sach, String> {
	   @Query(value = """
		         SELECT 
		            a1.ma_sach AS maSach, 
                    STRING_AGG(a5.image_url, ', ') AS linkHinhSach, 
		            a2.ten_sach AS tenSach, 
		            STRING_AGG(a3.ten_the_loai, ', ') AS tenTheLoai, 
		            a4.ten_tac_gia AS tenTacGia, 
		            a2.mo_ta AS moTa
		        FROM 
		            sach_the_loai a1 
		        JOIN 
		            sach a2 ON a1.ma_sach = a2.ma_sach 
		        JOIN 
		            the_loai a3 ON a1.ma_the_loai = a3.ma_the_loai 
		        JOIN 
		            tac_gia a4 ON a2.ma_tac_gia = a4.ma_tac_gia 
                JOIN
                    hinh_anh_sach a5 ON a5.ma_sach = a2.ma_sach
		        GROUP BY 
		            a1.ma_sach, a2.ten_sach, a4.ten_tac_gia, a2.mo_ta;
		    """, nativeQuery = true)
	   List<Object[]> findAllBooksWithDetails();

}
