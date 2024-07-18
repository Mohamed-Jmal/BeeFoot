package com.example.backend.services.user;


import com.example.backend.models.ERole;
import com.example.backend.models.Role;
import com.example.backend.models.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.services.ICRUDService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class ServiceUser implements ICRUDService<User,Long>, IServiceUser{

    @Autowired
    private UserRepository userRepository;


    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public User retrieveItem(Long idItem) {
        return userRepository.findById(idItem).get();
    }

    @Override
    public User add(User class1) {
        return userRepository.save(class1);
    }

    @Override
    public void delete(Long aLong) {
        userRepository.deleteById(aLong);
    }

    @Override
    public User update(User Classe1) {
        return userRepository.save(Classe1);
    }


    public List<User> findUsersByRoles(){
        List<User> users = new ArrayList<>();
        for(User user : userRepository.findAll()){
            for (Role role : user.getRoles()){
                if(role.getName().equals(ERole.ADMIN)){
                    users.add(user);
                }
            }
        }
        return users;
    }


    @Override
    public User findUserByUsername(String username) {
        return userRepository.findByUsername(username).get();
    }

}
