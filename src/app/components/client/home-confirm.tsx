"use client";

import { ConfirmationModal } from "@/app/components";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { reset, selectValue, update } from "@/lib/features/test/test-slice";

export function HomeConfirm() {
  const testText = useAppSelector(selectValue);
  const dispatch = useAppDispatch();

  const handleConfirm = () => {
    dispatch(update("The modal description updated successfully."));
  };

  const handleCancel = () => {
    dispatch(reset());
  };

  return (
    <ConfirmationModal
      buttonName="open_modal"
      title="confirm_action"
      description={testText}
      cancelBtn="cancel"
      okBtn="confirm"
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
}
