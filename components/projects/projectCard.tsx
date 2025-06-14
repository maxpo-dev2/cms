"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function ProjectCard({
  id,
  name,
  year,
  description,
}: {
  id: string;
  name: string;
  year: string;
  description: string;
}) {
  const router = useRouter();

  return (
    <Card
      onClick={() => router.push(`/projects/${id}`)}
      className="cursor-pointer rounded-2xl border border-gray-200 p-4 shadow-sm transition duration-300 hover:shadow-md hover:border-blue-500 group"
    >
      <CardContent className="space-y-2 pb-0">
        <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition">
          {name}
        </h2>
        <p className="text-sm text-gray-600 line-clamp-3">
          {description}
        </p>
      </CardContent>

      <CardFooter className="pt-4 flex justify-between items-center">
        <span className="inline-block text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
          {year}
        </span>

        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 px-2">
          View
        </Button>
      </CardFooter>
    </Card>
  );
}
