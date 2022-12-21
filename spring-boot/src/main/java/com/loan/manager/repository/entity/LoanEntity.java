package com.loan.manager.repository.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "loan")
@SequenceGenerator(name="item_sequence_generator", sequenceName="loan_sequence")
public class LoanEntity extends ItemEntity implements Serializable {

    private static final long serialVersionUID = 8483374825350563835L;
    
    @Column(nullable = false, length = 100)
    private String status="pending";

    public String getStatus(){
        return status;
    }
    public void setStatus(String s){
        status=s;
    }
}
