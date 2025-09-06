import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { SharedModule } from "../shared/shared.module"; // for dialogs



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DialogModule,
    SharedModule
],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent
  ]
})
export class LayoutsModule { }
