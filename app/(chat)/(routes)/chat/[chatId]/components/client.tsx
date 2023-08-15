"use client";

import { Companion, Message } from "@prisma/client";
import React from "react";
import { ChatHeader } from "../../../../../../components/chat-header";

type ChatClientProps = {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
};

export const ChatClient = ({ companion }: ChatClientProps) => {
  return (
    <div className="flex flex-col h-full p-4 space-y2">
      <ChatHeader companion={companion} />
    </div>
  );
};
