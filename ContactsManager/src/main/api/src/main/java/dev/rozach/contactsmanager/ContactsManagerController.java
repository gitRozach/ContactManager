package dev.rozach.contactsmanager;

import dev.rozach.contactsmanager.model.Contact;
import dev.rozach.contactsmanager.service.ContactService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/contact")
public class ContactsManagerController {
    private final ContactService contactService;

    public ContactsManagerController(ContactService contactService) {
        this.contactService = contactService;
    }
    private String capitalize(String value) {
        return value.substring(0, 1).toUpperCase() + value.substring(1).toLowerCase();
    }
    public String tryToFormatName(String name) {
        if (name == null || name.trim().length() < 2) return null;
        return Arrays.stream(name.length() > Config.MAX_NAME_LENGTH ? name.substring(0, Config.MAX_NAME_LENGTH).split(" ") : name.split(" "))
                .map(value -> this.capitalize(value) + " ")
                .collect(Collectors.joining()).trim();
    }

    public String tryToFormatTeam(String team) {
        if (team == null || team.length() < 1) return null;
        return this.capitalize(team.length() > Config.MAX_TEAM_LENGTH ? team.substring(0, Config.MAX_TEAM_LENGTH) : team);
    }

    public String tryToFormatTitle(String title) {
        if (title == null || title.length() < 1) return null;
        return this.capitalize(title.length() > Config.MAX_TITLE_LENGTH ? title.substring(0, Config.MAX_TITLE_LENGTH) : title);
    }

    public String tryToFormatEmail(String email) {
        if (email == null || email.length() < 1) return null;
        // TODO EMAIL Pattern pruefen
        return email.length() > Config.MAX_EMAIL_LENGTH ? email.substring(0, Config.MAX_EMAIL_LENGTH) : email;
    }

    public String tryToFormatPhoneNumber(String phoneNumber) {
        if (phoneNumber == null || phoneNumber.length() < 3) return null;
        // TODO Ziffern kontrollieren
        return phoneNumber.length() > Config.MAX_PHONE_NUMBER_LENGTH ? phoneNumber.substring(0, Config.MAX_PHONE_NUMBER_LENGTH) : phoneNumber;
    }

    public String tryToFormatImageURL(String imageURL) {
        if (imageURL == null || imageURL.length() < 3) return null;
        // TODO Ziffern kontrollieren
        return imageURL.length() > Config.MAX_IMAGE_URL_LENGTH ? imageURL.substring(0, Config.MAX_IMAGE_URL_LENGTH) : imageURL;
    }

    @RequestMapping("/")
    public ResponseEntity<String> test() {
        System.out.println("Hey hey");
        return new ResponseEntity<>("xd", HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Contact>> getAllContacts() {
        List<Contact> contacts = this.contactService.findAllContacts();
        return new ResponseEntity<>(contacts, HttpStatus.OK);
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Contact> getContactById(@PathVariable("id") Long id) {
        Contact contact = this.contactService.findContactById(id);
        return new ResponseEntity<>(contact, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Contact> addContact(@RequestBody Contact contact) {
        String formatName = tryToFormatName(contact.getName());
        String formatTeam = tryToFormatTeam(contact.getTeam());
        String formatTitle = tryToFormatTitle(contact.getTitle());
        String formatEmail = tryToFormatEmail(contact.getEmail());
        String formatPhoneNumber = tryToFormatPhoneNumber(contact.getPhoneNumber());
        String formatImageURL = tryToFormatImageURL(contact.getImageUrl());

        if (formatName == null ||
            formatTeam == null ||
            formatTitle == null ||
            formatEmail == null ||
            formatPhoneNumber == null ||
            formatImageURL == null) {
                return new ResponseEntity<>(contact, HttpStatus.BAD_REQUEST);
        }

        contact.setName(formatName);
        contact.setTeam(formatTeam);
        contact.setTitle(formatTitle);
        contact.setEmail(formatEmail);
        contact.setPhoneNumber(formatPhoneNumber);
        contact.setImageUrl(formatImageURL);
        Contact newContact = this.contactService.addContact(contact);
        return new ResponseEntity<>(newContact, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<Contact> updateContact(@RequestBody Contact contact) {
        Contact newContact = this.contactService.updateContact(contact);
        return new ResponseEntity<>(newContact, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteContact(@PathVariable Long id) {
        this.contactService.deleteContact(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
