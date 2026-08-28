import prisma from "database";
import { MessageList } from "@/components/ui/MessageList";

export const metadata = {
  title: "Wiadomości - Panel admina",
};

export default async function AdminContactPage() {
  const messages = await prisma.contactSubmission.findMany({
    orderBy: { submittedAt: "desc" },
  });

  const newCount = messages.filter((m: any) => m.status === "new").length;

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-950">Wiadomości</h1>
          <p className="text-neutral-500 text-sm mt-0.5">
            {messages.length} wszystkich · {newCount} nieprzeczytanych
          </p>
        </div>
        {newCount > 0 && (
          <span className="text-sm font-semibold px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-100">
            {newCount} nowe
          </span>
        )}
      </div>

      <MessageList messages={messages} />
    </div>
  );
}
