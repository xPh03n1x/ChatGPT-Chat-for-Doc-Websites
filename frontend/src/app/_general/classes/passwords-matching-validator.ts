
/*
 * Copyright (c) Aista Ltd, and Thomas Hansen - For license inquiries you can contact thomas@ainiro.io.
 */

import { UntypedFormGroup } from '@angular/forms';

/**
 * Checks that password are matching given two different form controls.
 */
export function PasswordsMatchingValidator(controlName: string, matchingControlName: string) {

  return (formGroup: UntypedFormGroup) => {

    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}
