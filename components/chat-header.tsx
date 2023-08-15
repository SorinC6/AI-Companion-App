"use client";

import { Companion, Message } from "@prisma/client";
import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { BotAvatar } from "./bot-avatar";

type ChatHeaderProps = {
  companion: Companion & {
    messages: Message[];
    _count: {
      messages: number;
    };
  };
};

export const ChatHeader = ({ companion }: ChatHeaderProps) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between w-full pb-4 border-b border-primary/10">
      <div className="flex items-center gap-x-2">
        <Button onClick={() => router.back()} size="icon" variant="ghost">
          <ChevronLeft className="w-8 h-8" />
        </Button>
        <BotAvatar src={companion.src} />
      </div>
    </div>
  );
};
