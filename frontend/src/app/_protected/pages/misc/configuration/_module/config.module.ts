
/*
 * Copyright (c) Aista Ltd, and Thomas Hansen - For license inquiries you can contact thomas@ainiro.io.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from '../configuration.component';
import { ConfigRoutingModule } from './config.routing.module';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { CmModule } from 'src/app/codemirror/_module/cm.module';
import { MaterialModule } from 'src/app/material.module';
import { ComponentsModule } from 'src/app/_general/components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SmtpDialogComponent } from '../components/smtp-dialog/smtp-dialog.component';
import { RecaptchaDialogComponent } from '../components/recaptcha-dialog/recaptcha-dialog.component';

@NgModule({
  declarations: [
    ConfigurationComponent,
    SmtpDialogComponent,
    RecaptchaDialogComponent,
  ],
  imports: [
    CommonModule,
    ConfigRoutingModule,
    ComponentsModule,
    MaterialModule,
    CmModule,
    CodemirrorModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ConfigModule { }
