package com.loan.manager.ui.controller;

import com.loan.manager.service.AuthService;
import com.loan.manager.shared.dto.UserDto;
import com.loan.manager.shared.utils.JwtUtils;
import com.loan.manager.ui.modal.request.UserLogin;
import com.loan.manager.ui.modal.request.UserRequest;
import com.loan.manager.ui.modal.response.AllUsersResponse;
import com.loan.manager.ui.modal.response.UserLoginResponse;
import com.loan.manager.ui.modal.response.UserResponse;

import aj.org.objectweb.asm.Type;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
@Validated
@Slf4j
public class AuthController {

    private final ModelMapper modelMapper;
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtTokenUtil;


    @Value("${client.url}")
    String clientUrl;

    public AuthController(AuthService authService, AuthenticationManager authenticationManager, JwtUtils jwtTokenUtil) {
        modelMapper = new ModelMapper();
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping(value = "/userLogin")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody @Valid UserLogin userLogin) throws BadCredentialsException {
        // check if email address verify or not
        UserDto userDto = authService.getUserByEmail(userLogin.getEmail());
        //userLogin.setloginType(userLogin.loginType);
    System.out.println("tesing type########  getuserType type"+userDto.getuserType());

    if(!(userDto.getuserType().equals("USER"))){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unauthorized");
    }
        
    // authenticate user
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                userLogin.getEmail(),
                userLogin.getPassword(),
                new ArrayList<>()
        ));


        //send jwt token back to user
        String jwtToken = jwtTokenUtil.generateToken(userDto.getUserId());
        UserLoginResponse loginresponse=new UserLoginResponse(jwtToken);
        loginresponse.setUserType(userDto.getuserType());
        return ResponseEntity.ok(loginresponse);
    }



    @PostMapping(value = "/adminLogin")
    public ResponseEntity<?> createAdminAuthenticationToken(@RequestBody @Valid UserLogin userLogin) throws BadCredentialsException {
        // check if email address verify or not
        UserDto userDto = authService.getUserByEmail(userLogin.getEmail());
        //userLogin.setloginType(userLogin.loginType);
    System.out.println("tesing type########  getuserType type"+userDto.getuserType());

    if(!(userDto.getuserType().equals("ADMIN"))){
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Unauthorized");
    }
        
    // authenticate user
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                userLogin.getEmail(),
                userLogin.getPassword(),
                new ArrayList<>()
        ));


        //send jwt token back to user
        String jwtToken = jwtTokenUtil.generateToken(userDto.getUserId());
        UserLoginResponse loginresponse=new UserLoginResponse(jwtToken);
        loginresponse.setUserType(userDto.getuserType());
        return ResponseEntity.ok(loginresponse);
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> createUser(@RequestBody @Valid UserRequest userRequest) {
        // map UserRequest to UserDto -> create user -> map to UserResponse -> send it to client
        UserDto userDto = modelMapper.map(userRequest, UserDto.class);
        UserDto storedUserDetails = authService.createUser(userDto);
       
      //  log.info("UserRegister -- create.user -- userId={}", storedUserDetails.getUserId());

        //send stored user details as response
        UserResponse returnValue = modelMapper.map(storedUserDetails, UserResponse.class);
        return new ResponseEntity<>(returnValue, HttpStatus.CREATED);
    }

    private String getAppBaseUrl() {
        return ServletUriComponentsBuilder.fromCurrentContextPath().build().toUriString();
    }

    @GetMapping(path="/users")
    public ResponseEntity<AllUsersResponse> getAllUsers() {
        List<UserDto> allUsersDto = authService.getallUsers();

        // type - for mapping list of DTOs to list of item response
        java.lang.reflect.Type type = new TypeToken<List<UserResponse>>() {
        }.getType();
        // set loans and payments, and return it.
        AllUsersResponse response = new AllUsersResponse();
        response.setUsers(modelMapper.map(allUsersDto, type));
        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @GetMapping(path="/userDetails")
    public ResponseEntity<UserResponse> getUserDetails(@RequestBody @Valid UserRequest userRequest) {
        UserDto userDto = authService.getUserByEmail(userRequest.getEmail());
        UserResponse response = new UserResponse();
        response.setEmail(userDto.getEmail());
        response.setFirstName(userDto.getFirstName());
        response.setLastName(userDto.getLastName());

        return new ResponseEntity<>(response, HttpStatus.OK);

    }


    @PutMapping("updateUser/{UserId}")
    public ResponseEntity<UserResponse> updateUser(@PathVariable String UserId, @RequestBody @Valid UserRequest userRequest) {
        // map to dto
        UserDto userDto = modelMapper.map(userRequest, UserDto.class);
        System.out.println("update%^&^%^&^%^&^%"+ userDto.getFirstName());

        userDto.setUserId(UserId);
        // insert to item database
        UserDto storedUserDto = authService.updateUser(userDto);
        // return inserted item
        System.out.println("storedDTO%^&^%^&^%^&^%"+ storedUserDto.getFirstName());

        UserResponse response = modelMapper.map(storedUserDto, UserResponse.class);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
}
