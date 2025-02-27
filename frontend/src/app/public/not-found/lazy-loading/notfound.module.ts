
/*
 * Copyright (c) Aista Ltd, and Thomas Hansen - For license inquiries you can contact thomas@ainiro.io.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundRoutingModule } from './notfound.routing.module';
import { MatButtonModule } from '@angular/material/button';
import { NotFoundComponent } from '../not-found.component';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    NotfoundRoutingModule,
    MatButtonModule
  ]
})
export class NotfoundModule { }
