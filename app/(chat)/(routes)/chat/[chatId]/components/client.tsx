"use client";

import { Companion, Message } from "@prisma/client";
import { FormEvent, useState } from "react";
import { ChatHeader } from "../../../../../../components/chat-header";
import { useRouter } from "next/navigation";
import { useCompletion } from "ai/react";
import { ChatForm } from "../../../../../../components/chat-form";
import { ChatMessages } from "../../../../../../components/chat-messages";

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
    useCompletion({
      api: `/api/chat/${companion.id}`,
      onFinish(propmt, completition) {
        const systemMessage = {
          role: "system",
          content: completition,
        };

        setMessages((messages) => [...messages, systemMessage]);
        setInput("");

        router.refresh();
      },
    });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((messages) => [...messages, userMessage]);

    handleSubmit(e);
  };

  return (
    <div className="flex flex-col h-full p-4 space-y2">
      <ChatHeader companion={companion} />
      <ChatMessages
        companion={companion}
        isLoading={isLoading}
        messages={messages}
      />
      <ChatForm
        isLoading={isLoading}
        input={input}
        handleInputChange={handleInputChange}
        onSubmit={onSubmit}
      />
    </div>
  );
};
