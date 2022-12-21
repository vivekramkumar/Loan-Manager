package com.loan.manager.repository.entity;

import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "payment")
@SequenceGenerator(name="item_sequence_generator", sequenceName="payment_sequence")
public class PaymentEntity extends ItemEntity implements Serializable {

    private static final long serialVersionUID = 8920572149328485309L;


}
