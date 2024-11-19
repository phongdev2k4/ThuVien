package com.bookland.utils;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

public class BarcodeGeneratorUtils {
	@Autowired
	CloudinaryService cloudService;

	public static String generateBarcode(String barcodeText, String uploadDir) {
        try {
            // Tạo mã vạch
            BitMatrix bitMatrix = new MultiFormatWriter().encode(barcodeText, BarcodeFormat.UPC_A, 300, 130);

            // Tạo hình ảnh từ mã vạch
            BufferedImage barcodeImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

            // Thêm số vào hình ảnh
            BufferedImage finalImage = new BufferedImage(barcodeImage.getWidth(), barcodeImage.getHeight() + 30, BufferedImage.TYPE_INT_RGB);
            Graphics2D g = finalImage.createGraphics();
            g.setColor(Color.WHITE);
            g.fillRect(0, 0, finalImage.getWidth(), finalImage.getHeight());
            g.drawImage(barcodeImage, 0, 0, null);
            g.setColor(Color.BLACK);
            g.setFont(new Font("Arial", Font.PLAIN, 20));
            g.drawString(barcodeText, (finalImage.getWidth() - g.getFontMetrics().stringWidth(barcodeText)) / 2, barcodeImage.getHeight() + 20);
            g.dispose();
      
            // Lưu hình ảnh vào tệp
            File outputFile = new File("barcode.png");
            ImageIO.write(finalImage, "png", outputFile);
            
            return BarcodeGeneratorUtils.saveImage2(outputFile, uploadDir);
        } catch (Exception e) {
            System.err.println("Lỗi khi tạo mã vạch: " + e.getMessage());
        }
        return null;
    }
	
	public static String saveImage2(File imgFile, String uploadDir) throws IOException {
	    if (imgFile != null && imgFile.exists() && imgFile.length() > 0) {
	        try {
	            // Tạo đường dẫn đầy đủ cho thư mục lưu trữ
	            String uploadPathStr = "src/main/resources/static/uploads/images/" + uploadDir;
	            Path uploadPath = Paths.get(uploadPathStr);

	            // Tạo thư mục nếu nó chưa tồn tại
	            if (!Files.exists(uploadPath)) {
	                Files.createDirectories(uploadPath);
	            }

	            // Lấy tên tệp và đặt tên mới
	            String fileName = imgFile.getName();
	            File uniqueFile = getUniqueFileName2(uploadPath.toFile(), fileName);

	            // Lưu file vào thư mục
	            Files.copy(imgFile.toPath(), uniqueFile.toPath(), StandardCopyOption.REPLACE_EXISTING);

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

	public static File getUniqueFileName2(File folder, String fileName) { // lấy file đặt tên file theo + chuổi thời gian
		long timestamp = System.currentTimeMillis();
		String timestampStr = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date(timestamp));
		String baseName = fileName.substring(0, fileName.lastIndexOf('.'));
		String extension = fileName.substring(fileName.lastIndexOf('.'));
		String newFileName = baseName + "_" + timestampStr + extension;
		String namefile = Integer.toHexString(newFileName.hashCode()) + extension;
		return new File(folder, namefile);
	}
	 public static String generateFullUPC(String upc) {
	        // Kiểm tra độ dài và định dạng
	        if (upc.length() != 11 || !upc.matches("\\d{11}")) {
	            throw new IllegalArgumentException("Chuỗi phải có đúng 11 chữ số.");
	        }

	        int sumOdd = 0;
	        int sumEven = 0;

	        // Tính tổng các chữ số ở vị trí lẻ và chẵn
	        for (int i = 0; i < upc.length(); i++) {
	            int digit = Character.getNumericValue(upc.charAt(i));
	            if (i % 2 == 0) { // Vị trí lẻ
	                sumOdd += digit;
	            } else { // Vị trí chẵn
	                sumEven += digit;
	            }
	        }

	        // Tính tổng
	        int total = (sumOdd * 3) + sumEven;

	        // Tính phần dư và checksum
	        int remainder = total % 10;
	        int checksum = (remainder == 0) ? 0 : 10 - remainder;

	        // Trả về chuỗi 12 chữ số (11 chữ số gốc + checksum)
	        return upc + checksum; // Kết hợp chuỗi gốc với checksum
	    }
}
