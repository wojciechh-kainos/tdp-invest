package services;

import configuration.TdpConfig;

import java.io.*;
import java.net.URL;
import java.nio.file.FileSystems;
import java.nio.file.Files;

/**
 * Created by malgorzatas on 18/07/16.
 */
public class FileDownloader {

    public String saveFile(InputStream uploadedInputStream, String fileName) throws IOException {
            URL url = getClass().getResource(TdpConfig.pathToDownloadData);
            java.nio.file.Path outputPath = FileSystems.getDefault().getPath(url.getPath() + fileName);
            if(outputPath.toFile().exists()) {
                outputPath.toFile().delete();
            }
            Files.copy(uploadedInputStream, outputPath);
            return outputPath.toString();
    }
}
