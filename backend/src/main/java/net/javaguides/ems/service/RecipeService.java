package net.javaguides.ems.service;

import net.javaguides.ems.dto.RecipeDto;

import java.util.List;

public interface RecipeService {
    RecipeDto createDepartment(RecipeDto departmentDto);

    RecipeDto getDepartmentById(Long departmentId);

    List<RecipeDto> getAllDepartments();

    RecipeDto updateDepartment(Long departmentId, RecipeDto updatedDepartment);

    void deleteDepartment(Long departmentId);
}