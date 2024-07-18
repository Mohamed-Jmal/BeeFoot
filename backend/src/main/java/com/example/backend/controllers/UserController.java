package com.example.backend.controllers;


import com.example.backend.models.*;
import com.example.backend.payload.request.SignupRequest;
import com.example.backend.payload.response.MessageResponse;
import com.example.backend.repository.RoleRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.services.user.ServiceUser;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@AllArgsConstructor
@RequestMapping("user")
public class UserController {

    UserRepository userRepository;


    ServiceUser serviceUser;

    RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;


    @GetMapping("findAll")
    public List<User> findAll(){
        return serviceUser.findAll();
    }

    @GetMapping("retrieveItem/{idItem}")
    public User retrieveItem(@PathVariable("idItem") Long idItem){
        return serviceUser.retrieveItem(idItem);
    }



    @PostMapping("add")
    public User add(@RequestBody User class1){
        return serviceUser.add(class1);
    }
    /*@PostMapping(value="/addUserWithImage",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public User addUserWithImage(@RequestPart("user") User class1,
                                 @RequestPart("imageFile") MultipartFile[] file){
        try {
            Set<ImageUser> images = uploadImage(file);
            class1.setUserImages(images);
            encoder.encode(class1.getPassword());
            encoder.encode(class1.getConfirmPassword());
        return serviceUser.add(class1);
        }catch(Exception e){
            System.out.println(e.getMessage());
            return null ;
        }
    }*/

    @PostMapping(value="/addUserWithImage",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> addUserWithImage(@Valid @RequestPart("user") SignupRequest signUpRequest,
                                           @RequestPart("imageFile") MultipartFile[] file) {

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }
        if (!signUpRequest.getPassword().equals(signUpRequest.getConfirmPassword())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Passwords do not match!"));
        }

        try {
            // Create new user's account
            User user = new User(signUpRequest.getUsername(),
                    signUpRequest.getEmail(),
                    signUpRequest.getFullName(),
                    signUpRequest.getPhoneNumber(),
                    signUpRequest.getGender(),
                    encoder.encode(signUpRequest.getPassword()),
                    encoder.encode(signUpRequest.getConfirmPassword()));

            Set<String> strRoles = signUpRequest.getRole();
            Set<Role> roles = new HashSet<>();

            if (strRoles == null) {
                Role userRole = roleRepository.findByName(ERole.MODERATOR)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(userRole);
            } else {
                strRoles.forEach(role -> {
                    switch (role) {
                        case "admin":
                            Role adminRole = roleRepository.findByName(ERole.ADMIN)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(adminRole);

                            break;
                        case "user":
                            Role userRole = roleRepository.findByName(ERole.USER)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(userRole);

                            break;
                        default:
                            Role modRole = roleRepository.findByName(ERole.MODERATOR)
                                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                            roles.add(modRole);
                    }
                });
            }
            Set<ImageUser> images = uploadImage(file);
            user.setUserImages(images);
            user.setRoles(roles);
            userRepository.save(user);
            return ResponseEntity.ok(new MessageResponse("User registered successfully!"));

        }catch(Exception e){
            System.out.println(e.getMessage());
            return null ;
        }
    }
    public Set<ImageUser> uploadImage(MultipartFile[] multipartFiles)  throws IOException {
        Set<ImageUser> imageSModels = new HashSet<>();
        for(MultipartFile file : multipartFiles){
            ImageUser imageSModel =new ImageUser(
                    file.getOriginalFilename(),
                    file.getContentType(),
                    file.getBytes()
            );
            imageSModels.add(imageSModel);
        }
        return imageSModels ;
    }

    @DeleteMapping("delete/{aLong}")
    public void delete(@PathVariable("aLong") Long aLong){
        serviceUser.delete(aLong);
    }
    @PutMapping("update")
    public User update(@RequestBody User Classe1){
        return serviceUser.update(Classe1);
    }

