package net.javaguides.ems.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDto {
    private Long id;
    private String title;
    private String description;
    private String instruction;
    private String ingredients;
    private String image;
    private String img;
    private String category;
    private int status;
}