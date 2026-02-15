import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css'],
  animations: [
    trigger('startTypewriter', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ width: 0, opacity: 0 }),
        animate('2s ease-in')
      ])
    ])
  ]
})
export class Home1Component implements OnInit, OnChanges {
  tooltipMessage = 'This is a dynamic tooltip message';
  showCard: boolean = false;
  flag: boolean = true;
  fullDetail: any;
  selectedProperty: any = null;
  @Input() spServices: any;
  isMobile!: boolean;
  selectedIndex!: number;
  isSidebarOpen: boolean = true;

  toggleCard() {
    this.showCard = !this.showCard;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkScreenSize();
  }

  constructor() {
    this.checkScreenSize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.fullDetail = this.spServices[0]
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768; // Adjust the width as per your requirement
  }

  ngOnInit(): void {
    this.checkScreenSize();
    this.fullDetail = this.spServices[0]
  }

  selectProperty(property: any, index: number) {
    console.log(this.fullDetail);
    
    if (this.isMobile) {
      this.isSidebarOpen = false;
    }
    this.fullDetail = property;
    this.flag = false;
    this.selectedIndex = index;
  }

}
