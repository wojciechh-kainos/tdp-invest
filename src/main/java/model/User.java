package model;

import java.security.Principal;

public class User implements Principal{
    private final String mail;

    public User(String mail) {
        this.mail = mail;
    }

    public String getName() {
        return mail;
    }

    public int getId() {
        return (int) (Math.random() * 100);
    }


}
