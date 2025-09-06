import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AccordionModule } from 'primeng/accordion'; // Import AccordionModule
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ContactUsComponent],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    AccordionModule,
    ReactiveFormsModule
  ]
})
export class ContactUsModule { }
