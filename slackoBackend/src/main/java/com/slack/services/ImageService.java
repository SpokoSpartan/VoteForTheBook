package com.slack.services;

import com.slack.exceptions.ImageNotFoundException;
import com.slack.exceptions.SomethingBadHappenException;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Objects;

@Service
public class ImageService {

    @Value("${be_url}")
    private String beUrl;

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
        return hash;
    }
}
