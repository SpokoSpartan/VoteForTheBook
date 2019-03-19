package com.slack.services;

import com.slack.exceptions.SomethingBadHappenException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ResourceLoader resourceLoader;

    @Value("${fe_url}")
    private String feUrl;

    public byte[] getImageByName(String name) {
        return null;
    }


    //TODO: Remember about scheduler!! (for deleting unused images)
    public String createImage(MultipartFile file) {
        String hash, path;
        try {
            while(true) {
                hash = Integer.toString(Objects.hashCode(new SimpleDateFormat(
                        "yyyy-MM-dd'T'HH:mm:ss.SSSZ").format(Calendar.getInstance().getTime())));
                Resource resource = new ClassPathResource("/pictures");
                path = resource.getURI().toString().substring(6) + "/" + hash;

                File exist = new File(path);
                if(!exist.exists() && !exist.isDirectory())
                    break;
            }
            file.transferTo(new File(path));
        } catch (IOException e) {
            throw new SomethingBadHappenException();
        }
        return feUrl + "/" + hash;
    }
}
