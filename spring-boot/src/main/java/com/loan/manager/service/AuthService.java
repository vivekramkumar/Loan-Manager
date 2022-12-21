package com.loan.manager.service;

import com.loan.manager.shared.dto.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface AuthService extends UserDetailsService {

    UserDto createUser(UserDto userDto);

    UserDto getUserByEmail(String email);
    
    UserDto updateUser(UserDto userDto );

    UserDto getUserByUserId(String userId);
    
    List<UserDto> getallUsers();
}
