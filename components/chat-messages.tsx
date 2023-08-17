"use client";

import { Companion } from "@prisma/client";
import React from "react";
import { ChatMessage, ChatMessageProps } from "./chat-message";

type ChatMessagesProps = {
  messages: ChatMessageProps[];
  companion: Companion;
  isLoading: boolean;
};

export const ChatMessages = ({
  messages = [],
  companion,
  isLoading,
}: ChatMessagesProps) => {
  return (
    <div className="flex-1 pr-4 overflow-y-auto">
      <ChatMessage
        src={companion.src}
        role="system"
        content={`Hello, I am ${companion.name} ${companion.description}`}
        isLoading={isLoading}
      />
      {/* <ChatMessage
        role="user"
        content={`Hello, I am ${companion.name} ${companion.description}`}
        isLoading={isLoading}
      /> */}
    </div>
  );
};
