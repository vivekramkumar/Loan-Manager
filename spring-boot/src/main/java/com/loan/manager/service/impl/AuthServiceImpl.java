package com.loan.manager.service.impl;

import com.loan.manager.exception.ResourceAlreadyExistsException;
import com.loan.manager.exception.ResourceNotFoundException;
import com.loan.manager.repository.UserRepository;
import com.loan.manager.repository.entity.UserEntity;
import com.loan.manager.service.AuthService;
import com.loan.manager.shared.dto.UserDto;
import com.loan.manager.shared.utils.JwtUtils;

import org.apache.commons.lang3.RandomStringUtils;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

    private final ModelMapper mapper;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtUtils jwtUtils;

    public AuthServiceImpl(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, JwtUtils jwtUtils
    ) {
        mapper = new ModelMapper();
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public UserDto createUser(UserDto userDto) {
        //check id email address already register
        if (userRepository.findByEmail(userDto.getEmail()).isPresent())
            throw new ResourceAlreadyExistsException("email.registered", "email=" + userDto.getEmail());

        // populate dto properties before inserting to database
        userDto.setUserId(RandomStringUtils.random(10, true, true));
        userDto.setEncryptedPassword(bCryptPasswordEncoder.encode(userDto.getPassword()));
        //store details to database
        UserEntity userEntity = mapper.map(userDto, UserEntity.class);
        UserEntity storedUserEntity = userRepository.save(userEntity);
        return mapper.map(storedUserEntity, UserDto.class);
    }

    @Override
    public UserDto getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(userEntity -> mapper.map(userEntity, UserDto.class))
                .orElseThrow(() -> {
                    throw new ResourceNotFoundException("email.not.found", "email=" + email);
                });
    }

    @Override
    public UserDto getUserByUserId(String userId) {
        return userRepository.findByUserId(userId)
                .map(userEntity -> mapper.map(userEntity, UserDto.class))
                .orElseThrow(() -> {
                    throw new ResourceNotFoundException("invalid.userId", "userId=" + userId);
                });
    }
     
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserDto userDto = getUserByEmail(email);
        return new User(userDto.getEmail(), userDto.getEncryptedPassword(), new ArrayList<>());
    }
    
    @Override
    public List<UserDto> getallUsers(){
        Iterable<UserEntity> userEntities = userRepository.findAll();

        java.lang.reflect.Type type = new TypeToken<List<UserDto>>() {
        }.getType();
        
        return mapper.map(userEntities, type);
    }

    @Override
    public UserDto updateUser(UserDto userDto) {
        UserEntity updatedUserEntity;
        // get item by user id -> update item -> save back to database
            Optional<UserEntity> userEntity = userRepository.findByUserId(userDto.getUserId());
            updateUser(userEntity.get(),userDto);
            System.out.println("update user service&&&&&&&&&&&&"+userEntity.get().getFirstName());
            updatedUserEntity = userRepository.save(userEntity.get());
        
        // map updated values to dto
        return mapper.map(updatedUserEntity, UserDto.class);
    }

    private void updateUser(UserEntity storedEntity, UserDto itemDto) {
        storedEntity.setFirstName(itemDto.getFirstName());
        storedEntity.setLastName(itemDto.getLastName());
    }


}

