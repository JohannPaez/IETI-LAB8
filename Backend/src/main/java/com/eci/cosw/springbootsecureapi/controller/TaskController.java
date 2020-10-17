package com.eci.cosw.springbootsecureapi.controller;

import com.eci.cosw.springbootsecureapi.model.Task;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin(origins = "*")
public class TaskController {
    @Autowired
    ObjectMapper mapperJson;

    @GetMapping
    public ResponseEntity<?> getTasks() {
        try {
            String tasks = Unirest.get("https://taskplanner-ieti-lab07.azurewebsites.net/api/add-task?code=CS8WVc0UAF2MkWGh3Udd55PRp3nP4Qf1/OE8sFwuyMkLz8JXSJm5sw==")
                    .asString().getBody();
            return new ResponseEntity<>(tasks, HttpStatus.ACCEPTED);
        } catch (UnirestException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @PostMapping
    public ResponseEntity<?> addTask(@RequestBody Task task) {
        try {
            Unirest.post("https://taskplanner-ieti-lab07.azurewebsites.net/api/add-task?code=CS8WVc0UAF2MkWGh3Udd55PRp3nP4Qf1/OE8sFwuyMkLz8JXSJm5sw==")
                    .header("Content-Type", "application/json")
                    .body(mapperJson.writeValueAsString(task)).asString().getStatus();
            return new ResponseEntity<>(HttpStatus.ACCEPTED);
        } catch (JsonProcessingException | UnirestException e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
