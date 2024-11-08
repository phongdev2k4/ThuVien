package com.bookland.dao;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.bookland.entity.TaiKhoan;

public interface taiKhoanDAO extends JpaRepository<TaiKhoan,String> {

	Optional<TaiKhoan> findByUserName(String username);

}
