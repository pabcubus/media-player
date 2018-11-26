import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MediaComponent } from './media/media.component';

const components = [
	MediaComponent
];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
	],
	declarations: [
		...components
	],
	exports: [
		...components
	]
})
export class ComponentsModule { }
