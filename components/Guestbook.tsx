"use client";

import { useEffect, useRef, useState } from "react";
import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

type GuestMessage = {
  id: string;
  name: string;
  message: string;
  imageUrl: string;
};

const FLOAT_POSITIONS = [
  "left-[4%] top-[12%] rotate-[-7deg]",
  "left-[10%] top-[48%] rotate-[5deg]",
  "left-[6%] top-[78%] rotate-[-4deg]",
  "right-[4%] top-[16%] rotate-[8deg]",
  "right-[10%] top-[50%] rotate-[-6deg]",
  "right-[6%] top-[80%] rotate-[4deg]",
  "left-[10%] top-[72%] rotate-[3deg]",
];

const POPUP_FLOAT_POSITIONS = [
  "left-[4%] top-[8%] rotate-[-7deg]",
  "left-[20%] top-[26%] rotate-[4deg]",
  "left-[8%] top-[52%] rotate-[-5deg]",
  "left-[26%] top-[72%] rotate-[7deg]",
  "left-[40%] top-[10%] rotate-[3deg]",
  "left-[46%] top-[42%] rotate-[-8deg]",
  "left-[38%] top-[70%] rotate-[5deg]",
  "right-[34%] top-[16%] rotate-[-6deg]",
  "right-[22%] top-[44%] rotate-[7deg]",
  "right-[30%] top-[72%] rotate-[-4deg]",
  "right-[10%] top-[22%] rotate-[5deg]",
  "right-[6%] top-[56%] rotate-[-7deg]",
];

