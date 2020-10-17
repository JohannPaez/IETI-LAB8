package com.eci.cosw.springbootsecureapi.controller;

import com.eci.cosw.springbootsecureapi.model.User;
import com.eci.cosw.springbootsecureapi.service.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import java.util.Date;

/**
 * @author Santiago Carrillo
 * 8/21/17.
 */
@RestController
@RequestMapping( "/user" )
@CrossOrigin(origins = "*")
public class UserController
{

    @Autowired
    private UserService userService;

    @RequestMapping( value = "/login", method = RequestMethod.POST )
    public Token login( @RequestBody User login )
        throws ServletException
    {

        String jwtToken = "";


        System.out.println("ENTRO 1");
        if ( login.getEmail() == null || login.getPassword() == null )
        {
            throw new ServletException( "Please fill in email and password" );
        }

        System.out.println("ENTRO 2");
        String emailLogin = login.getEmail();
        String password = login.getPassword();

        //TODO implement logic to verify user credentials
        User user = userService.getUser( 0l );

        if ( user == null )
        {
            throw new ServletException( "User username not found." );
        }

        System.out.println("ENTRO 3");
        String pwd = user.getPassword();
        String email = user.getEmail();

        if (!password.equals( pwd ) || !emailLogin.equals(email))
        {
            throw new ServletException( "Invalid login. Please check your name and password." );
        }
        System.out.println("ENTRO 4");
        //
        jwtToken = Jwts.builder().setSubject( email ).claim( "roles", "user" ).setIssuedAt( new Date() ).signWith(
            SignatureAlgorithm.HS256, "secretkey" ).compact();

        System.out.println("ENTRO");
        return new Token( jwtToken );
    }

    public class Token
    {

        String accessToken;


        public Token( String accessToken )
        {
            this.accessToken = accessToken;
        }


        public String getAccessToken()
        {
            return accessToken;
        }

        public void setAccessToken( String access_token )
        {
            this.accessToken = access_token;
        }
    }

}
