package com.loan.manager.repository;

import com.loan.manager.repository.entity.PaymentEntity;
import com.loan.manager.repository.entity.UserEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends CrudRepository<PaymentEntity, Long> {

    List<PaymentEntity> findAllByUserDetailsOrderByDateDesc(UserEntity userEntity);

    Optional<PaymentEntity> findByItemId(String itemId);


}
