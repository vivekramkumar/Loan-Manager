package com.loan.manager.repository.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "user_details")
public class UserEntity implements Serializable {

    private static final long serialVersionUID = -8836056693631358014L;

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO, generator="user_sequence_generator")
    @SequenceGenerator(name="user_sequence_generator", sequenceName="user_sequence")
    @Column(updatable = false, nullable = false)
    private Long id;

    @Column(nullable = false)
    private String userType;

    @Column(nullable = false)
    private String userId;

    @Column(nullable = false, length = 16)
    private String firstName;

    @Column(nullable = false, length = 16)
    private String lastName;

    @Column(nullable = false, length = 120)
    private String email;

    @Column(nullable = false)
    private String encryptedPassword;

 
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEncryptedPassword() {
        return encryptedPassword;
    }

    public void setEncryptedPassword(String encryptedPassword) {
        this.encryptedPassword = encryptedPassword;
    }

    public void setuserType(String type) {
        this.userType = type;
    }
    public String getuserType() {
        return this.userType;
    }
   
   

    @Override
    public String toString() {
        return "UserEntity{" +
                "id=" + id +
                ", userId='" + userId + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", encryptedPassword='" + encryptedPassword + '\'' +
                '}';
    }

   
}
