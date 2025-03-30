package com.opi.StudApp.Service.UserService;

import com.opi.StudApp.Model.User;
import com.opi.StudApp.Model.UserPrincipal;
import com.opi.StudApp.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

        @Autowired
        private UserRepo userRepo;

        @Override
        public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

            User user = userRepo.findByUsername(username);
            if (user == null){
                System.out.println("User 404");
                throw new UsernameNotFoundException("User 404");
            }
            return new UserPrincipal(user);
        }
}
