package com.loan.manager.repository;

import com.loan.manager.repository.entity.LoanEntity;
import com.loan.manager.repository.entity.UserEntity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LoanRepository extends JpaRepository<LoanEntity, Long> {

    List<LoanEntity> findAllByUserDetailsOrderByDateDesc(UserEntity userEntity);

    Optional<LoanEntity> findByItemId(String itemId);

    List<LoanEntity> findAllByStatus(String status);

}
