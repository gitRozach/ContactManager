package dev.rozach.contactsmanager;

import dev.rozach.contactsmanager.model.Contact;
import dev.rozach.contactsmanager.service.ContactService;
import dev.rozach.contactsmanager.utils.ContactsManagerControllerUtils;
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
        String formatName = ContactsManagerControllerUtils.tryToFormatName(contact.getName());
        String formatTeam = ContactsManagerControllerUtils.tryToFormatTeam(contact.getTeam());
        String formatTitle = ContactsManagerControllerUtils.tryToFormatTitle(contact.getTitle());
        String formatEmail = ContactsManagerControllerUtils.tryToFormatEmail(contact.getEmail());
        String formatPhoneNumber = ContactsManagerControllerUtils.tryToFormatPhoneNumber(contact.getPhoneNumber());
        String formatImageURL = ContactsManagerControllerUtils.tryToFormatImageURL(contact.getImageUrl());

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
