package com.tutorhub.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "statuses")
public class Status {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "status_name")
    private String statusName;

    private String description;

    // Constructors
    public Status() {}

    public Status(String statusName, String description) {
        this.statusName = statusName;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getStatusName() { return statusName; }
    public void setStatusName(String statusName) { this.statusName = statusName; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}