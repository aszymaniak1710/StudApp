package com.opi.StudApp.Controller;

import com.opi.StudApp.Model.Enum.AuthProvider;
import com.opi.StudApp.Model.User;
import com.opi.StudApp.Service.UserService.JwtService;
import com.opi.StudApp.Service.UserService.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
public class UserController {

    @Autowired
    private ClientRegistrationRepository clientRegistrationRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        User existingUser = userService.findByUsername(user.getUsername());

        if (existingUser != null) {
            return new ResponseEntity<>("User already exists.", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(userService.addUser(user), HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<List<String>> login(@RequestBody User user) {
        System.out.println(user);
        if(!userService.isLocalUser(user)){
            return new ResponseEntity<>(List.of("Acoount was not created locally"), HttpStatus.NOT_FOUND);
        }
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        List<String> response = new ArrayList<>();
        if (authentication.isAuthenticated()) {
            response.add(jwtService.generateToken(user.getUsername()));
            response.add(String.valueOf(userService.getRole(user.getUsername())));
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(List.of("Login Failed"), HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/initgooglelogin")
    public String getGoogleAuthUrl(@RequestBody String state, HttpSession session) {
        // Zapisujemy state do sesji
        session.setAttribute("state", state);  // Zapisujemy customowy state w sesji

        // Pobieramy dane rejestracji klienta Google
        ClientRegistration clientRegistration = clientRegistrationRepository.findByRegistrationId("google");

        // Tworzymy OAuth2AuthorizationRequest z własnym `state`
        OAuth2AuthorizationRequest authorizationRequest = OAuth2AuthorizationRequest.authorizationCode()
                .authorizationUri(clientRegistration.getProviderDetails().getAuthorizationUri())
                .clientId(clientRegistration.getClientId())
                .redirectUri("http://localhost:8080/login/oauth2/code/google")  // Ustawiamy nowy `redirectUri`
                .scopes(clientRegistration.getScopes())
                .state(state)  // Wstawiamy nasz `state`
                .build();

        // Zapisujemy pełne authorizationRequest w sesji, nie tylko state
        session.setAttribute("authorizationRequest", authorizationRequest);

        // Tworzymy link do autoryzacji
        String authorizationUri = authorizationRequest.getAuthorizationRequestUri();

        return authorizationUri;
    }



    @PostMapping("/finishgooglelogin")
    public ResponseEntity<String> finishGoogleLogin(@RequestBody String tempPassword){
        User user = userService.getUserByTempPassword(tempPassword);
        String jwt = jwtService.generateToken(user.getUsername());
        String role = user.getUserrole().name();
        return new ResponseEntity<>(String.format("{[\"%s\", \"%s\"]}", jwt, role), HttpStatus.OK);
    }

//    @PostMapping("/headadmin/setrole/{roleID}")
//    public ResponseEntity<String> setUserAsAdmin(@RequestBody User user, @PathVariable int roleID) {
//
//        return new ResponseEntity<>(userService.setUserAsAdmin(user), HttpStatus.OK);
//    }
//
//    @GetMapping("/headadmin/{username}/password")
//    public ResponseEntity<String> remindPassword(@PathVariable String username){
//        User existingUser = userService.findByUsername(username);
//
//        if (existingUser == null) {
//            return new ResponseEntity<>("User does not exist", HttpStatus.BAD_REQUEST);
//        }
//
//        existingUser.setPassword("REMEMBER");
//        userService.addUser(existingUser);
//        return new ResponseEntity<>("New Password: \"REMEMBER\"", HttpStatus.MOVED_PERMANENTLY);
//    }
//
//    @GetMapping("changepassword")
//    public ResponseEntity<String> changePassword(@RequestHeader(HttpHeaders.AUTHORIZATION) String authorizationHeader, @RequestBody String password){
//
//        String token = authorizationHeader.substring(7);
//
//        User user = userService.findByUsername(jwtService.extractEmail(token));
//        user.setPassword(password);
//        userService.addUser(user);
//        return new ResponseEntity<>("Password changed", HttpStatus.OK);
//    }
//
//    @PostMapping("/forgot-password")
//    public ResponseEntity<String> forgotPassword(@RequestBody String email) {
//        return userService.resetPassword(email);
//        return null;
//    }
}