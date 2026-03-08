"use client";

import { useState } from "react";
import { db, storage } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Guestbook() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [file, setFile] = useState<any>(null);

  const submit = async () => {
    if (!name.trim() || !message.trim()) {
      setErrorText("Please fill in your name and message.");
      return;
    }

    setIsSubmitting(true);
    setErrorText("");

    let imageUrl = "";

    if (file) {
      const storageRef = ref(storage, "guest/" + file.name);
      await uploadBytes(storageRef, file);
      imageUrl = await getDownloadURL(storageRef);
    }

    try {
      await addDoc(collection(db, "messages"), {
        name: name.trim(),
        message: message.trim(),
        imageUrl: imageUrl,
        createdAt: serverTimestamp(),
      });

      setName("");
      setMessage("");

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

      <div className="flex flex-col gap-4 max-w-md mx-auto">
        <input
          placeholder="Your name"
          className="rounded border border-[var(--accent-strong)]/30 bg-white p-2 text-[var(--accent-strong)] placeholder:text-[var(--accent-strong)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Your message"
          className="rounded border border-[var(--accent-strong)]/30 bg-white p-2 text-[var(--accent-strong)] placeholder:text-[var(--accent-strong)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <input type="file" onChange={(e) => setFile(e.target.files?.[0])} />
        <button
          onClick={submit}
          disabled={isSubmitting}
          className="rounded bg-[var(--accent-strong)] p-2 text-[var(--on-accent)] transition-colors hover:bg-[var(--accent)] disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>

        {errorText && <p className="text-sm text-red-600">{errorText}</p>}
      </div>
    </section>
  );
}
