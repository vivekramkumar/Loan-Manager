package com.loan.manager.shared.dto;

import java.time.LocalDate;

public class ItemDto {

    private Long id;
    private String itemId;
    private String description;
    private Integer amount;
    private LocalDate date;
    private UserDto userDetails;
    private String status;

    public String getStatus(){
        return status;
    }
    public void setStatus(String st){
        status=st;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public UserDto getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(UserDto userDetails) {
        this.userDetails = userDetails;
    }

    @Override
    public String toString() {
        return "ItemDto{" +
                "id=" + id +
                ", itemId='" + itemId + '\'' +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", date=" + date +
                ", userDetails=" + userDetails +
                '}';
    }
}
