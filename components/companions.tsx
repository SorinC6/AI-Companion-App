import { Companion } from "@prisma/client";
import Image from "next/image";
import React from "react";
import { Card, CardFooter, CardHeader } from "./ui/card";
import Link from "next/link";
import { MessageSquare } from "lucide-react";

type CompanionsProps = {
  data: (Companion & {
    _count: {
      messages: number;
    };
  })[];
};

export const Companions = ({ data }: CompanionsProps) => {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center pt-10">
        <div className="relative w-60 h-60">
          <Image fill className="greyscale" alt="empty" src="/empty.png" />
        </div>
        <p className="text-sm text-muted-foreground">No Companons found</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-2 pb-10 sm:grid-colors-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {data.map((companion) => {
        return (
          <Card
            key={companion.id}
            className="transition border-0 cursor-pointer bg-primary/10 rounded-xl hover:opacity-75"
          >
            <Link href={`/chat/${companion.id}`}>
              <CardHeader>
                <div className="relative w-32 h-32">
                  <Image
                    src={companion.src}
                    fill
                    className="object-cover rounded-sx"
                    alt="Companion"
                  />
                </div>
                <p className="font-bold">{companion.name}</p>
                <p className="text-xs">{companion.description}</p>
              </CardHeader>
              <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
                <p className="lowercase">@{companion.userName}</p>
                <div className="flex items-center">
                  <MessageSquare className="w-3 h-3 mr-1" />
                  {companion._count.messages}
                </div>
              </CardFooter>
            </Link>
          </Card>
        );
      })}
    </div>
  );
};
