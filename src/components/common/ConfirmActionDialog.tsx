"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppDispatch } from "@/redux/hooks";
import { hideDialog } from "@/redux/dialog";

export interface ConfirmActionDialogProps {
  title?: string;
  description?: string;
  onConfirm?: () => void | Promise<void>;
  confirmText?: string;
  cancelText?: string;
  confirmLoading?: boolean;
  closeAfterConfirm?: boolean;
}

export function ConfirmActionDialog({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  onConfirm = () => console.log("Confirmed"),
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmLoading = false,
  closeAfterConfirm = true,
}: ConfirmActionDialogProps) {
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(hideDialog());
  };

  const handleConfirm = async () => {
    await onConfirm();

    if (closeAfterConfirm) {
      handleClose();
    }
  };

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            {cancelText}
          </Button>
          <Button
            variant="default"
            onClick={handleConfirm}
            disabled={confirmLoading}
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
