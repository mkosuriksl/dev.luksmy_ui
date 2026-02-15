import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const newPassword = control.get('newPassword')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  return newPassword === confirmPassword ? null : { passwordMismatch: true };
}

export function atLeastOneLetterValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const hasLetter = /[a-zA-Z]/.test(control.value);
    return hasLetter ? null : { atLeastOneLetter: true };
  };

}

export function atLeastOneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const hasNumber = /\d/.test(control.value);
    return hasNumber ? null : { atLeastOneNumber: true };
  };
}
export function atLeastOneSpecialCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const hasSpecialCharacter = /[@#$%&*]/.test(control.value);
    return hasSpecialCharacter ? null : { atLeastOneSpecialCharacter: true };
  };
}


export function gmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const email: string = control.value;
    if (email && !email.toLowerCase().endsWith('@gmail.com')) {
      return { 'gmail': true };
    }
    return null;
  };
}

export function numericValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value;
    if (value && !/^[0-9]+$/.test(value)) {
      return { 'numeric': true };
    }
    return null;
  };
}

