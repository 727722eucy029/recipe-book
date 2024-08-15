package net.javaguides.ems.service;

import net.javaguides.ems.dto.UserDto;

import java.util.List;

public interface UserService {
    UserDto createEmployee(UserDto employeeDto);

    UserDto getEmployeeById(Long employeeId);

    List<UserDto> getAllEmployees();

    UserDto updateEmployee(Long employeeId, UserDto updatedEmployee);

    void deleteEmployee(Long employeeId);
}
