import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useState, useEffect } from "react";

export default function AllowCameraAlert({
  open,
  defaultOpen,
  ...props
}: DialogPrimitive.DialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsOpen(defaultOpen ?? open ?? false);
  }, [defaultOpen, open]);

  return (
    <AlertDialog open={isOpen} {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Required Camera Access</AlertDialogTitle>
          <AlertDialogDescription>
            To calculate your heart beat, we need to record your blood movement
            through camera
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogAction
            onClick={() => {
              setIsOpen(false);
            }}
            className="bg-accentRed hover:bg-accentRed-hover"
          >
            Okay
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
