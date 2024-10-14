package com.bookland.utils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

public class ImageUtils {
	public static String saveImage(MultipartFile img, String uploadDir) throws IOException {
		if (!img.isEmpty()) {
			try {
				// Tạo đường dẫn đầy đủ cho thư mục lưu trữ
				String uploadPathStr = "src/main/resources/static/uploads/images/" + uploadDir;
				Path uploadPath = Paths.get(uploadPathStr);

				// Tạo thư mục nếu nó chưa tồn tại
				if (!Files.exists(uploadPath)) {
					Files.createDirectories(uploadPath);
				}

				// Lấy tên tệp ảnh và đặt tên mới
				String fileName = StringUtils.cleanPath(img.getOriginalFilename());
				File uniqueFile = getUniqueFileName(uploadPath.toFile(), fileName);

				// Lưu file vào thư mục
				Files.copy(img.getInputStream(), uniqueFile.toPath());

				// Trả về tên tệp hình ảnh đã lưu
				return uniqueFile.getName();
			} catch (IOException e) {
				e.printStackTrace();
				return null;
				
			}
		}
		// Trả về null nếu không có tệp hoặc không lưu được
		return null;
	}

	public static File getUniqueFileName(File folder, String fileName) { // lấy file đặt tên file theo + chuổi thời gian
		long timestamp = System.currentTimeMillis();
		String timestampStr = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date(timestamp));
		String baseName = fileName.substring(0, fileName.lastIndexOf('.'));
		String extension = fileName.substring(fileName.lastIndexOf('.'));
		String newFileName = baseName + "_" + timestampStr + extension;
		String namefile = Integer.toHexString(newFileName.hashCode()) + extension;
		return new File(folder, namefile);
	}

}
