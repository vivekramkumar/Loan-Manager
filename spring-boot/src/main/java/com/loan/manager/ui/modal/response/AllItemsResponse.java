package com.loan.manager.ui.modal.response;

import java.util.List;

public class AllItemsResponse {

    private List<ItemResponse> loans;
    private List<ItemResponse> payments;

    public List<ItemResponse> getLoans() {
        return loans;
    }

    public void setLoans(List<ItemResponse> loans) {
        this.loans = loans;
    }

    public List<ItemResponse> getPayments() {
        return payments;
    }

    public void setPayments(List<ItemResponse> payments) {
        this.payments = payments;
    }
}
