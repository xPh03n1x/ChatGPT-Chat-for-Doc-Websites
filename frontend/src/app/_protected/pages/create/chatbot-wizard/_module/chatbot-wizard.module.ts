
/*
 * Copyright (c) Aista Ltd, and Thomas Hansen - For license inquiries you can contact thomas@ainiro.io.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatbotWizardRoutingModule } from './chatbot-wizard.routing.module';
import { ComponentsModule } from 'src/app/_general/components/components.module';
import { MaterialModule } from 'src/app/material.module';
import { ChatbotWizardComponent } from '../chatbot-wizard.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared.module';

@NgModule({
  declarations: [
    ChatbotWizardComponent,
  ],
  imports: [
    CommonModule,
    ChatbotWizardRoutingModule,
    ComponentsModule,
    MaterialModule,
    FormsModule,
    SharedModule
  ]
})
export class ChatbotWizardModule { }
