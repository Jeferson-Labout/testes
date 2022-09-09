import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { navbarData } from './nav-data';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() onTogglesSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;

  screenWidth = 0;

  navData = navbarData;
  constructor() { }

  ngOnInit(): void {
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onTogglesSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }
  closeSidenav(): void {
    this.collapsed = false;
    this.onTogglesSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }
}