    @GetMapping("findByUsername/{username}")
    public User findUserByUsername(@PathVariable("username") String username){
        return serviceUser.findUserByUsername(username);
    }

   /* @PutMapping(value="/updateUserWithImage",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> updateUserWithImage(@Valid @RequestPart("user") SignupRequest signUpRequest,
                                              @RequestPart("imageFile") MultipartFile[] file) {
        if(!(signUpRequest.getid()>0)){
            if (userRepository.existsByUsername(signUpRequest.getUsername())) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Username is already taken!"));
            }

            if (userRepository.existsByEmail(signUpRequest.getEmail())) {
                return ResponseEntity
                        .badRequest()
                        .body(new MessageResponse("Error: Email is already in use!"));
            }
        }
        try {
            // Create new user's account
            User user = new User(signUpRequest.getUsername(),
                    signUpRequest.getEmail(),
                    signUpRequest.getFullName(),
                    signUpRequest.getPhoneNumber(),
                    signUpRequest.getGender(),
                    encoder.encode(signUpRequest.getPassword()),
                    encoder.encode(signUpRequest.getConfirmPassword()));
            Set<ImageUser> images = uploadImage(file);
            user.setUserImages(images);
            userRepository.save(user);
            return ResponseEntity.ok(new MessageResponse("User registered successfully!"));

        }catch(Exception e){
            System.out.println(e.getMessage());
            return null ;
        }
    }*/

    @PutMapping(value="/updateUserWithImage",consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> updateUserWithImage(@Valid @RequestPart("user") SignupRequest signUpRequest,
                                                 @RequestPart("imageFile") MultipartFile[] file) {
        try {
            if(signUpRequest.getid() > 0){
                // Check if the user with the given ID exists
                Optional<User> optionalUser = userRepository.findById(signUpRequest.getid());

                if (optionalUser.isPresent()) {
                    User existingUser = optionalUser.get();

                    // Update existing user's data
                    existingUser.setUsername(signUpRequest.getUsername());
                    existingUser.setEmail(signUpRequest.getEmail());
                    existingUser.setFullName(signUpRequest.getFullName());
                    existingUser.setPhoneNumber(signUpRequest.getPhoneNumber());
                    existingUser.setGender(signUpRequest.getGender());
                    /*existingUser.setPassword(encoder.encode(signUpRequest.getPassword()));
                    existingUser.setConfirmPassword(encoder.encode(signUpRequest.getConfirmPassword()));*/
                    // Check if passwords are to be updated and they match

                    if (!signUpRequest.getPassword().equals(signUpRequest.getConfirmPassword())) {
                        existingUser.setPassword(encoder.encode(signUpRequest.getPassword()));
                        existingUser.setConfirmPassword(encoder.encode(signUpRequest.getConfirmPassword()));
                        return ResponseEntity
                                .badRequest()
                                .body(new MessageResponse("Error: Passwords do not match!"));
                    }

                    // Update user images
                    Set<ImageUser> images = uploadImage(file);
                    existingUser.setUserImages(images);

                    // Save the updated user
                    userRepository.save(existingUser);

                    return ResponseEntity.ok(new MessageResponse("User updated successfully!"));
                } else {
                    return ResponseEntity.badRequest().body(new MessageResponse("Error: User not found"));
                }
            } else {
                // Create new user's account
                User newUser = new User(signUpRequest.getUsername(),
                        signUpRequest.getEmail(),
                        signUpRequest.getFullName(),
                        signUpRequest.getPhoneNumber(),
                        signUpRequest.getGender(),
                        encoder.encode(signUpRequest.getPassword()),
                        encoder.encode(signUpRequest.getConfirmPassword()));
                Set<ImageUser> images = uploadImage(file);
                newUser.setUserImages(images);
                userRepository.save(newUser);
                return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
            }
        } catch(Exception e){
            // Handle exceptions appropriately
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new MessageResponse("Error: Internal Server Error"));
        }
    }






}
