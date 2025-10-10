package com.techMarket.spring_app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.techMarket.spring_app.service.helloWorldService;

@RestController
@RequestMapping("/api/hello") //http://localhost:8080/api/hello
public class HelloWorldController {
    // Escuta o metodo Get na rota /api/hello

    @Autowired // Injeção de dependencia
    private helloWorldService hwService;



    @GetMapping
    public String sayHello() {
        return hwService.getHelloMessage("Ariel");
    }
}
