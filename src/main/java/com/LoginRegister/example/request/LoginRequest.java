package com.LoginRegister.example.request;

public class LoginRequest {
    
    public LoginRequest() {
        
    }
    
    public String getUserId() {
        return userId;
    }
    public void setUserId(String userId) {
        this.userId = userId;
    }
    public LoginRequest(String userId, String password) {
        this.userId = userId;
        this.password = password;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    private String userId;
    private String password;

}
