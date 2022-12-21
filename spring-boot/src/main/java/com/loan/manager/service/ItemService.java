package com.loan.manager.service;

//import com.loan.manager.repository.entity.UserEntity;
import com.loan.manager.shared.dto.ItemDto;
import com.loan.manager.shared.type.ItemCategory;

import java.util.List;

public interface ItemService {

    List<ItemDto> getAllLoansByUserId();

    List<ItemDto> getAllPaymentsByUserId();

    ItemDto createItem(ItemCategory itemCategory, ItemDto itemDto);

    ItemDto updateItem(ItemCategory itemCategory, ItemDto itemDto);

    void deleteItem(ItemCategory itemCategory, String itemId);

    List<ItemDto> getAllPendingLoans();

    public ItemDto ApproveRejectLoan(String ItemID, String status);

}
