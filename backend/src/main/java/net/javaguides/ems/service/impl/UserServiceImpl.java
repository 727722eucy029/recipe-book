package net.javaguides.ems.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.UserDto;
import net.javaguides.ems.entity.User;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.UserMapper;
import net.javaguides.ems.repository.UserRepository;
import net.javaguides.ems.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository employeeRepository;

    @Override
    public UserDto createEmployee(UserDto employeeDto) {

        User employee = UserMapper.mapToEmployee(employeeDto);
        User savedEmployee = employeeRepository.save(employee);
        return UserMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public UserDto getEmployeeById(Long employeeId) {
        User employee = employeeRepository.findById(employeeId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Employee is not exists with given id : " + employeeId));

        return UserMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<UserDto> getAllEmployees() {
        List<User> employees = employeeRepository.findAll();
        return employees.stream().map((employee) -> UserMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public UserDto updateEmployee(Long employeeId, UserDto updatedEmployee) {

        User employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee is not exists with given id: " + employeeId)
        );

        employee.setUserName(updatedEmployee.getUserName());
        employee.setPass(updatedEmployee.getPass());
        employee.setEmail(updatedEmployee.getEmail());

        User updatedEmployeeObj = employeeRepository.save(employee);

        return UserMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {

        User employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee is not exists with given id: " + employeeId)
        );

        employeeRepository.deleteById(employeeId);
    }
}
