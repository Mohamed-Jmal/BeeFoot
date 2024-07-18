import { Injectable, HostListener, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { WINDOW } from "./windows.service";
// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false

	constructor(@Inject(WINDOW) private window) {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
	}

	// Windows width
	@HostListener("window:resize", ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			path: '/dashboard/default', title: 'Dashboard', icon: 'home', type: 'link', badgeType: 'primary', active: false
		},
		{
			title: 'Espace', icon: 'tag', type: 'sub', active: false, children: [
				{ path: '/espaces/all-espaces', title: 'List Espaces', type: 'link' },
				{ path: '/espaces/add-espace', title: 'Add Espace', type: 'link' }
			]
		},

		{
			title: 'Field', icon: 'tag', type: 'sub', active: false, children: [
				{ path: '/fields/all-fields', title: 'List Fields', type: 'link' },
				{ path: '/fields/add-field', title: 'Add Field', type: 'link' }
			]
		},
		{
			title: 'Booking', icon: 'tag', type: 'sub', active: false, children: [
				{ path: '/booking/all-bookings', title: 'List Booking', type: 'link' },
				{ path: '/booking/add-booking', title: 'Add Booking', type: 'link' }
			]
		},
		{
			title: 'Notification', icon: 'tag', type: 'sub', active: false, children: [
				{ path: '/notification/all-notifications', title: 'List Notification', type: 'link' },
				{ path: '/notification/add-notification', title: 'Add Notification', type: 'link' }
			]
		},
		{
			title: 'Date Field', icon: 'tag', type: 'sub', active: false, children: [
				{ path: '/date-field/all-date-fields', title: 'List DateField', type: 'link' },
				{ path: '/date-field/add-date-field', title: 'Add DateField', type: 'link' }
			]
		},
		{
			title: 'Users', icon: 'user-plus', type: 'sub', active: false, children: [
				{ path: '/users/all-users', title: 'User List', type: 'link' },
				{ path: '/users/add-user', title: 'Create User', type: 'link' },
			]
		},
		/*{
			title: 'Localization', icon: 'chrome', type: 'sub', children: [
				{ path: '/localization/translations', title: 'Translations', type: 'link' },
				{ path: '/localization/currency-rates', title: 'Currency Rates', type: 'link' },
				{ path: '/localization/taxes', title: 'Taxes', type: 'link' },
			]
		},*/

		{
			title: 'Settings', icon: 'settings', type: 'sub', children: [
				{ path: '/settings/profile', title: 'Profile', type: 'link' },
			]
		},

		{
			title: 'Login', path: '/auth/login', icon: 'log-in', type: 'link', active: false
		}
	]
	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);


}
