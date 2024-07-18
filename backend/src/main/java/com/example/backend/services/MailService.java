package com.example.backend.services;


import com.example.backend.models.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.services.user.ServiceUser;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Slf4j
@AllArgsConstructor
public class MailService {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender mailSender;

    private ServiceUser serviceUser;



    public void sendEmail(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("ahmedmailer2@gmail.com");
        message.setTo(toEmail);
        message.setText(body);
        message.setSubject(subject);

        mailSender.send(message);
        System.out.println("succ");

    }

    @Async
    public void sendEmailToUsersWithUserRole(String subject, String body) {
        List<User> usersWithUserRole = serviceUser.findUsersByRoles();

        for (User user : usersWithUserRole) {
            sendEmail(user.getEmail(), subject, body);
        }
    }


    public void sendEmailForm(String toEmail, String subject, String body, String username, String myEmail, String telephone) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("ahmedmailer2@gmail.com");
        message.setTo(toEmail);

        String emailBody = body + "\nUsername: " + username +  "\nEmail: " + myEmail + "\nTelephone: " + telephone ;


        message.setText(emailBody);
        message.setSubject(subject);

        mailSender.send(message);
        System.out.println("succ");

    }

    @Async
    public void sendEmailToUsersWithAdminRole(String subject, String body, String username, String myEmail, String telephone) {
        List<User> usersWithUserRole = serviceUser.findUsersByRoles();

        for (User user : usersWithUserRole) {
            sendEmailForm(user.getEmail(), subject, body, username, myEmail, telephone);
        }

    }
}
