import { redis } from "@/lib/redis";
import { Star } from "lucide-react";
import { Icons } from "@/components/Icons";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TopicCreator from "@/components/TopicCreator";
import { GridPattern } from "@/components/magicui/grid-pattern";

export default async function Home() {
  const servedRequests = await redis.get("served-requests");

  return (
    <section className="min-h-screen">
      <MaxWidthWrapper className="relative pb-24 pt-10 sm:pb-32 lg:pt-24 xl:pt-32 lg:pb-52 z-1">
        <div className="hidden lg:block absolute inset-0 top-8">
          {/* circle */}
        </div>

        <div className="px-6 lg:px-0 lg:pt-4">
          <div className="relative mx-auto text-center flex flex-col items-center">
            <h1 className="relative leading-snug w-fit tracking-tight text-balance mt-16 font-bold text-gray-900 text-5xl md:text-7xl">
              What do you{" "}
              <span className="whitespace-nowrap">
                th
                <span className="relative">
                  ı
                  <span className="absolute inset-x-0 top-1 -translate-x-3">
                    <Icons.brain className="h-6 w-6 md:h-10 md:w-10" />
                  </span>
                </span>
                nk
              </span>{" "}
              about...
            </h1>

            <TopicCreator />

            <div className="mt-12 flex flex-col sm:flex-row items-cemter sm:items-start gap-5">
              <div className="flex flex-col gap-1 justify-between items-center">
                <div className="flex gap-1">
                  <Star className="h-8 w-8 text-green-600 fill-green-600" />
                  <Star className="h-8 w-8 text-green-600 fill-green-600" />
                  <Star className="h-8 w-8 text-green-600 fill-green-600" />
                  <Star className="h-8 w-8 text-green-600 fill-green-600" />
                  <Star className="h-8 w-8 text-green-600 fill-green-600" />
                </div>

                <div className="text-xl flex justify-center items-center gap-1 bg-gray-100 rounded-lg p-2 m-2 px-4">
                  {/* <span className="inline-block w-3 h-3 rounded-full mr-1 bg-green-600 animate-pulse [animation-duration:1s]"></span> */}
                  <div className="relative mr-2 z-10">
                    <div className="absolute w-2 h-2 rounded-full mt-0.5 bg-green-500 sm:w-3 sm:h-3 md:h-4 md:w-4 flex items-center justify-center"></div>
                    <div className="w-2 h-2 rounded-full mt-0.5 bg-green-500 sm:w-3 sm:h-3 md:h-4 md:w-4 animate-ping"></div>
                  </div>
                  <span className="font-semibold text-purple-600">
                    {/* {Math.ceil(Number(servedRequests) / 10) * 10} */} 237
                  </span>{" "}
                  served requests
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      <div className="overflow-hidden bg-background p-20">
        <GridPattern
          width={56}
          height={56}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
        />
      </div>
    </section>
  );
}
