package net.javaguides.ems.mapper;

import net.javaguides.ems.dto.UserDto;
import net.javaguides.ems.entity.User;

public class UserMapper {

    public static UserDto mapToEmployeeDto(User employee){
        return new UserDto(
                employee.getId(),
                employee.getUserName(),
                employee.getPass(),
                employee.getEmail(),
                employee.getRole()
        );
    }

    public static User mapToEmployee(UserDto employeeDto){
        return new User(
                employeeDto.getId(),
                employeeDto.getUserName(),
                employeeDto.getPass(),
                employeeDto.getEmail(),
                employeeDto.getRole()
        );
    }
}
