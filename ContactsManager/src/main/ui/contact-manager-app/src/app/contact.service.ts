import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Contact } from "./contact";

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    private apiHostUrl: string = environment.apiHostUrl;

    constructor(private http: HttpClient) { }

    public pullContacts(): Observable<Contact[]> {
        return this.http.get<Contact[]>(`${this.apiHostUrl}/contact/all`)
    }

    public addContact(contact: Contact): Observable<Contact> {
        return this.http.post<Contact>(`${this.apiHostUrl}/contact/add`, contact);
    }

    public updateContact(contact: Contact): Observable<Contact> {
        return this.http.put<Contact>(`${this.apiHostUrl}/contact/update`, contact);
    }

    public deleteContact(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiHostUrl}/contact/delete/${id}`);
    }
}