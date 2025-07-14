package com.tutorhub.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "addresses")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String country;

    @NotBlank
    private String district;

    @NotBlank
    private String location;

    @NotBlank
    private String area;

    // Constructors
    public Address() {}

    public Address(String country, String district, String location, String area) {
        this.country = country;
        this.district = district;
        this.location = location;
        this.area = area;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }

    public String getDistrict() { return district; }
    public void setDistrict(String district) { this.district = district; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getArea() { return area; }
    public void setArea(String area) { this.area = area; }
}