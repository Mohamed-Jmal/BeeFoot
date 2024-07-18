package com.example.backend.controllers;


import com.example.backend.payload.request.EmailRequest;
import com.example.backend.services.MailService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@RequestMapping("email")
public class MailController {

    MailService mailService;

    @PostMapping("sendEmail")
    public void sendEmailToUsersWithAdminRole(@RequestBody EmailRequest emailRequest){
        mailService.sendEmailToUsersWithAdminRole(
                emailRequest.getSubject(),
                emailRequest.getBody(),
                emailRequest.getUsername(),
                emailRequest.getMyEmail(),
                emailRequest.getTelephone()
        );
    }

    @PostMapping("sendEmail2")
    public void sendEmailForm(@RequestBody String toEmail,@RequestBody String subject,@RequestBody String body,@RequestBody String username,@RequestBody String myEmail,@RequestBody String telephone) {
        mailService.sendEmailForm(toEmail,subject,body,username,myEmail,telephone);
    }
}
