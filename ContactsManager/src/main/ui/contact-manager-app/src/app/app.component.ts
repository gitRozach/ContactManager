import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
} from "@angular/core";
import { NgForm } from "@angular/forms";
import { Contact } from "./interface/contact";
import { ContactService } from "./service/contact.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AppComponent implements OnInit, AfterViewInit {
  loading: boolean = true;
  title: string = "Contact Manager";
  contacts: Contact[] = [];
  contactToEdit: Contact | undefined = undefined;
  contactToDelete: Contact | undefined = undefined;
  selectedContact: Contact | undefined = undefined;
  teams: string[] = [];
  selectedTeam: string | undefined;
  searchText: string = "";
  searchCounter: { count: number } = { count: 0 };

  constructor(private contactService: ContactService) {}

  @HostListener("document:keydown.esc", ["$event"])
  onKeydownHandler(_: KeyboardEvent) {
    this.onSelectedContactChanged(undefined);
  }

  ngOnInit(): void {
    this.pullContacts();
  }

  ngAfterViewInit(): void {
    this.teams = this.findAllTeams(this.contacts);
    setTimeout(() => (this.loading = false), 2000);
  }

  private findAllTeams(contacts: Contact[]): string[] {
    if (!contacts) return [];
    return [...new Set(contacts.map((item) => item.team))];
  }

  public addContact(addContactForm: NgForm): void {
    if (!addContactForm) {
      console.log(
        "Could add a new Contact, because its value is:",
        addContactForm
      );
      return;
    }

    this.contactService
      .addContact({
        team: addContactForm.value.ngTeam,
        title: addContactForm.value.ngTitle,
        name: addContactForm.value.ngName,
        email: addContactForm.value.ngEmail,
        phoneNumber: addContactForm.value.ngPhoneNumber,
        imageUrl: addContactForm.value.ngImageUrl,
      } as Contact)
      .subscribe(
        (resp) => {
          console.log(resp);
          this.pullContacts();
        },
        (error) => {
          console.log(error);
        }
      );
    console.log("Added new Contact:", addContactForm);
  }

  public editContact(editContactForm: NgForm): void {
    if (!editContactForm) return;
    const contactToUpdate = {
      id: this.contactToEdit?.id,
      team: editContactForm.value.ngTeam,
      title: editContactForm.value.ngTitle,
      name: editContactForm.value.ngName,
      email: editContactForm.value.ngEmail,
      phoneNumber: editContactForm.value.ngPhoneNumber,
      imageUrl: editContactForm.value.ngImageUrl,
    } as Contact;

    this.contactService.updateContact(contactToUpdate).subscribe((resp) => {
      if (contactToUpdate === this.contactToEdit) {
        this.contactToEdit = undefined;
      }
      this.pullContacts();
      console.log("Edited Contact:", editContactForm);
    });
  }

  public removeContactToDelete(value: boolean): void {
    if (value && this.contactToDelete) {
      console.log("Trying to delete ID: ", this.contactToDelete?.id);
      this.removeContact(this.contactToDelete);
    }
  }

  public removeContact(contact: Contact): void {
    if (!contact) return;
    this.contactService.deleteContact(contact.id).subscribe((resp) => {
      console.log("Contact Manager Deleted Contact with id:", contact.id);
      if (contact === this.contactToDelete) {
        this.contactToDelete = undefined;
      }
      this.selectedContact = undefined;
      this.pullContacts();
    });
  }

  public onSearchTextChanged(searchValue: string): void {
    if (this.searchText === searchValue) return;
    this.searchText = searchValue;
  }

  public onTeamSelectionChanged(selectedTeam: string | undefined): void {
    if (this.selectedTeam === selectedTeam) return;
    this.selectedTeam = selectedTeam;
    console.log("Selected Team: ", this.selectedTeam);
  }

  public onContactToEditChanged(contact: Contact): void {
    if (this.contactToEdit === contact) return;
    this.contactToEdit = contact;
    console.log("Contact to edit: ", this.contactToEdit?.id);
  }

  public onContactToDeleteChanged(contact: Contact): void {
    if (this.contactToDelete === contact) return;
    this.contactToDelete = contact;
    console.log("Contact to delete: ", this.contactToDelete?.id);
  }

  public onSelectedContactChanged(contact: Contact | undefined): void {
    if (this.selectedContact === contact) {
      this.selectedContact = undefined;
      this.contactToEdit = undefined;
      this.contactToDelete = undefined;
      console.log("Contact selection reset.");
      return;
    }
    this.selectedContact = contact;
    this.contactToEdit = contact;
    this.contactToDelete = contact;
    console.log("Contact selected: ", this.selectedContact?.id);
  }

  public pullContacts(): void {
    this.contactService.pullContacts().subscribe((resp: Contact[]) => {
      this.contacts = resp;
      this.teams = this.findAllTeams(this.contacts);
      console.log("Contact Manager Loaded Contacts:", this.contacts);
      console.log("Contact Manager Found Teams:", this.teams);
    });
  }
}
