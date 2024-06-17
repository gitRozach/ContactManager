package dev.rozach.contactsmanager.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
public class Contact implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false, updatable = false)
    private Long id;
    private String team;
    private String title;
    private String name;
    private String email;
    private String phoneNumber;
    private String imageUrl;
    @Column(nullable = false, updatable = false)
    private String contactCode;

    public Contact(){}

    public Contact(String team, String title, String name, String email, String phoneNumber, String imageUrl, String contactCode) {
        this.team = team;
        this.title = title;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.imageUrl = imageUrl;
        this.contactCode = contactCode;
    }

    @Override
    public String toString() {
        return
            "Contact {" +
            "id='" + this.id +
            ", team='" + this.team +  '\''+
            ", title='" + this.title + '\''+
            ", name='" + this.name + '\''+
            ", email='" + this.email + '\''+
            ", phoneNumber='" + this.phoneNumber + '\''+
            ", imageUrl='" + this.imageUrl + '\''+ "}";
    }

    public Long getId() { return this.id; }

    public String getTeam() {
        return this.team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getImageUrl() {
        return this.imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getContactCode() {
        return this.contactCode;
    }

    public void setContactCode(String contactCode) {this.contactCode = contactCode;}
}
