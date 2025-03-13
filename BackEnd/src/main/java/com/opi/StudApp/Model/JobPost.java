package com.opi.StudApp.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "job_post")
public class JobPost {
    @Id
    @Column(name = "post_id", nullable = false)
    private Integer id;

    @Column(name = "post_desc")
    private String postDesc;

    @Column(name = "post_profile")
    private String postProfile;

    @Column(name = "req_experience")
    private Integer reqExperience;

/*
 TODO [Reverse Engineering] create field to map the 'post_tech_stack' column
 Available actions: Define target Java type | Uncomment as is | Remove column mapping
    @Column(name = "post_tech_stack", columnDefinition = "varchar [](255)")
    private Object postTechStack;
*/
}