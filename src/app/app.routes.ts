import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './screens/home/home.component';

const app_routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		component: HomeComponent,
		// canActivate: [AuthGuard]
	}
];

export const app_routing = RouterModule.forRoot(app_routes);
