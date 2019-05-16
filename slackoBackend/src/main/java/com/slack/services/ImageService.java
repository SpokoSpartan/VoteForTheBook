package com.slack.services;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.slack.exceptions.ImageNotFoundException;
import com.slack.exceptions.SomethingBadHappenException;
import com.slack.exceptions.ValidationException;
import com.slack.utils.Constans;
import com.slack.utils.Mapping;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Calendar;
import java.util.List;
import java.util.Objects;
import java.util.Map;

@Service
public class ImageService {

    @Value("${be_url}")
    private String beUrl;

    @Value("${spring.environment.heroku}")
    private Boolean isInstalledOnHeroku;

    private final List<String> supportedTypes = Arrays.asList (MediaType.IMAGE_JPEG.toString(), MediaType.IMAGE_PNG.toString());

    public byte[] getImageByName(String name) {
        File[] roots = File.listRoots();
        String path = roots[0].getAbsolutePath() + "images/study/books/" + name;
        try {
            File file = new File(path);
            InputStream in = new FileInputStream(file);
            return IOUtils.toByteArray(in);
        } catch (IOException e) {
            throw new ImageNotFoundException();
        }
    }

    //TODO: Remember about scheduler!! (for deleting unused images)
    public String createImage(MultipartFile file) {
        if (isInstalledOnHeroku) {
            return "{ \"url\": \"" + uploadPictureOnCloudinary(file).get("url").toString() + "\"}";
        }
        String hash, path;
        File[] roots = File.listRoots();
        try {
            do {
                hash = Integer.toString(Math.abs(Objects.hashCode(new SimpleDateFormat(
                        "yyyy-MM-dd'T'HH:mm:ss.SSSZ").format(Calendar.getInstance().getTime()))));
                path = roots[0].getAbsolutePath() + "images/study/books/" + hash + ".jpg";
            } while(Files.exists(Paths.get(path)));
            file.transferTo(new File(path));
        } catch (IOException e) {
            throw new SomethingBadHappenException();
        }
        return "{ \"url\": \"" + beUrl + Mapping.API_VERSION + Mapping.IMAGE + "/getOne/" + hash + ".jpg" + "\"}";
    }

    public Map uploadPictureOnCloudinary(MultipartFile picture) {
        validateFile(picture);
        Map uploadResult = null;
        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "drkqvtiuz",
                "api_key", "878127959754956",
                "api_secret", "tOauaQUIBLKO8Ar7FVOcx0A69d8"));
        try {
            uploadResult = cloudinary.uploader().upload(picture.getBytes(),
                    ObjectUtils.asMap("resource_type", "auto"));
        } catch (IOException e) {
            throw new SomethingBadHappenException();
        }
        return uploadResult;
    }

    private void validateFile(MultipartFile file) {
        if(file == null || file.isEmpty()){
            throw new ValidationException("File is empty.");
        }
        if(file.getSize() > Constans.MAX_FILE_SIZE ) { throw new ValidationException("Sorry, but this file size: " + file.getSize() + " is too much."); }
        if (!supportedTypes.contains(file.getContentType()))
            throw new ValidationException("Sorry, but we support only " + supportedTypes + " types.");
    }
}
