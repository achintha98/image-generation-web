"use client";

import { useState, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function UploadModal() {
  const [isDragging, setIsDragging] = useState(false);
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  return (
    <Card className="w-full rounded-none border-none mx-auto shadow-none">
      <CardContent className="pt-6 px-0">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={cn(
            "flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 transition-all",
            isDragging
              ? "border-emerald-500 bg-emerald-100"
              : "border-muted-foreground hover:border-emerald-400"
          )}
        >
          <CloudUploadIcon className="w-16 h-16 text-neutral-400" />

          <div className="text-center space-y-4">
            <p className="text-neutral-500">
              <span className="font-medium">Drag and drop files here</span> or
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.multiple = true;
              }}
            >
              Browse Files
            </Button>
            <p className="text-xs text-neutral-500">
              Supported formats: PNG, JPG, GIF
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CloudUploadIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.9A7 7 0 1 1 15.7 8h1.8a4.5 4.5 0 0 1 2.5 8.2" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}
