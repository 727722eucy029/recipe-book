package net.javaguides.ems.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.RecipeDto;
import net.javaguides.ems.service.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/recipe")
public class RecipeController {

    private RecipeService departmentService;

    // Build Create or Add Department REST API
    @PostMapping
    public ResponseEntity<RecipeDto> createDepartment(@RequestBody RecipeDto departmentDto){
        RecipeDto department = departmentService.createDepartment(departmentDto);
        return new ResponseEntity<>(department, HttpStatus.CREATED);
    }

    // Build Get Department REST API
    @GetMapping("/{id}")
    public ResponseEntity<RecipeDto> getDepartmentById(@PathVariable("id") Long departmentId){
        RecipeDto departmentDto = departmentService.getDepartmentById(departmentId);
        return ResponseEntity.ok(departmentDto);
    }

    // Build Get All Departments REST API
    @GetMapping()
    public ResponseEntity<List<RecipeDto>> getAllDepartments(){
        List<RecipeDto> departments = departmentService.getAllDepartments();
        return ResponseEntity.ok(departments);
    }

    // Build Update Department REST API
 // Build Update Department REST API
    @PutMapping("{id}")
    public ResponseEntity<RecipeDto> updateDepartment(@PathVariable("id") Long departmentId,
                                                      @RequestBody RecipeDto updatedDepartment) {
        RecipeDto departmentDto = departmentService.updateDepartment(departmentId, updatedDepartment);
        return ResponseEntity.ok(departmentDto);
    }

    
    // Build Delete Department REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteDepartment(@PathVariable("id") Long departmentId){
        departmentService.deleteDepartment(departmentId);
        return ResponseEntity.ok("Department deleted successfully!.");
    }

}