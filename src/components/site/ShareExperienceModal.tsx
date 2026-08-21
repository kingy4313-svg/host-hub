import { useState } from "react";
import { newId } from "@/content/site-content";

type Props = {
  onClose: () => void;
  onSubmit: (item: { id: string; name: string; role: string; text: string }) => void;
};

export default function ShareExperienceModal({ onClose, onSubmit }: Props) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !name.trim()) return;
    const item = { id: newId("ts"), name: name.trim(), role: role.trim(), text: text.trim() };
    onSubmit(item);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4">
      <div className="mx-auto w-full max-w-lg rounded-2xl bg-card p-6 shadow-lg">
        <div className="flex items-start justify-between">
          <h3 className="font-display text-lg font-bold">Share Your Experience</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-muted-foreground hover:text-gold"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="testimonial-name" className="text-sm text-muted-foreground">
              Your name (required)
            </label>
            <input
              id="testimonial-name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded border bg-transparent px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="testimonial-role" className="text-sm text-muted-foreground">
              Role / Organization
            </label>
            <input
              id="testimonial-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full rounded border bg-transparent px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="testimonial-text" className="text-sm text-muted-foreground">
              Your experience (required)
            </label>
            <textarea
              id="testimonial-text"
              required
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              className="mt-1 w-full rounded border bg-transparent px-3 py-2"
            />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded px-4 py-2">
              Cancel
            </button>
            <button type="submit" className="btn-gold rounded px-4 py-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
