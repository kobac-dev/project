package com.tutorhub.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "tutors")
@EntityListeners(AuditingEntityListener.class)
public class Tutor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "full_name")
    private String fullName;

    @Enumerated(EnumType.STRING)
    private Gender sex;

    @NotBlank
    @Column(name = "phone_number")
    private String phoneNumber;

    @NotBlank
    @Email
    @Column(unique = true)
    private String email;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @NotNull
    @Column(name = "max_number")
    private Integer maxNumber;

    @Column(name = "profile_image")
    private String profileImage;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;

    @OneToOne(mappedBy = "tutor", cascade = CascadeType.ALL)
    private Education education;

    @ManyToMany
    @JoinTable(
        name = "tutor_subjects",
        joinColumns = @JoinColumn(name = "tutor_id"),
        inverseJoinColumns = @JoinColumn(name = "subject_id")
    )
    private Set<Subject> subjects = new HashSet<>();

    @OneToMany(mappedBy = "tutor", cascade = CascadeType.ALL)
    private Set<Availability> availability = new HashSet<>();

    @Column(precision = 3, scale = 2)
    private BigDecimal rating;

    @Column(name = "hourly_rate", precision = 10, scale = 2)
    private BigDecimal hourlyRate;

    @Enumerated(EnumType.STRING)
    private TutorStatus status = TutorStatus.ACTIVE;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Constructors
    public Tutor() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public Gender getSex() { return sex; }
    public void setSex(Gender sex) { this.sex = sex; }

    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public Address getAddress() { return address; }
    public void setAddress(Address address) { this.address = address; }

    public Integer getMaxNumber() { return maxNumber; }
    public void setMaxNumber(Integer maxNumber) { this.maxNumber = maxNumber; }

    public String getProfileImage() { return profileImage; }
    public void setProfileImage(String profileImage) { this.profileImage = profileImage; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Education getEducation() { return education; }
    public void setEducation(Education education) { this.education = education; }

    public Set<Subject> getSubjects() { return subjects; }
    public void setSubjects(Set<Subject> subjects) { this.subjects = subjects; }

    public Set<Availability> getAvailability() { return availability; }
    public void setAvailability(Set<Availability> availability) { this.availability = availability; }

    public BigDecimal getRating() { return rating; }
    public void setRating(BigDecimal rating) { this.rating = rating; }

    public BigDecimal getHourlyRate() { return hourlyRate; }
    public void setHourlyRate(BigDecimal hourlyRate) { this.hourlyRate = hourlyRate; }

    public TutorStatus getStatus() { return status; }
    public void setStatus(TutorStatus status) { this.status = status; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public enum Gender {
        MALE, FEMALE, OTHER
    }

    public enum TutorStatus {
        ACTIVE, INACTIVE
    }
}