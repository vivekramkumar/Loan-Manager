package com.loan.manager.service.impl;

import com.loan.manager.exception.ResourceNotFoundException;
import com.loan.manager.repository.PaymentRepository;
import com.loan.manager.repository.LoanRepository;
import com.loan.manager.repository.UserRepository;
import com.loan.manager.repository.entity.PaymentEntity;
import com.loan.manager.repository.entity.LoanEntity;
import com.loan.manager.repository.entity.ItemEntity;
import com.loan.manager.repository.entity.UserEntity;
import com.loan.manager.service.ItemService;
import com.loan.manager.shared.dto.ItemDto;
import com.loan.manager.shared.type.ItemCategory;
import org.apache.commons.lang3.RandomStringUtils;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
import java.text.MessageFormat;
import java.util.List;
import java.util.function.Supplier;

import javax.transaction.Transactional;

@Service
@Transactional
public class ItemServiceImpl implements ItemService {

    private final ModelMapper mapper;
    private final LoanRepository loanRepo;
    private final PaymentRepository paymentRepo;
    private final UserRepository userRepo;

    public ItemServiceImpl(LoanRepository loanRepo, PaymentRepository paymentRepo, UserRepository userRepo) {
        this.loanRepo = loanRepo;
        this.paymentRepo = paymentRepo;
        this.userRepo = userRepo;
        this.mapper = new ModelMapper();
    }

    @Override
    public List<ItemDto> getAllLoansByUserId() {
        UserEntity userEntity = getUserEntity();
        //Iterable<LoanEntity> loanEntities = loanRepo.findAllByUserDetails(userEntity);
        List<LoanEntity> loanEntities = loanRepo.findAllByUserDetailsOrderByDateDesc(userEntity);
        Type type = new TypeToken<List<ItemDto>>() {
        }.getType();
        return mapper.map(loanEntities, type);
    }

    @Override
    public List<ItemDto> getAllPaymentsByUserId() {
        UserEntity userEntity = getUserEntity();
        //Iterable<LoanEntity> loanEntities = loanRepo.findAllByUserDetails(userEntity);
        List<PaymentEntity> loanEntities = paymentRepo.findAllByUserDetailsOrderByDateDesc(userEntity);
        Type type = new TypeToken<List<ItemDto>>() {
        }.getType();
        return mapper.map(loanEntities, type);
    }

    @Override
    public ItemDto createItem(ItemCategory itemCategory, ItemDto itemDto) {
        itemDto.setItemId(RandomStringUtils.random(10, true, true));
        ItemEntity storedItemEntity;
        if (itemCategory == ItemCategory.LOAN) {
            LoanEntity loanEntity = mapper.map(itemDto, LoanEntity.class);
            loanEntity.setUserDetails(getUserEntity());
            loanEntity.setStatus("pending");
            storedItemEntity = loanRepo.save(loanEntity);
        } else {
            PaymentEntity paymentEntity = mapper.map(itemDto, PaymentEntity.class);
            paymentEntity.setUserDetails(getUserEntity());
            storedItemEntity = paymentRepo.save(paymentEntity);
        }
        return mapper.map(storedItemEntity, ItemDto.class);
    }

    @Override
    public ItemDto updateItem(ItemCategory itemCategory, ItemDto itemDto) {
        ItemEntity updatedItemEntity;
        // get item by user id -> update item -> save back to database
        if (itemCategory == ItemCategory.LOAN) {
            LoanEntity loanEntity = loanRepo.findByItemId(itemDto.getItemId())
                    .orElseThrow(getInvalidIdException(itemDto.getItemId()));
            updateItem(loanEntity, itemDto);
            updatedItemEntity = loanRepo.save(loanEntity);
        } else {
            PaymentEntity paymentEntity = paymentRepo.findByItemId(itemDto.getItemId())
                    .orElseThrow(getInvalidIdException(itemDto.getItemId()));
            updateItem(paymentEntity, itemDto);
            updatedItemEntity = paymentRepo.save(paymentEntity);
        }
        // map updated values to dto
        return mapper.map(updatedItemEntity, ItemDto.class);
    }

    @Override
    public ItemDto ApproveRejectLoan(String ItemID, String status) {
        ItemEntity updatedItemEntity;
       
            LoanEntity loanEntity = loanRepo.findByItemId(ItemID)
                    .orElseThrow(getInvalidIdException(ItemID));
            loanEntity.setStatus(status);
            updatedItemEntity = loanRepo.save(loanEntity);
       
        // map updated values to dto
        return mapper.map(updatedItemEntity, ItemDto.class);
    }
    @Override
    public void deleteItem(ItemCategory itemCategory, String itemId) {
        // get item by user id -> delete item if found Or else throw exception
        if (itemCategory == ItemCategory.LOAN) {
            LoanEntity loanEntity = loanRepo.findByItemId(itemId)
                    .orElseThrow(getInvalidIdException(itemId));
            loanRepo.delete(loanEntity);
        } else {
            PaymentEntity paymentEntity = paymentRepo.findByItemId(itemId)
                    .orElseThrow(getInvalidIdException(itemId));
            paymentRepo.delete(paymentEntity);
        }
    }

    private void updateItem(ItemEntity storedEntity, ItemDto itemDto) {
        storedEntity.setDescription(itemDto.getDescription());
        storedEntity.setAmount(itemDto.getAmount());
        storedEntity.setDate(itemDto.getDate());
    }

    private UserEntity getUserEntity() {
        String userId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepo.findByUserId(userId)
                .orElseThrow(() -> {
                    throw new ResourceNotFoundException("invalid.userId", "userId=" + userId);
                });
    }

    private Supplier<RuntimeException> getInvalidIdException(String itemId) {
        return () -> {
            String errorMsg = MessageFormat.format("itemId={0} userId={1}", itemId, getUserEntity().getUserId());
            throw new ResourceNotFoundException("invalid.itemId", errorMsg);
        };
    }
    @Override
    public List<ItemDto> getAllPendingLoans(){
        List<LoanEntity> loanEntities = loanRepo.findAllByStatus("pending");
        Type type = new TypeToken<List<ItemDto>>() {
        }.getType();
        return mapper.map(loanEntities, type);
    }
}
