package com.example.java_services.service;

import com.example.java_services.model.Cliente;
import com.example.java_services.repository.ClienteRepository;
import com.example.java_services.dto.DuplicateCheckResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ClienteService {

    private final ClienteRepository repo;

    public ClienteService(ClienteRepository repo) {
        this.repo = repo;
    }

    public List<Cliente> findActivos() {
        return repo.findAll()
                .stream()
                .filter(c -> "activo".equalsIgnoreCase(c.getEstadoCliente()))
                .toList();
    }

    public List<Cliente> findInactivos() {
        return repo.findAll()
                .stream()
                .filter(c -> "inactivo".equalsIgnoreCase(c.getEstadoCliente()))
                .toList();
    }

    public Cliente findById(Integer id) {
        return repo.findById(id).orElse(null);
    }

    public Cliente create(Cliente cliente) {
        return repo.save(cliente);
    }

    public Cliente update(Integer id, Cliente data) {
        Cliente c = repo.findById(id).orElse(null);
        if (c == null) return null;

        c.setNombreCliente(data.getNombreCliente());
        c.setCorreoElectronico(data.getCorreoElectronico());
        c.setNumeroContacto(data.getNumeroContacto());
        c.setContrasena(data.getContrasena());
        c.setEstadoCliente(data.getEstadoCliente());

        return repo.save(c);
    }

    public boolean delete(Integer id) {
        if (!repo.existsById(id)) return false;
        repo.deleteById(id);
        return true;
    }

    @Transactional
    public boolean setInactive(Integer id) {
        Cliente c = repo.findById(id).orElse(null);
        if (c == null) return false;
        c.setEstadoCliente("inactivo");
        repo.save(c);
        return true;
    }

    // Validación duplicados
    public DuplicateCheckResponse checkDuplicates(Cliente input) {
        DuplicateCheckResponse resp = new DuplicateCheckResponse();

        if (input.getCorreoElectronico() != null &&
                repo.existsByCorreoElectronico(input.getCorreoElectronico())) {
            resp.addError("CorreoElectronico", "El correo ya está en uso.");
        }

        if (input.getNumeroContacto() != null &&
                repo.existsByNumeroContacto(input.getNumeroContacto())) {
            resp.addError("NumeroContacto", "El número de contacto ya está en uso.");
        }

        return resp;
    }

    public Cliente cambiarEstado(Integer id) {
        Cliente c = repo.findById(id).orElse(null);

        if (c == null) return null;

        if (c.getEstadoCliente().equals("activo")) {
            c.setEstadoCliente("inactivo");
        } else {
            c.setEstadoCliente("activo");
        }

        return repo.save(c);
    }

}
