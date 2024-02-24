import { type ClassValue, clsx } from 'clsx';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function onOpenChangeHandler(
  open: boolean,
  form: UseFormReturn<FieldValues>,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const isDirty = form.formState.isDirty;
  if (
    open &&
    isDirty &&
    !window.confirm('Do you want to continue or discard')
  ) {
    // If the form is open, has changes, and user cancels, do nothing
    return;
  }

  // If the form is closed or user confirmed, toggle the 'open' state
  setOpen(!open);

  if (open && isDirty) {
    // If the form is open and has changes, reset the form
    form.reset();
  }
}
