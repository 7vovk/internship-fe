"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/ui/button";

export function BackButton() {
  const router = useRouter();

  function handleBackButtonClick() {
    router.back();
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={handleBackButtonClick}
      className="text-foreground hover:bg-muted hover:cursor-pointer"
      aria-label="Go back"
    >
      <ArrowLeft className="size-4" />
    </Button>
  );
}
