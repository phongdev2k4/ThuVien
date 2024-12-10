package com.bookland.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookland.dto.addBookResponse;
import com.bookland.entity.Sach;

public interface SachDAO extends JpaRepository<Sach, String> {
	@Query(value = """
				      SELECT
			    a2.ma_sach AS maSach,

			    -- Subquery for image URLs
			    (SELECT STRING_AGG(image_url, ', ')
			     FROM hinh_anh_sach
			     WHERE ma_sach = a2.ma_sach) AS linkHinhSach,

			    a2.ten_sach AS tenSach,

			    -- Subquery for genres
			    (SELECT STRING_AGG(ten_the_loai, ', ')
			     FROM sach_the_loai stl
			     JOIN the_loai tl ON stl.ma_the_loai = tl.ma_the_loai
			     WHERE stl.ma_sach = a2.ma_sach) AS tenTheLoai,

			    a4.ten_tac_gia AS tenTacGia,
			    a2.mo_ta AS moTa

			FROM
			    sach a2
			JOIN
			    tac_gia a4 ON a2.ma_tac_gia = a4.ma_tac_gia
			GROUP BY
			    a2.ma_sach, a2.ten_sach, a4.ten_tac_gia, a2.mo_ta;

				        """, nativeQuery = true)
	List<Object[]> findAllBooksWithDetails();
	
    @Query(value = """
            SELECT 
                a2.ma_sach AS maSach,
                -- Subquery to get image URLs as a comma-separated string
                (SELECT STRING_AGG(image_url, ', ')
                 FROM hinh_anh_sach
                 WHERE ma_sach = a2.ma_sach) AS linkHinhSach,
                 
                a2.ten_sach AS tenSach,
                
                -- Subquery to get genres as a comma-separated string
                (SELECT STRING_AGG(ten_the_loai, ', ')
                 FROM sach_the_loai stl
                 JOIN the_loai tl ON stl.ma_the_loai = tl.ma_the_loai
                 WHERE stl.ma_sach = a2.ma_sach) AS tenTheLoai,
                 
                a4.ten_tac_gia AS tenTacGia,
                a2.mo_ta AS moTa
            FROM 
                sach a2
            JOIN 
                tac_gia a4 ON a2.ma_tac_gia = a4.ma_tac_gia
            WHERE 
                a2.ten_sach = :tenSach
            GROUP BY 
                a2.ma_sach, a2.ten_sach, a4.ten_tac_gia, a2.mo_ta
        """, nativeQuery = true)
        List<Object[]> findBookDetailsByName(@Param("tenSach") String tenSach);
        
        

}
