"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import { createTopic } from "@/app/actions";

const TopicCreator = () => {
  const [input, setInput] = useState<string>("");

  const { mutate, error, isPending } = useMutation({
    mutationFn: createTopic,
  });

  return (
    <div className="mt-18 flex flex-col gap-2">
      <div className="flex gap-2">
        <Input
          value={input}
          onChange={({ target }) => setInput(target.value)}
          className="bg-white md:min-w-96 h-12 md:text-lg font-semibold"
          placeholder="Enter topic here..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              mutate({ topicName: input });
              setInput("");
            }
          }}
        />
        <Button
          className="h-12 px-6 cursor-pointer"
          disabled={isPending}
          onClick={() => {
            mutate({ topicName: input });
            setInput("");
          }}
        >
          Create
        </Button>
      </div>

      {error ? <p className="text-sm text-red-600">{error.message}</p> : null}
    </div>
  );
};

export default TopicCreator;
