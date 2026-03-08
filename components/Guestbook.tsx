"use client";

import { useEffect, useState } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Guestbook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
    const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const onFileChange = (selectedFile: File | null) => {
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

    const uploadImage = async (file:any) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "wedding_upload");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dn4cmvjve/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const result = await res.json();
    // setImageUrl(result.secure_url);
    return result.secure_url;
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

    let imageUrl = await uploadImage(file);

    try {
      await addDoc(collection(db, "messages"), {
        name: name.trim(),
        message: message.trim(),
        imageUrl: imageUrl,
        createdAt: serverTimestamp(),
      });

      setName("");
      setMessage("");
      setFile(null);
      setImageUrl("");
      setPreviewUrl("");

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
    <section className="bg-[var(--surface-main)] py-20 text-center">
      <h2 className="mb-10 text-3xl font-bold text-[var(--accent-strong)]">Leave a Message</h2>

      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-4">
        <div className="w-full rounded-sm bg-white p-4 pb-6 shadow-[0_16px_35px_rgba(0,0,0,0.2)]">
          <div className="mb-4 flex aspect-square w-full items-center justify-center overflow-hidden rounded border-2 border-dashed border-[var(--accent-strong)]/35 bg-[var(--surface-main)]">
            {previewUrl ? (
              <img src={previewUrl} alt="Guest upload preview" className="h-full w-full object-cover" />
            ) : (
              <p className="px-4 text-sm text-[var(--accent-strong)]/70">Upload your photo to place it in this polaroid frame</p>
            )}
          </div>

          <label className="mb-3 inline-block cursor-pointer rounded bg-[var(--accent-strong)] px-4 py-2 text-sm font-semibold text-[var(--on-accent)] transition-colors hover:bg-[var(--accent)]">
            Upload Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
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

        <button
          onClick={submit}
          disabled={isSubmitting}
          className="w-full rounded bg-[var(--accent-strong)] p-2 text-[var(--on-accent)] transition-colors hover:bg-[var(--accent)] disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>

        {errorText && <p className="text-sm text-red-600">{errorText}</p>}
      </div>
    </section>
    
  );
}
