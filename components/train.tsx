"use client";
import React, { useState } from "react";

import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UploadModal } from "@/components/ui/upload";
import axios from "axios";
import { useRouter } from "next/navigation";

const Train = () => {
  const [zipUrl, setZipUrl] = useState("");
  const [type, setType] = useState("Man");
  const [age, setAge] = useState<string>();
  const [ethinicity, setEthinicity] = useState<string>();
  const [eyeColor, setEyeColor] = useState<string>();
  const [bald, setBald] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();

  const { getToken } = useAuth();

  async function trainModal() {
    // Add type here
    const input = {
      zipUrl,
      type,
      age: parseInt(age ?? "0"),
      ethinicity,
      eyeColor,
      bald,
      name,
    };

    const token = await getToken();

    console.log(token);

    const res = await axios.post("http://localhost:8080/ai/training", input, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    router.push("/");
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of the model" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Age</Label>
                <Input id="age" placeholder="Age" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Gender</Label>
                <Input id="gender" placeholder="Gender" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Ethnicity</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="black">Balck</SelectItem>
                    <SelectItem value="asian_american">
                      Asian-American
                    </SelectItem>
                    <SelectItem value="east_asian">East Asian</SelectItem>
                    <SelectItem value="south_asian">South Asian</SelectItem>
                    <SelectItem value="south_east_asian">
                      South East Asian
                    </SelectItem>
                    <SelectItem value="middle_eastern">
                      Middle Eastern
                    </SelectItem>
                    <SelectItem value="pacific">Pacific</SelectItem>
                    <SelectItem value="hispanic">Hispanic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Eye Color</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="brown">Brown</SelectItem>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="hazel">Hazel</SelectItem>
                    <SelectItem value="gray">gray</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="isBald" />
                <Label htmlFor="isBald">Bald</Label>
              </div>
              <UploadModal
              // onUploadDone={(zipUrl) => setZipUrl(zipUrl)}
              ></UploadModal>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push("/")}>
            Cancel
          </Button>
          <Button onClick={() => trainModal()}>Create Model</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

// disabled={!name || !zipUrl || !type || !ethinicity || !eyeColor}

export default Train;
