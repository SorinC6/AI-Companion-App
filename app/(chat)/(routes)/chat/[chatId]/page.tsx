import { auth, redirectToSignIn } from "@clerk/nextjs";
import React from "react";
import prismadb from "../../../../../lib/prismadb";
import { redirect } from "next/navigation";
import { ChatClient } from "./components/client";

type ChstIdProps = {
  params: {
    chatId: string;
  };
};

const ChatIDPage = async ({ params }: ChstIdProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.chatId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
        where: {
          userId: userId,
        },
      },
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });

  if (!companion) {
    return redirect("/");
  }

  return <ChatClient companion={companion} />;
};

export default ChatIDPage;
