"use client";

import { Companion } from "@prisma/client";
import React, { ElementRef, useEffect, useRef } from "react";
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
  console.log("messages", messages);
  const scrollRef = useRef<ElementRef<"div">>(null);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <div className="flex-1 pr-4 overflow-y-auto">
      <ChatMessage
        src={companion.src}
        role="system"
        content={`Hello, I am ${companion.name} ${companion.description}`}
        isLoading={isLoading}
      />
      {messages.map((message) => (
        <ChatMessage
          key={message.content}
          role={message.role}
          content={message.content}
          src={message.src}
        />
      ))}
      {isLoading && <ChatMessage role="system" src={companion.src} isLoading />}
      <div ref={scrollRef} />
    </div>
  );
};
