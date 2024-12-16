package com.bookland.utils;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.Map;

public class CloudinaryUtils {

    // Khai báo các biến toàn cục cho thông tin cấu hình Cloudinary
    private static final String CLOUD_NAME = "dwubujpjt";  
    private static final String API_KEY = "482786223998591";       
    private static final String API_SECRET = "WzZSG7oDcqPr0CauARou7bQdzX8";  
    private static final String UPLOAD_PRESET = "ml_default";  

    // Hàm upload ảnh lên Cloudinary và trả về link của ảnh
    public static String uploadImage(MultipartFile file, String folder) throws IOException {
        // Tạo Cloudinary instance với thông tin cấu hình
        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", CLOUD_NAME,
                "api_key", API_KEY,
                "api_secret", API_SECRET));

        // Đọc file ảnh và upload lên Cloudinary, thêm tham số upload_preset
        Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "folder", folder,  // Chỉ định thư mục lưu ảnh trên Cloudinary
                "upload_preset", UPLOAD_PRESET  // Sử dụng upload preset
        ));

        // Lấy URL bảo mật và public_id từ kết quả trả về
        String secureUrl = (String) uploadResult.get("secure_url");
        String publicId = (String) uploadResult.get("public_id");

        // Nối URL và public_id thành một chuỗi
        return secureUrl + "," + publicId;

    }
    // Hàm upload ảnh lên Cloudinary và trả về tất cả thông tin của ảnh
    public static Map<String, Object> uploadImage2(MultipartFile file, String folder) throws IOException {
        // Tạo Cloudinary instance với thông tin cấu hình
        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", CLOUD_NAME,
                "api_key", API_KEY,
                "api_secret", API_SECRET));

        // Đọc file ảnh và upload lên Cloudinary, thêm tham số upload_preset
        Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                "folder", folder,  // Chỉ định thư mục lưu ảnh trên Cloudinary
                "upload_preset", UPLOAD_PRESET  // Sử dụng upload preset
        ));

        // Trả về tất cả các thông tin của ảnh, bao gồm secure_url, public_id, format, created_at, v.v.
        return uploadResult;
    }
    public static String uploadImage2(File file, String folder) throws IOException {
        // Tạo Cloudinary instance với thông tin cấu hình
        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", CLOUD_NAME,
                "api_key", API_KEY,
                "api_secret", API_SECRET));

        // Đọc file và chuyển nó thành byte array
        byte[] fileBytes = Files.readAllBytes(file.toPath());

        // Upload file lên Cloudinary với các tham số bổ sung
        Map<String, Object> uploadResult = cloudinary.uploader().upload(fileBytes, ObjectUtils.asMap(
                "folder", folder,  // Chỉ định thư mục lưu ảnh trên Cloudinary
                "upload_preset", UPLOAD_PRESET  // Sử dụng upload preset
        ));

        // Lấy URL bảo mật và public_id từ kết quả trả về
        String secureUrl = (String) uploadResult.get("secure_url");
        String publicId = (String) uploadResult.get("public_id");

        // Nối URL và public_id thành một chuỗi để trả về
        return secureUrl + "," + publicId;
    }
    // Hàm xóa tệp ảnh từ Cloudinary dựa trên public_id
    public static void deleteImage(String publicId) {
        try {
            // Tạo Cloudinary instance với thông tin cấu hình
            Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                    "cloud_name", CLOUD_NAME,
                    "api_key", API_KEY,
                    "api_secret", API_SECRET));

            // Gọi phương thức destroy để xóa ảnh theo public_id
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (Exception e) {
            // Nếu có lỗi sẽ không cần in ra thông báo, chỉ cần bỏ qua hoặc xử lý lỗi
        }
    }
}