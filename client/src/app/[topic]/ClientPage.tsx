"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useEffect, useState } from "react";
import { Wordcloud } from "@visx/wordcloud";
import { scaleLog } from "@visx/scale";
import { Text } from "@visx/text";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { submitComment } from "../actions";
import { io } from "socket.io-client";
import { GridPattern } from "@/components/magicui/grid-pattern";

const socket = io("https://rtvp.onrender.com");

interface ClientPageProps {
  topicName: string;
  initialData: { text: string; value: number }[];
}

const COLORS = ["#143059", "#2F6B9A", "#82a6c2"];

const ClientPage = ({ topicName, initialData }: ClientPageProps) => {
  const [words, setWords] = useState(initialData);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    socket.emit("join-room", `room:${topicName}`);
  }, [topicName]);

  useEffect(() => {
    socket.on("room-update", (message: string) => {
      const data = JSON.parse(message) as {
        text: string;
        value: number;
      }[];

      data.map((newWord) => {
        const isWordAlreadyIncluded = words.some(
          (word) => word.text === newWord.text
        );

        if (isWordAlreadyIncluded) {
          // increment
          setWords((prev) => {
            const before = prev.find((word) => word.text === newWord.text);
            const rest = prev.filter((word) => word.text !== newWord.text);

            return [
              ...rest,
              { text: before!.text, value: before!.value + newWord.value },
            ];
          });
        } else if (words.length < 50) {
          // add to state
          setWords((prev) => [...prev, newWord]);
        }
      });
    });

    return () => {
      socket.off("room-update");
    };
  }, [words]);

  const fontScale = scaleLog({
    domain: [
      Math.min(...words.map((w) => w.value)),
      Math.max(...words.map((w) => w.value)),
    ],
    range: [10, 100],
  });

  const { mutate, isPending } = useMutation({
    mutationFn: submitComment,
  });

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen">
      <MaxWidthWrapper className="flex flex-col items-center gap-6 pt-20 z-1">
        <h1 className="text-4xl sm:text-5xl font-bold text-center tracking-tight text-balance">
          What people think about{" "}
          <span className="text-blue-600">{topicName}</span>:
        </h1>
        <div className="flex gap-1 items-center justify-center bg-gray-100 rounded-2xl p-2">
          <div className="flex items-center justify-center relative mr-1 z-10">
            <div className="absolute w-1 h-1 rounded-full mt-0.5 bg-green-500 sm:w-2 sm:h-2 md:h-3 md:w-3 flex items-center justify-center"></div>
            <div className="w-1 h-1 rounded-full mt-0.25 bg-green-500 sm:w-2 sm:h-2 md:h-3 md:w-3 animate-ping"></div>
          </div>
          <p className="text-sm">(updated in real-time)</p>
        </div>
        <div className="aspect-square max-w-xl flex items-center justify-center">
          <Wordcloud
            words={words}
            width={500}
            height={500}
            fontSize={(data) => fontScale(data.value)}
            font={"Impact"}
            padding={2}
            spiral="rectangular"
            rotate={0}
            random={() => 0.5}
          >
            {(cloudWords) =>
              cloudWords.map((w, i) => (
                <Text
                  key={w.text}
                  fill={COLORS[i % COLORS.length]}
                  textAnchor="middle"
                  transform={`translate(${w.x}, ${w.y})`}
                  fontSize={w.size}
                  fontFamily={w.font}
                >
                  {w.text}
                </Text>
              ))
            }
          </Wordcloud>
        </div>

        <div className="max-w-lg w-full pb-20">
          <Label className="font-semibold tracking-tight text-lg pb-2">
            Here&apos;s what I think about {topicName}
          </Label>
          <div className="mt-1 flex gap-2 items-center">
            <Input
              value={input}
              onChange={({ target }) => setInput(target.value)}
              className="bg-white md:min-w-96 h-12 md:text-lg font-semibold"
              placeholder={`${topicName} is absolutely...`}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  mutate({ comment: input, topicName });
                  setInput("");
                }
              }}
            />
            <Button
              className="h-12 px-6 cursor-pointer"
              disabled={isPending}
              onClick={() => {
                mutate({ comment: input, topicName });
                setInput("");
              }}
            >
              Share
            </Button>
            <Button
              className="h-12 px-2 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://rtvp.yash14.me/${topicName}`
                );
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-copy"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v2" />
              </svg>
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
      <div className="overflow-hidden bg-background">
        <GridPattern
          width={56}
          height={56}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
        />
      </div>
    </div>
  );
};

export default ClientPage;
