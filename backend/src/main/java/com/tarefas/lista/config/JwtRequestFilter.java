package com.tarefas.lista.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {
    
    @Autowired
    private JwtUtil jwtUtil;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
    throws ServletException,IOException{
       final String authorizationHeader = request.getHeader("Authorization");
     String username = null;
     String jwt = null;

      if (authorizationHeader != null && authorizationHeader.startsWith("Bearer")) {
        jwt = authorizationHeader.substring(7);
        try {
            username = jwtUtil.extractUsername(jwt);
        } catch (Exception e) {
            System.out.println("Erro ao processar token JWT" + e.getMessage() );
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
          }
      }
      if (username != null && SecurityContextHolder.getContext().getAuthentication()==null) {
        if (jwtUtil.validateToken(jwt, username)) {
            UsernamePasswordAuthenticationToken authToken =
             new UsernamePasswordAuthenticationToken(username, null, Collections.emptyList());
            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
           
        }
      }
     chain.doFilter(request, response);
    }
}
