package dev.rozach.contactsmanager.service;

import dev.rozach.contactsmanager.exception.ContactNotFoundException;
import dev.rozach.contactsmanager.model.Contact;
import dev.rozach.contactsmanager.repo.ContactRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.UUID;

@Service
@Transactional
public class ContactService {
    private final ContactRepo contactRepo;

    @Autowired
    public ContactService(ContactRepo contactRepo) {
        this.contactRepo = contactRepo;
    }

    public Contact addContact(Contact contact) {
        contact.setContactCode(UUID.randomUUID().toString());
        return this.contactRepo.save(contact);
    }

    public List<Contact> findAllContacts() {
        return this.contactRepo.findAll();
    }

    public Contact updateContact(Contact contact) {
        return this.contactRepo.save(contact);
    }

    public Contact findContactById(Long id) {
        return this.contactRepo.findContactById(id).orElseThrow(() -> new ContactNotFoundException("Contact with ID " + id + " does not exist."));
    }

    public void deleteContact(Long id) {
        this.contactRepo.deleteContactById(id);
    }
}
