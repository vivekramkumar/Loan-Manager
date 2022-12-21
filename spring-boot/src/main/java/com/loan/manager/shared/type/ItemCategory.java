package com.loan.manager.shared.type;

public enum ItemCategory {

    LOAN("loan"),
    PAYMENT("payment");

    private String type;

    ItemCategory(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setType(String errorMessage) {
        this.type = errorMessage;
    }


}
