package dev.rozach.contactsmanager;

import dev.rozach.contactsmanager.model.Contact;
import dev.rozach.contactsmanager.service.ContactService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contact")
public class ContactsManagerController {
    private final ContactService contactService;

    public ContactsManagerController(ContactService contactService) {
        this.contactService = contactService;
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
