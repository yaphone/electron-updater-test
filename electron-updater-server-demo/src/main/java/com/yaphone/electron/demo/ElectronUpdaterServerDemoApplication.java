package com.yaphone.electron.demo;

import com.yaphone.electron.demo.util.FileProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
		FileProperties.class
})
public class ElectronUpdaterServerDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(ElectronUpdaterServerDemoApplication.class, args);
	}

}