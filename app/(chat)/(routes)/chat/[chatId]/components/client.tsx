"use client";

import { Companion, Message } from "@prisma/client";
import React, { useState } from "react";
import { ChatHeader } from "../../../../../../components/chat-header";
import { useRouter } from "next/navigation";
import { useCompletion } from "ai/react";

type ChatClientProps = {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
};

export const ChatClient = ({ companion }: ChatClientProps) => {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>(companion.messages);
  const { input, isLoading, handleInputChange, handleSubmit, setInput } =
    useCompletion({});
  return (
    <div className="flex flex-col h-full p-4 space-y2">
      <ChatHeader companion={companion} />
    </div>
  );
};
