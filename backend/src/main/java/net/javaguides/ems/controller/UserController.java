package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.UserDto;
import net.javaguides.ems.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class UserController {

    private UserService employeeService;

    // Build Add Employee REST API
    @PostMapping
    public ResponseEntity<UserDto> createEmployee(@RequestBody UserDto employeeDto){
        UserDto savedEmployee = employeeService.createEmployee(employeeDto);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }

    // Build Get Employee REST API
    @GetMapping("{id}")
    public ResponseEntity<UserDto> getEmployeeById(@PathVariable("id") Long employeeId){
        UserDto employeeDto = employeeService.getEmployeeById(employeeId);
        return ResponseEntity.ok(employeeDto);
    }

    // Build Get All Employees REST API
    @GetMapping
    public ResponseEntity<List<UserDto>> getAllEmployees(){
        List<UserDto> employees = employeeService.getAllEmployees();
        return ResponseEntity.ok(employees);
    }

    // Build Update Employee REST API
    @PutMapping("{id}")
    public ResponseEntity<UserDto> updateEmployee(@PathVariable("id") Long employeeId,
                                                      @RequestBody UserDto updatedEmployee){
          UserDto employeeDto = employeeService.updateEmployee(employeeId, updatedEmployee);
          return ResponseEntity.ok(employeeDto);
    }

    // Build Delete Employee REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long employeeId){
        employeeService.deleteEmployee(employeeId);
        return ResponseEntity.ok("Employee deleted successfully!.");
    }
}
