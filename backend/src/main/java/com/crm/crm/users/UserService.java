package com.crm.crm.users;

import java.util.List;

import com.crm.crm.helpers.ApiResponse;

public interface UserService {
    public ApiResponse<List<User>> index();
    public ApiResponse<User> show(Long id);
    public ApiResponse<User> store(UserDTO userDTO);
    public ApiResponse<User> update(Long id, UserDTO user);
    public ApiResponse<Void> destroy(Long id);
}
