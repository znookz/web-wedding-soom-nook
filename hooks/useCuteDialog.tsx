"use client";

import { useRef, useState } from "react";
import CuteDialog from "@/components/CuteDialog";

type ConfirmDialogState = {
  open: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
};

type NoticeDialogState = {
  open: boolean;
  title: string;
  message: string;
  confirmText: string;
};

export default function useCuteDialog() {
  const confirmResolveRef = useRef<((value: boolean) => void) | null>(null);

  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({
    open: false,
    title: "",
    message: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
  });

  const [noticeDialog, setNoticeDialog] = useState<NoticeDialogState>({
    open: false,
    title: "",
    message: "",
    confirmText: "OK",
  });

  const showConfirm = (
    title: string,
    message: string,
    confirmText = "Confirm",
    cancelText = "Cancel",
  ) => {
    return new Promise<boolean>((resolve) => {
      confirmResolveRef.current = resolve;
      setConfirmDialog({
        open: true,
        title,
        message,
        confirmText,
        cancelText,
      });
    });
  };

  const showNotice = (title: string, message: string, confirmText = "OK") => {
    setNoticeDialog({
      open: true,
      title,
      message,
      confirmText,
    });
  };

  const dialogs = (
    <>
      <CuteDialog
        open={confirmDialog.open}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText={confirmDialog.confirmText}
        cancelText={confirmDialog.cancelText}
        showCancel
        onConfirm={() => {
          setConfirmDialog((prev) => ({ ...prev, open: false }));
          confirmResolveRef.current?.(true);
          confirmResolveRef.current = null;
        }}
        onCancel={() => {
          setConfirmDialog((prev) => ({ ...prev, open: false }));
          confirmResolveRef.current?.(false);
          confirmResolveRef.current = null;
        }}
      />

      <CuteDialog
        open={noticeDialog.open}
        title={noticeDialog.title}
        message={noticeDialog.message}
        confirmText={noticeDialog.confirmText}
        onConfirm={() => setNoticeDialog((prev) => ({ ...prev, open: false }))}
        onCancel={() => setNoticeDialog((prev) => ({ ...prev, open: false }))}
      />
    </>
  );

  return { showConfirm, showNotice, dialogs };
}
