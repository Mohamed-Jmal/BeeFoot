package com.example.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
/*import javax.validation.Validator.*;
import jakarta.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;*/

@Entity
@AllArgsConstructor
@Getter
@Setter
@Table(	name = "user",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "username"),
                @UniqueConstraint(columnNames = "email")
        })
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 20)
    private String username;

    @NotBlank
    @Size(max = 20)
    private String fullName;

    @NotBlank
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank
    @Size(max = 120)
    private String password;
    @NotBlank
    @Size(max = 120)
    private String confirmPassword;

    private String gender;



    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    private String phoneNumber;

    @ManyToMany(fetch= FetchType.EAGER ,cascade = CascadeType.ALL)
    @JoinTable(name="user_images",
            joinColumns = {
                    @JoinColumn(name="user_id")
            },inverseJoinColumns = {
            @JoinColumn(name = "image_id")
    }
    )
    private Set<ImageUser> userImages;




    //les jointures
    @OneToMany
    @JsonIgnore
    private List<Booking> bookingList;

    @ManyToOne
    @JsonIgnore
    private Review review;



    public User() {
    }
    public User(String username, String email,String fullName,String phoneNumber,String gender, String password,String confirmPassword){
        this.username=username;
        this.email=email;
        this.fullName=fullName;
        this.phoneNumber=phoneNumber;
        this.gender=gender;
        this.password=password;
        this.confirmPassword=confirmPassword;
    }

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }


    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }
}