export default function Guestbook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [guestMessages, setGuestMessages] = useState<GuestMessage[]>([]);
  const [isGuestbookOpen, setIsGuestbookOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const replaceConfirmedRef = useRef(false);

  useEffect(() => {
    const messagesQuery = query(
      collection(db, "messages"),
      orderBy("createdAt", "desc"),
      limit(12),
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const nextMessages: GuestMessage[] = snapshot.docs.map((doc) => {
        const data = doc.data() as Partial<GuestMessage>;

        return {
          id: doc.id,
          name: data.name ?? "Guest",
          message: data.message ?? "",
          imageUrl: data.imageUrl ?? "",
        };
      });

      setGuestMessages(nextMessages);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isGuestbookOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isGuestbookOpen]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const onFileChange = (selectedFile: File | null) => {
    const wasPreconfirmed = replaceConfirmedRef.current;
    replaceConfirmedRef.current = false;

    if (file && selectedFile && selectedFile !== file && !wasPreconfirmed) {
      const shouldReplace = window.confirm(
        "You already selected a photo. Replace it with the new one?",
      );

      if (!shouldReplace) {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    if (!selectedFile) {
      setFile(null);
      setPreviewUrl("");
      return;
    }

    setFile(selectedFile);
    setPreviewUrl(URL.createObjectURL(selectedFile));
  };

  const clearSelectedPhoto = (withConfirm = true) => {
    if (withConfirm && file) {
      const shouldClear = window.confirm("Remove the selected photo?");
      if (!shouldClear) {
        return;
      }
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setFile(null);
    setPreviewUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadImage = async (selectedFile: File) => {
    const data = new FormData();
    data.append("file", selectedFile);
    data.append("upload_preset", "wedding_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dn4cmvjve/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const result = await res.json();

    if (!result?.secure_url) {
      throw new Error("Cloudinary upload failed");
    }

    return String(result.secure_url);
  };

  const submit = async () => {
    if (!name.trim() || !message.trim()) {
      setErrorText("Please fill in your name and message.");
      return;
    }

    if (!file) {
      setErrorText("Please upload a photo.");
      return;
    }

    setIsSubmitting(true);
    setErrorText("");

    const uploadedImageUrl = await uploadImage(file);

    try {
      await addDoc(collection(db, "messages"), {
        name: name.trim(),
        message: message.trim(),
        imageUrl: uploadedImageUrl,
        createdAt: serverTimestamp(),
      });

      setName("");
      setMessage("");
      clearSelectedPhoto(false);

      alert("Thank you!");
    } catch (error) {
      const code =
        typeof error === "object" && error && "code" in error
          ? String((error as { code?: string }).code)
          : "";

      if (code.includes("permission-denied")) {
        setErrorText(
          "Cannot send message yet: Firestore permission denied. Please update Firebase Rules.",
        );
      } else {
        setErrorText("Failed to send message. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-[var(--surface-main)] py-20 text-center">
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        {guestMessages.map((item, index) => (
          <article
            key={item.id}
            className={`absolute w-36 rounded-sm bg-white/80 p-2 shadow-md backdrop-blur-sm ${
              FLOAT_POSITIONS[index % FLOAT_POSITIONS.length]
            }`}
          >
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt=""
                aria-hidden="true"
                className="mb-2 h-20 w-full rounded object-cover"
              />
            )}
            <p className="line-clamp-2 text-left text-xs text-[var(--accent-strong)]">
              {item.message}
            </p>
            <p className="mt-1 text-right text-[10px] font-semibold text-[var(--theme-sunset)]">
              - {item.name}
            </p>
          </article>
        ))}
      </div>

      <h2 className="mb-10 text-3xl font-bold text-[var(--accent-strong)]">Leave a Message</h2>

      <div id="BoxUploadMessage" className="relative z-10 mx-auto flex w-full max-w-md flex-col items-center gap-4 px-4">
        <div className="w-full rounded-sm bg-white p-4 pb-6 shadow-[0_16px_35px_rgba(0,0,0,0.2)]">
          <label className="group relative mb-3 block cursor-pointer">
            <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded border-2 border-dashed border-[var(--accent-strong)]/35 bg-[var(--surface-main)] transition-colors group-hover:border-[var(--accent)]">
              {previewUrl ? (
                <img src={previewUrl} alt="Guest upload preview" className="h-full w-full object-cover" />
              ) : (
                <p className="px-4 text-sm text-[var(--accent-strong)]/70">
                  Tap this frame to upload your photo
                </p>
              )}
            </div>

            {previewUrl && (
              <button
                type="button"
                aria-label="Remove selected photo"
                className="absolute right-2 top-2 rounded-full bg-black/70 px-2 py-0.5 text-sm font-bold text-white"
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  clearSelectedPhoto();
                }}
              >
                X
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onClick={(event) => {
                if (file) {
                  const shouldReplace = window.confirm(
                    "You already selected a photo. Do you want to choose a new one?",
                  );

                  if (!shouldReplace) {
                    event.preventDefault();
                    return;
                  }

                  replaceConfirmedRef.current = true;
                }
              }}
              onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
            />
          </label>

          <textarea
            placeholder="Write your message under the photo..."
            className="min-h-24 w-full rounded border border-[var(--accent-strong)]/30 bg-white p-3 text-[var(--accent-strong)] placeholder:text-[var(--accent-strong)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <input
            placeholder="Your name"
            className="mt-3 w-full rounded border border-[var(--accent-strong)]/30 bg-white p-2 text-[var(--accent-strong)] placeholder:text-[var(--accent-strong)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="flex w-full flex-col gap-3">
          <button
            onClick={submit}
            disabled={isSubmitting}
            className="rounded bg-[var(--accent-strong)] p-2 text-[var(--on-accent)] transition-colors hover:bg-[var(--accent)] disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send"}
          </button>

          <button
            type="button"
            onClick={() => setIsGuestbookOpen(true)}
            className="rounded border border-[var(--accent-strong)] bg-white p-2 font-semibold text-[var(--accent-strong)] transition-colors hover:bg-[var(--surface-soft)]"
          >
            View Guestbook
          </button>
        </div>

        {errorText && <p className="text-sm text-red-600">{errorText}</p>}
      </div>

      {isGuestbookOpen && (
        <div
          className="fixed inset-0 z-[120] bg-black/60 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          onClick={() => setIsGuestbookOpen(false)}
        >
          <div
            className="relative mx-auto flex h-full w-full max-w-6xl flex-col rounded-2xl bg-[var(--surface-main)] p-4 md:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close guestbook"
              className="absolute right-3 top-3 rounded-full bg-white px-3 py-1 text-xl font-bold text-[var(--accent-strong)] shadow"
              onClick={() => setIsGuestbookOpen(false)}
            >
              X
            </button>

            <h3 className="mb-4 text-center text-2xl font-bold text-[var(--accent-strong)] md:text-3xl">
              Guestbook Memories
            </h3>

            {guestMessages.length === 0 ? (
              <div className="flex h-full items-center justify-center text-[var(--accent-strong)]">
                No messages yet.
              </div>
            ) : (
              <>
                <div className="relative hidden h-full md:block">
                  {guestMessages.map((item, index) => (
                    <article
                      key={`popup-${item.id}`}
                      className={`absolute w-52 rounded-sm bg-white p-3 shadow-[0_12px_24px_rgba(0,0,0,0.2)] ${
                        POPUP_FLOAT_POSITIONS[index % POPUP_FLOAT_POSITIONS.length]
                      }`}
                    >
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="mb-2 h-28 w-full rounded object-cover"
                        />
                      )}
                      <p className="line-clamp-3 text-left text-sm text-[var(--accent-strong)]">{item.message}</p>
                      <p className="mt-1 text-right text-xs font-semibold text-[var(--theme-sunset)]">- {item.name}</p>
                    </article>
                  ))}
                </div>

                <div className="h-full overflow-y-auto md:hidden">
                  <div className="flex flex-col gap-4 pb-3 pt-1">
                    {guestMessages.map((item) => (
                      <article
                        key={`mobile-${item.id}`}
                        className="w-full rounded-lg bg-white p-3 shadow"
                      >
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="mb-2 h-52 w-full rounded object-cover"
                          />
                        )}
                        <p className="text-left text-sm text-[var(--accent-strong)]">{item.message}</p>
                        <p className="mt-2 text-right text-xs font-semibold text-[var(--theme-sunset)]">- {item.name}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>

  );
}
