package com.example.java_services.controller;

import com.example.java_services.model.Cliente;
import com.example.java_services.service.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    private final ClienteService service;

    public ClienteController(ClienteService service) {
        this.service = service;
    }

    @GetMapping("/activos")
    public List<Cliente> getAllActivos() {
        return service.findActivos();
    }

    @GetMapping("/inactivos")
    public List<Cliente> getAllInactivos() {
        return service.findInactivos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        Cliente c = service.findById(id);
        if (c == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(c);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Cliente cliente) {
        Cliente nuevo = service.create(cliente);
        return ResponseEntity.ok(nuevo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Integer id, @RequestBody Cliente cliente) {
        Cliente actualizado = service.update(id, cliente);
        if (actualizado == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(actualizado);
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<?> cambiarEstado(@PathVariable Integer id) {
        Cliente actualizado = service.cambiarEstado(id);
        if (actualizado == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(actualizado);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        boolean deleted = service.delete(id);
        if (!deleted) return ResponseEntity.notFound().build();
        return ResponseEntity.ok("Cliente eliminado correctamente");
    }

    @PostMapping("/verify-duplicate")
    public ResponseEntity<?> verifyDuplicate(@RequestBody Cliente cliente) {
        var resp = service.checkDuplicates(cliente);

        if (resp.hasErrors()) {
            return ResponseEntity.badRequest().body(resp.getErrors());
        }

        return ResponseEntity.ok(resp.getErrors());
    }

}
