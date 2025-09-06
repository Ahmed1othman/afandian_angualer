import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CarouselModule,
    CardModule,
    AccordionModule
  ],
  exports: [
    CarouselModule,
    CardModule,
    AccordionModule
  ],
  providers: [],
})
export class MaterialModule {}
