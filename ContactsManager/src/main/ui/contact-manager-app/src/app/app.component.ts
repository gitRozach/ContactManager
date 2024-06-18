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
  screenWidth: number = -1;
  screenWidthSmallMax: number = 750;
  screenWidthMediumMax: number = 1400;
  screenWidthLargeMax: number = 2500;
  contactsPerRow: number = -1;
  loading: boolean = true;
  title: string = "Contact Manager";
  contacts: Contact[] = [];
  contactToEdit: Contact | undefined = undefined;
  contactToDelete: Contact | undefined = undefined;
  selectedContact: Contact | undefined = undefined;
  selectedContactIndex: number = -1;
  teams: string[] = [];
  selectedTeam: string | undefined;
  searchText: string = "";
  searchCounter: { count: number } = { count: 0 };

  constructor(private contactService: ContactService) {
    this.onResize();
  }

  @HostListener("window:resize", ["$event"])
  onResize() {
    this.screenWidth = window.innerWidth;
    this.contactsPerRow = this.evaluateContactsPerRowForScreenWidth(
      this.screenWidth
    );
  }

  @HostListener("document:keyup.esc", ["$event"])
  onEscapeKey(_: KeyboardEvent) {
    //this.onSelectedContactChanged(undefined);
    console.log("ESCAPE PRESSED");
  }

  private evaluateContactsPerRowForScreenWidth(width: number) {
    if (this.screenWidth <= this.screenWidthSmallMax) return 1;
    if (this.screenWidth <= this.screenWidthMediumMax) return 2;
    if (this.screenWidth <= this.screenWidthLargeMax) return 4;
    return 4;
  }

  private selectContactAtIndex(index: number) {
    if (index >= 0 && index < this.contacts.length) {
      this.selectedContactIndex = index;
      this.onSelectedContactChanged(this.contacts[index]);
    }
  }

  private evaluateSelectedContactTargetIndex(offset: number) {
    if (this.selectedContact) {
      if (this.selectedContactIndex === -1) {
        this.selectedContactIndex = this.contacts.indexOf(this.selectedContact);
      }
      return this.selectedContactIndex + offset;
    } else if (this.selectedContactIndex !== -1) {
      return this.selectedContactIndex;
    } else {
      return 0;
    }
  }

  @HostListener("document:keyup.arrowleft", ["$event"])
  onArrowLeftKey(_: KeyboardEvent) {
    this.selectContactAtIndex(this.evaluateSelectedContactTargetIndex(-1));
  }

  @HostListener("document:keyup.arrowright", ["$event"])
  onArrowRightKey(_: KeyboardEvent) {
    this.selectContactAtIndex(this.evaluateSelectedContactTargetIndex(1));
  }

  @HostListener("document:keyup.arrowup", ["$event"])
  onArrowUpKey(_: KeyboardEvent) {
    this.selectContactAtIndex(
      this.evaluateSelectedContactTargetIndex(-this.contactsPerRow)
    );
  }

  @HostListener("document:keyup.arrowdown", ["$event"])
  onArrowDownKey(_: KeyboardEvent) {
    this.selectContactAtIndex(
      this.evaluateSelectedContactTargetIndex(this.contactsPerRow)
    );
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
        "Could not add a new Contact, because its value is:",
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
    });
  }

  public removeContactToDelete(value: boolean): void {
    if (value && this.contactToDelete) {
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
      this.onSelectedContactChanged(undefined);
      this.pullContacts();
    });
  }

  public onSearchTextChanged(searchValue: string): void {
    if (this.searchText === searchValue) return;
    this.searchText = searchValue;
    this.onSelectedContactChanged(undefined);
  }

  public onTeamSelectionChanged(selectedTeam: string | undefined): void {
    if (this.selectedTeam === selectedTeam) return;
    this.selectedTeam = selectedTeam;
    this.onSelectedContactChanged(undefined);
  }

  public onContactToEditChanged(contact: Contact): void {
    if (this.contactToEdit === contact) return;
    this.onSelectedContactChanged(contact);
  }

  public onContactToDeleteChanged(contact: Contact): void {
    if (this.contactToDelete === contact) return;
    this.onSelectedContactChanged(contact);
  }

  public onSelectedContactChanged(contact: Contact | undefined): void {
    if (this.selectedContact === contact) {
      this.selectedContact = undefined;
      this.contactToEdit = undefined;
      this.contactToDelete = undefined;
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
