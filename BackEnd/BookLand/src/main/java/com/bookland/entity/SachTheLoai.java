package com.bookland.entity;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "SachTheLoai")
public class SachTheLoai {

    @EmbeddedId
    private SachTheLoaiKey id; // Khóa chính composite

    @ManyToOne
    @MapsId("sach") // Ánh xạ trường khóa chính
    @JoinColumn(name = "MaSach")
    private Sach sach;

    @ManyToOne
    @MapsId("theLoai") // Ánh xạ trường khóa chính
    @JoinColumn(name = "MaTheLoai")
    private TheLoai theLoai;
    
    @Embeddable // Đánh dấu lớp này là lớp nhúng
    @Data
    public static class SachTheLoaiKey implements Serializable {
        private String sach; // Kiểu dữ liệu tương ứng với MaSach
        private String theLoai; // Kiểu dữ liệu tương ứng với MaTheLoai

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (!(o instanceof SachTheLoaiKey)) return false;
            SachTheLoaiKey that = (SachTheLoaiKey) o;
            return sach.equals(that.sach) && theLoai.equals(that.theLoai);
        }

        @Override
        public int hashCode() {
            return Objects.hash(sach, theLoai);
        }
    }
}
