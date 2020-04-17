import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-blue', class: '' },
    { path: '/plan-integration', title: 'Recruitment evaluation',  icon:'ni-single-copy-04 text-orange', class: ''},
    { path: '/plan-integration', title: 'Project Managment',  icon:'ni-book-bookmark text-pink', class: '' },
    { path: '/templates', title: 'Templates',  icon:'ni-folder-17 text-yellow', class: '' },
    
    /*{ path: '/modal-basic', title: 'test ',  icon:'ni-circle-08 text-pink', class: ''},*/

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
