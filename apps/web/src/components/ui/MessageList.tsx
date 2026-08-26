"use client";

import { useTransition } from "react";
import { markMessageAsRead, deleteMessage } from "@/app/admin/contact/actions";

type Message = {
  id: bigint;
  name: string;
  email: string;
  message: string;
  status: string;
  submittedAt: Date;
};

export function MessageList({ messages }: { messages: Message[] }) {
  const [isPending, startTransition] = useTransition();

  const handleMarkAsRead = (id: bigint) => {
    startTransition(() => {
      markMessageAsRead(Number(id));
    });
  };

  const handleDelete = (id: bigint) => {
    if (confirm("Are you sure you want to delete this message?")) {
      startTransition(() => {
        deleteMessage(Number(id));
      });
    }
  };

  if (messages.length === 0) {
    return (
      <div className="text-center py-16 border border-neutral-200 rounded-2xl bg-white text-neutral-400">
        No messages yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`rounded-2xl border p-6 transition-colors ${
            msg.status === "new"
              ? "bg-brand-50 border-brand-200"
              : "bg-white border-neutral-200"
          }`}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="font-semibold text-brand-950">{msg.name}</h3>
                {msg.status === "new" && (
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-500 text-white">
                    New
                  </span>
                )}
              </div>
              <a
                href={`mailto:${msg.email}`}
                className="text-brand-500 text-sm hover:underline"
              >
                {msg.email}
              </a>
            </div>
            <time className="text-xs text-neutral-400 whitespace-nowrap">
              {new Date(msg.submittedAt).toLocaleString()}
            </time>
          </div>

          {/* Message body */}
          <div className="p-4 bg-neutral-50 border border-neutral-100 rounded-xl text-neutral-700 whitespace-pre-line text-sm mb-5 leading-relaxed">
            {msg.message}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {msg.status === "new" && (
              <button
                onClick={() => handleMarkAsRead(msg.id)}
                disabled={isPending}
                className="text-xs font-semibold px-4 py-1.5 rounded-full bg-brand-500 text-white hover:bg-brand-600 transition-colors disabled:opacity-40"
              >
                Mark as read
              </button>
            )}
            <button
              onClick={() => handleDelete(msg.id)}
              disabled={isPending}
              className="text-xs font-semibold px-4 py-1.5 rounded-full border border-red-100 text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
