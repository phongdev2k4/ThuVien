package com.bookland.dto;

import com.bookland.entity.BanSaoSach;
import com.bookland.entity.Sach;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class BanSaoSachWithCoverImageDTO {
    private Sach sach;
    private String imageUrl;
    private Long soLuong; 


}
