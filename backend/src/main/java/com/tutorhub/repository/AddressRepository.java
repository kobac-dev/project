package com.tutorhub.repository;

import com.tutorhub.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {
    List<Address> findByCountry(String country);
    List<Address> findByDistrict(String district);
    List<Address> findByLocation(String location);
}