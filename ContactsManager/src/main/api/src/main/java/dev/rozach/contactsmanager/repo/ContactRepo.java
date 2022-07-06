package dev.rozach.contactsmanager.repo;

import dev.rozach.contactsmanager.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ContactRepo extends JpaRepository<Contact, Long> {
    void deleteContactById(Long id);
    Optional<Contact> findContactById(Long id);
}
