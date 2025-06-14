"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import FallBackImage from "@/public/placeholder.jpg";
import { useRouter } from "next/navigation";

export function ProjectCard({
  id,
  name,
  image,
  year,
  description,
}: {
  id: string;
  name: string;
  image: string;
  year: string;
  description: string;
}) {
  const [imgSrc, setImgSrc] = useState(image || FallBackImage);
  const router = useRouter();
  return (
    <Card
      className="overflow-hidden cursor-pointer"
      onClick={() => {
        router.push(`/projects/${id}`);
      }}
    >
      {/* <div className="relative h-48">
        <Image
          src={imgSrc}
          alt={name}
          fill
          className="object-cover"
          onError={() => setImgSrc(FallBackImage)}
        />
      </div> */}
      <CardContent className="p-4">
        <h2 className="font-semibold">{name}</h2>
        <p className="text-gray-500 tex-[10px] truncate ">{description}</p>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        {/* <Button variant="outline" size="icon" className="rounded-full h-8 w-8">
          <Bookmark className="h-4 w-4" />
        </Button> */}
        <Button variant="outline" size="sm" asChild>
          <p>{year}</p>
        </Button>
      </CardFooter>
    </Card>
  );
}
