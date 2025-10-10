package com.techMarket.spring_app.service;

import org.springframework.stereotype.Service;

@Service
public class helloWorldService {

    public String getHelloMessage(String name) {
        return "Hello, World!" + name + "!";
    }
}
