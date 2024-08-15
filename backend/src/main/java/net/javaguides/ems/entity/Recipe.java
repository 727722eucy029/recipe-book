package net.javaguides.ems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "recipe")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "Title")
    private String Title;

    @Column(name = "Description")
    private String Description;
    @Column(name = "Instruction")
    private String Instruction;
    @Column(name = "Ingredients")
    private String Ingredients;
    @Column(name = "Image")
    private String Image;
    @Column(name = "Img")
    private String Img;
    @Column(name = "Category")
    private String Category;
    @Column(name = "Status")
    private int Status;
    
    
    
   
}