package com.slack.controllers;

import static com.slack.utils.Mapping.*;

import com.slack.services.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(API_VERSION + IMAGE)
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @GetMapping(GET_ONE)
    public @ResponseBody byte[] getImageWithMediaType(@RequestParam("id") String name) {
        return imageService.getImageByName(name);
    }

    @PostMapping(UPLOAD)
    public String handleFileUpload(@RequestParam("file") MultipartFile file) {
        return imageService.createImage(file);
    }
}
