import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Icons } from '../../utils/icons';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `<span [innerHTML]="iconHtml"></span>`,
  styles: []
})
export class IconComponent {
  @Input() name!: keyof typeof Icons;
  @Input() class: string = 'w-4 h-4';

  constructor(private sanitizer: DomSanitizer) {}

  get iconHtml(): SafeHtml {
    if (!this.name || !Icons[this.name]) {
      return '';
    }
    
    let iconSvg = Icons[this.name];
    // Replace the default class with the custom class
    iconSvg = iconSvg.replace('class="w-4 h-4"', `class="${this.class}"`);
    
    return this.sanitizer.bypassSecurityTrustHtml(iconSvg);
  }
} 