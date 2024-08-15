package net.javaguides.ems.mapper;

import net.javaguides.ems.dto.RecipeDto;
import net.javaguides.ems.entity.Recipe;

public class RecipeMapper {

    // convert department jpa entity into department dto
    public static RecipeDto mapToDepartmentDto(Recipe department){
        return new RecipeDto(
                department.getId(),
                department.getTitle(),
                department.getDescription(),
                department.getInstruction(),
                department.getIngredients(),
                department.getImage(),
                department.getImg(),
                department.getCategory(),
                department.getStatus()
        );
    }

    // convert department dto into department jpa entity
    public static Recipe mapToDepartment(RecipeDto departmentDto){
        return new Recipe(
                departmentDto.getId(),
                departmentDto.getTitle(),
                departmentDto.getDescription(),
                departmentDto.getInstruction(),
                departmentDto.getIngredients(),
                departmentDto.getImage(),
                departmentDto.getImg(),
                departmentDto.getCategory(),
                departmentDto.getStatus()
        );
    }
}