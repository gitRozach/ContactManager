import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { ContactCardComponent } from './contact-card/contact-card.component';
import { ContactAddFormComponent } from './contact-add-form/contact-add-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactDeleteFormComponent } from './contact-delete-form/contact-delete-form.component';
import { ContactEditFormComponent } from './contact-edit-form/contact-edit-form.component';
import { SearchPipePipe } from './search-pipe.pipe';
import { SortPipePipe } from './sort-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderBarComponent,
    ContactCardComponent,
    ContactAddFormComponent,
    ContactDeleteFormComponent,
    ContactEditFormComponent,
    SearchPipePipe,
    SortPipePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ContactAddFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
