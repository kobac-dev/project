package com.tutorhub.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "educations")
public class Education {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "tutor_id", nullable = false)
    private Tutor tutor;

    @NotBlank
    @Column(name = "highest_degree")
    private String highestDegree;

    @NotNull
    @Column(name = "graduate_year")
    private Integer graduateYear;

    @ManyToOne
    @JoinColumn(name = "status_id")
    private Status status;

    // Constructors
    public Education() {}

    public Education(Tutor tutor, String highestDegree, Integer graduateYear, Status status) {
        this.tutor = tutor;
        this.highestDegree = highestDegree;
        this.graduateYear = graduateYear;
        this.status = status;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Tutor getTutor() { return tutor; }
    public void setTutor(Tutor tutor) { this.tutor = tutor; }

    public String getHighestDegree() { return highestDegree; }
    public void setHighestDegree(String highestDegree) { this.highestDegree = highestDegree; }

    public Integer getGraduateYear() { return graduateYear; }
    public void setGraduateYear(Integer graduateYear) { this.graduateYear = graduateYear; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
}