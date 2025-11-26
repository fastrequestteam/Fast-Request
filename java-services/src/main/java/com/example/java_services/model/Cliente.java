package com.example.java_services.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "clientes")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "nombre_cliente", length = 100, nullable = false)
    private String nombreCliente;

    @Column(name = "correo_electronico", length = 100, nullable = false, unique = true)
    private String correoElectronico;

    @Column(name = "numero_contacto", length = 30, nullable = false)
    private String numeroContacto;

    @Column(name = "contrasena", length = 100, nullable = false)
    private String contrasena;

    @Column(name = "estado_cliente", nullable = false)
    private String estadoCliente = "activo";
}
