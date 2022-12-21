package com.loan.manager.ui.modal.response;

import java.time.LocalDate;

public class ItemResponse {

    private String itemId;
    private String description;
    private Integer amount;
    private LocalDate date;
    private UserResponse userDetails;
    private String status;

    public String getStatus(){
        return status;
    }
    public void setStatus(String st){
        status=st;
    }

    public UserResponse getuserDetails() {
        return userDetails;
    }

    public void setuserDetails(UserResponse userDetails) {
        this.userDetails = userDetails;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}


