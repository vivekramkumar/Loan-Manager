package com.loan.manager.ui.controller;

import com.loan.manager.service.ItemService;
import com.loan.manager.shared.dto.ItemDto;
import com.loan.manager.shared.type.ItemCategory;
import com.loan.manager.ui.modal.request.ItemRequest;
import com.loan.manager.ui.modal.response.AllItemsResponse;
import com.loan.manager.ui.modal.response.ItemResponse;
//import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.lang.reflect.Type;
import java.util.List;

@RestController
@RequestMapping("/api/items")
@Validated
//@Slf4j
public class ItemController {

    private final ModelMapper modelMapper;
    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
        modelMapper = new ModelMapper();
    }

    @GetMapping
    public ResponseEntity<AllItemsResponse> getAllItems() {
        // get all loan and payments
        List<ItemDto> allLoansDto = itemService.getAllLoansByUserId();
        List<ItemDto> allPaymentsDto = itemService.getAllPaymentsByUserId();

        // type - for mapping list of DTOs to list of item response
        Type type = new TypeToken<List<ItemResponse>>() {
        }.getType();
        // set loans and payments, and return it.
        AllItemsResponse response = new AllItemsResponse();
        response.setLoans(modelMapper.map(allLoansDto, type));
        response.setPayments(modelMapper.map(allPaymentsDto, type));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping(path="/pendingLoans")
    public ResponseEntity<AllItemsResponse> getPendingLoans() {
        // get all loan and payments
        List<ItemDto> allLoansDto = itemService.getAllPendingLoans();
        // type - for mapping list of DTOs to list of item response
        Type type = new TypeToken<List<ItemResponse>>() {
        }.getType();
        // set loans and payments, and return it.
        AllItemsResponse response = new AllItemsResponse();
        response.setLoans(modelMapper.map(allLoansDto, type));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/{category}")
    public ResponseEntity<ItemResponse> createItem(@PathVariable("category") ItemCategory itemCategory, @RequestBody @Valid ItemRequest itemRequest) {
        // map to dto
        ItemDto itemDto = modelMapper.map(itemRequest, ItemDto.class);
        // insert to item database
        ItemDto storedItemDto = itemService.createItem(itemCategory, itemDto);

        // return inserted item
        ItemResponse response = modelMapper.map(storedItemDto, ItemResponse.class);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{category}/{itemId}")
    public ResponseEntity<ItemResponse> updateItem(@PathVariable("category") ItemCategory itemCategory,
                                                   @PathVariable String itemId,
                                                   @RequestBody @Valid ItemRequest itemRequest) {
        // map to dto
        ItemDto itemDto = modelMapper.map(itemRequest, ItemDto.class);
        itemDto.setItemId(itemId);
        // insert to item database
        ItemDto storedItemDto = itemService.updateItem(itemCategory, itemDto);

        // return inserted item
        ItemResponse response = modelMapper.map(storedItemDto, ItemResponse.class);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }


    @PutMapping("approveLoan/{itemId}")
    public ResponseEntity<ItemResponse> ApproveLoan(@PathVariable String itemId) {
        
        // insert to item database
        ItemDto storedItemDto = itemService.ApproveRejectLoan(itemId,"approve");

        // return inserted item
        ItemResponse response = modelMapper.map(storedItemDto, ItemResponse.class);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("rejectLoan/{itemId}")
    public ResponseEntity<ItemResponse> RejectLoan(@PathVariable String itemId) {
        
        // insert to item database
        ItemDto storedItemDto = itemService.ApproveRejectLoan(itemId,"reject");

        // return inserted item
        ItemResponse response = modelMapper.map(storedItemDto, ItemResponse.class);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

 

    @DeleteMapping("/{category}/{itemId}")
    public ResponseEntity<Void> deleteItem(@PathVariable("category") ItemCategory itemCategory,
                                           @PathVariable String itemId) {
        // delete item from database
        itemService.deleteItem(itemCategory, itemId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    //private String getUserId() {
     //   return (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    //}

}
