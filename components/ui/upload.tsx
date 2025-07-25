"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import JSZip from "jszip";
import axios from "axios";

import { useAuth } from "@clerk/nextjs";

export function UploadModal({
  onUploadDone,
}: {
  onUploadDone: (zipUrl: string) => void;
}) {
  const { getToken } = useAuth();
  return (
    <Card className="w-full rounded-none border-none mx-auto shadow-none">
      <CardContent className="pt-6 px-0">
        <div
          className={cn(
            "flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-10 transition-all"
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
              type="button"
              onClick={async () => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = "image/*";
                input.multiple = true;
                const token = await getToken();

                input.onchange = async () => {
                  console.log(token);

                  console.log("Files selected:");
                  console.log(input.files);
                  const files = input.files;
                  const zip = new JSZip();
                  const res = await axios.get(
                    "http://localhost:8080/ai/presign-url",
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  console.log(res);
                  if (files) {
                    const key = res.data.key;
                    const preSignURL = res.data.responseURL;
                    for (const file of files) {
                      const content = file.arrayBuffer();
                      zip.file(file.name, content);
                    }
                    const zipFile = await zip.generateAsync({ type: "blob" });
                    const formData = new FormData();
                    formData.append("file", zipFile);
                    formData.append("key", key);
                    const basketResponse = await axios.put(
                      preSignURL,
                      formData
                    );

                    console.log(basketResponse);
                    console.log(preSignURL);

                    onUploadDone(preSignURL);
                  }
                };

                input.click();
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
