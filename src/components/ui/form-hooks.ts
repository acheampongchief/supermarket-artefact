import * as React from "react";
import { useFormContext } from "react-hook-form";
import {
  FormFieldContext,
  FormItemContext,
  FORM_ERROR_MESSAGES,
} from "./form-types";

// ============================================================================
// FORM FIELD HOOK
// ============================================================================

export function useFormField() {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext || !fieldContext.name) {
    throw new Error(FORM_ERROR_MESSAGES.USE_FORM_FIELD_ERROR);
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
}