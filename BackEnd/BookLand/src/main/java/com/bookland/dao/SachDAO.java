package com.bookland.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.bookland.dto.SachDTO;
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


	@Query(value = "SELECT s.ma_sach, s.ten_sach, s.namxb, s.nxb, s.tien_sach,s.mo_ta," +
	        "CONCAT(tg.ma_tac_gia, ',', tg.ten_tac_gia, ',', tg.ngay_sinh, ',', tg.quoc_gia) AS ThongTinTacGia, " +
	        "STRING_AGG(CONCAT(tl.ma_the_loai, ',', tl.ten_the_loai, ',', tl.mo_ta), '|') AS TheLoai, " +
	        "STRING_AGG(CONCAT(has.id, ',', has.image_id, ',', has.image_type, ',', has.name, ',', has.ma_sach, ',', has.image_url), '|') AS HinhAnhSach, " +
	        "COUNT(DISTINCT bss.ma_ban_sao_sach) AS TongBanCungSach, " +
	        "COUNT(DISTINCT CASE WHEN TRIM(bss.trang_thai_muon) = 'Có sẵn' THEN bss.ma_ban_sao_sach ELSE NULL END) AS BanCungSachConTrongKho " +
	        "FROM sach s " +
	        "INNER JOIN tac_gia tg ON tg.ma_tac_gia = s.ma_tac_gia " +
	        "LEFT JOIN sach_the_loai stl ON stl.ma_sach = s.ma_sach " +
	        "LEFT JOIN the_loai tl ON tl.ma_the_loai = stl.ma_the_loai " +
	        "LEFT JOIN hinh_anh_sach has ON has.ma_sach = s.ma_sach " +
	        "LEFT JOIN ban_sao_sach bss ON bss.ma_sach = s.ma_sach " +
	        "GROUP BY s.ma_sach, s.ten_sach, s.namxb, s.nxb, s.tien_sach,s.mo_ta, tg.ma_tac_gia, tg.ten_tac_gia, tg.ngay_sinh, tg.quoc_gia", 
	        nativeQuery = true)
	List<Object[]> finAllSachs();

	@Query(value = "SELECT s.ma_sach, s.ten_sach, s.namxb, s.nxb, s.tien_sach, s.mo_ta, " +
	        "CONCAT(tg.ma_tac_gia, ',', tg.ten_tac_gia, ',', tg.ngay_sinh, ',', tg.quoc_gia) AS ThongTinTacGia, " +
	        "STRING_AGG(CONCAT(tl.ma_the_loai, ',', tl.ten_the_loai, ',', tl.mo_ta), '|') AS TheLoai, " +
	        "STRING_AGG(CONCAT(has.id, ',', has.image_id, ',', has.image_type, ',', has.name, ',', has.ma_sach, ',', has.image_url), '|') AS HinhAnhSach, " +
	        "COUNT(DISTINCT bss.ma_ban_sao_sach) AS TongBanCungSach, " +
	        "COUNT(DISTINCT CASE WHEN TRIM(bss.trang_thai_muon) = 'Có sẵn' THEN bss.ma_ban_sao_sach ELSE NULL END) AS BanCungSachConTrongKho " +
	        "FROM sach s " +
	        "INNER JOIN tac_gia tg ON tg.ma_tac_gia = s.ma_tac_gia " +
	        "LEFT JOIN sach_the_loai stl ON stl.ma_sach = s.ma_sach " +
	        "LEFT JOIN the_loai tl ON tl.ma_the_loai = stl.ma_the_loai " +
	        "LEFT JOIN hinh_anh_sach has ON has.ma_sach = s.ma_sach " +
	        "LEFT JOIN ban_sao_sach bss ON bss.ma_sach = s.ma_sach " +
	        "WHERE (:searchKey IS  NULL OR :searchKey = '' OR " +
	        "(LOWER(s.ma_sach) LIKE LOWER(CONCAT('%', :searchKey, '%')) OR " +
	        "LOWER(s.ten_sach) LIKE LOWER(CONCAT('%', :searchKey, '%')) OR " +
	        "LOWER(tg.ma_tac_gia) LIKE LOWER(CONCAT('%', :searchKey, '%')) OR " +
	        "LOWER(tl.ma_the_loai) LIKE LOWER(CONCAT('%', :searchKey, '%')) OR " +
	        "LOWER(tl.ten_the_loai) LIKE LOWER(CONCAT('%', :searchKey, '%')) OR " +
	        "LOWER(s.nxb) LIKE LOWER(CONCAT('%', :searchKey, '%')) OR " +
	        "LOWER(tg.ten_tac_gia) LIKE LOWER(CONCAT('%', :searchKey, '%'))))" +
	        "GROUP BY s.ma_sach, s.ten_sach, s.namxb, s.nxb, s.tien_sach, s.mo_ta, tg.ma_tac_gia, tg.ten_tac_gia, tg.ngay_sinh, tg.quoc_gia", 
	    nativeQuery = true)
	Page<Object[]> findAllSachsBySearchKey(@Param("searchKey") String searchKey, Pageable pageable);


}
