package com.example.java_services.dto;

import java.util.HashMap;
import java.util.Map;

public class DuplicateCheckResponse {

    private Map<String, Object> errors = new HashMap<>();

    public void addError(String field, String message) {
        Map<String, String> mensaje = new HashMap<>();
        mensaje.put("mensaje", message);

        errors.put(field, mensaje);
    }

    public Map<String, Object> getErrors() {
        return errors;
    }

    public boolean hasErrors() {
        return !errors.isEmpty();
    }
}
