"use client";

import React from "react";
import { useToast } from "./ui/use-toast";
import { useTheme } from "next-themes";
import { cn } from "../lib/utils";
import { BotAvatar } from "./bot-avatar";
import { BeatLoader } from "react-spinners";

export type ChatMessageProps = {
  role: "system" | "user";
  content?: string;
  isLoading?: boolean;
  src?: string;
};

export const ChatMessage = ({
  role,
  content,
  isLoading,
  src,
}: ChatMessageProps) => {
  const { toast } = useToast();
  const { theme } = useTheme();

  const onCopy = () => {
    if (!content) {
      return;
    }

    navigator.clipboard.writeText(content);
    toast({ description: "Copied to clipboard" });
  };

  return (
    <div
      className={cn(
        "group flex items-start gap-x-3 py-4 w-full",
        role === "user" && "justify-end"
      )}
    >
      {role !== "user" && src && <BotAvatar src={src} />}
      <div className="max-w-sm px-4 py-2 text-sm rounded-md bg-primary/10">
        {isLoading ? (
          <BeatLoader size={5} color={theme === "light" ? "black" : "white"} />
        ) : (
          content
        )}
      </div>
    </div>
  );
};
