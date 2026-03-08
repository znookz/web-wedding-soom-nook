"use client";

type CuteDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  showCancel?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function CuteDialog({
  open,
  title,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
  showCancel = false,
  onConfirm,
  onCancel,
}: CuteDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[140] flex items-center justify-center bg-black/45 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onCancel}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-[var(--surface-main)] p-5 text-center shadow-[0_20px_45px_rgba(0,0,0,0.25)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="pointer-events-none absolute -left-6 -top-6 h-20 w-20 rounded-full bg-[var(--theme-primary)]/45 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-6 -right-6 h-20 w-20 rounded-full bg-[var(--theme-mint)]/50 blur-2xl" />

        <h4 className="relative z-10 mb-2 text-xl font-bold text-[var(--accent-strong)]">
          {title}
        </h4>
        <p className="relative z-10 mb-5 text-sm text-[var(--accent-strong)]/85">
          {message}
        </p>

        <div className={`relative z-10 grid gap-2 ${showCancel ? "grid-cols-2" : "grid-cols-1"}`}>
          {showCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-[var(--accent-strong)]/35 bg-white px-3 py-2 text-sm font-semibold text-[var(--accent-strong)] transition-colors hover:bg-[var(--surface-soft)]"
            >
              {cancelText}
            </button>
          )}
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-[var(--accent-strong)] px-3 py-2 text-sm font-semibold text-[var(--on-accent)] transition-colors hover:bg-[var(--accent)]"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
