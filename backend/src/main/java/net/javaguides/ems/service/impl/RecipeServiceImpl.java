package net.javaguides.ems.service.impl;

import lombok.AllArgsConstructor;
import net.javaguides.ems.dto.RecipeDto;
import net.javaguides.ems.entity.Recipe;
import net.javaguides.ems.exception.ResourceNotFoundException;
import net.javaguides.ems.mapper.RecipeMapper;
import net.javaguides.ems.repository.RecipeRepository;
import net.javaguides.ems.service.RecipeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;
    @Override
    public RecipeDto createDepartment(RecipeDto departmentDto) {
        Recipe department = RecipeMapper.mapToDepartment(departmentDto);
        Recipe savedDepartment = recipeRepository.save(department);
        return RecipeMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public RecipeDto getDepartmentById(Long departmentId) {
        Recipe department = recipeRepository.findById(departmentId).orElseThrow(
                () -> new ResourceNotFoundException("Department is not exists with a given id: " + departmentId)
        );
        return RecipeMapper.mapToDepartmentDto(department);
    }

    @Override
    public List<RecipeDto> getAllDepartments() {
        List<Recipe> departments = recipeRepository.findAll();
        return departments.stream().map((department) -> RecipeMapper.mapToDepartmentDto(department))
                .collect(Collectors.toList());
    }

    @Override
    public RecipeDto updateDepartment(Long departmentId, RecipeDto updatedDepartment) {
        Recipe department = recipeRepository.findById(departmentId).orElseThrow(
                () -> new ResourceNotFoundException("Department is not exists with a given id:" + departmentId)
        );

        department.setTitle(updatedDepartment.getTitle());
        department.setDescription(updatedDepartment.getDescription());
        department.setInstruction(updatedDepartment.getInstruction());
        department.setIngredients(updatedDepartment.getIngredients());
        department.setImage(updatedDepartment.getImage());
        department.setCategory(updatedDepartment.getCategory());
        department.setStatus(updatedDepartment.getStatus());

        Recipe savedDepartment = recipeRepository.save(department);

        return RecipeMapper.mapToDepartmentDto(savedDepartment);
    }

    @Override
    public void deleteDepartment(Long departmentId) {
        recipeRepository.findById(departmentId).orElseThrow(
                () -> new ResourceNotFoundException("Department is not exists with a given id: " + departmentId)
        );

        recipeRepository.deleteById(departmentId);
    }
}