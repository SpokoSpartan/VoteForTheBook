package com.slack.controllers;

import static com.slack.utils.Mapping.*;

import com.slack.services.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(API_VERSION + IMAGE)
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @GetMapping(value = GET_ONE,
            produces = MediaType.IMAGE_JPEG_VALUE)
    public @ResponseBody byte[] getImageWithMediaType(@PathVariable("id") String name) {
        return imageService.getImageByName(name);
    }

    @PostMapping(UPLOAD)
    public String handleFileUpload(@RequestParam("file") MultipartFile file) {
        return imageService.createImage(file);
    }
}
