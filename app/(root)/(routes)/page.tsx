import React from "react";
import { SearchInput } from "@/components/search-input";
import prismadb from "../../../lib/prismadb";
import { Categories } from "../../../components/categories";
import { Companions } from "../../../components/companions";

type RootPageProps = {
  searchParams: {
    categoryId: string;
    name?: string;
  };
};

const RootPage = async ({ searchParams }: RootPageProps) => {
  console.log("searchParams", searchParams);
  const data = await prismadb.companion.findMany({
    where: {
      categoryId: searchParams.categoryId,
      name: searchParams.name,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          messages: true,
        },
      },
    },
  });
  console.log("@@@@@@ data", data);
  const categories = await prismadb.category.findMany();

  return (
    <div className="h-full p-4 space-y-2">
      <SearchInput />
      <Categories data={categories} />
      <Companions data={data} />
    </div>
  );
};

export default RootPage;
