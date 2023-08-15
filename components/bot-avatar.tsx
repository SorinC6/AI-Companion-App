import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";

type BotAvatarProps = {
  src: string;
};

export const BotAvatar = ({ src }: BotAvatarProps) => {
  return (
    <Avatar className="w-12 h-12">
      <AvatarImage src={src} />
    </Avatar>
  );
};
