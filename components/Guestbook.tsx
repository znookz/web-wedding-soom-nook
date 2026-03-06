"use client";

import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Guestbook() {

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState("");

  const submit = async () => {
    if (!name.trim() || !message.trim()) {
      setErrorText("Please fill in your name and message.");
      return;
    }

    setIsSubmitting(true);
    setErrorText("");

    try {
      await addDoc(collection(db, "messages"), {
        name: name.trim(),
        message: message.trim(),
        createdAt: serverTimestamp()
      });

      setName("");
      setMessage("");

      alert("Thank you!");
    } catch (error) {
      const code = typeof error === "object" && error && "code" in error
        ? String((error as { code?: string }).code)
        : "";

      if (code.includes("permission-denied")) {
        setErrorText("Cannot send message yet: Firestore permission denied. Please update Firebase Rules.");
      } else {
        setErrorText("Failed to send message. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-white text-center">

      <h2 className="text-3xl font-bold mb-10 text-black">
        Leave a Message
      </h2>

      <div className="flex flex-col gap-4 max-w-md mx-auto">

        <input
          placeholder="Your name"
          className="border p-2 rounded"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />

        <textarea
          placeholder="Your message"
          className="border p-2 rounded"
          value={message}
          onChange={(e)=>setMessage(e.target.value)}
        />

        <button
          onClick={submit}
          disabled={isSubmitting}
          className="bg-pink-500 text-white p-2 rounded"
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>

        {errorText && (
          <p className="text-sm text-red-600">{errorText}</p>
        )}

      </div>

    </section>
  );
}