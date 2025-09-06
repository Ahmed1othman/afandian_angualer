import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-banner-head',
  templateUrl: './banner-head.component.html',
  styleUrls: ['./banner-head.component.scss']
})
export class BannerHeadComponent {
  @Input() title: any;
  @Input() desc: any;

}
