import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import NotFoundPage from "../../components/404";
import { getCharacter } from "../../libs/characters";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Status = ({ status }: { status: string }) => {
  return (
    <>
      <div
        className={`rounded-md ${
          status === "Dead" ? "bg-red-500" : "bg-green-500"
        } px-2 py-1`}
      >
        <div className="flex items-center gap-2">
          <div className="rounded-full w-2 h-2 bg-white"></div>
          {status}
        </div>
      </div>
    </>
  );
};
const CharacterPage: NextPage = () => {
  const [redirectTo, SetRedirectTo] = useState("?page=1");
  const router = useRouter();
  const characterId = router.query?.id;
  const { isLoading, isError, data, error } = useQuery(["character"], () =>
    getCharacter(router.query.id)
  );
  if (!characterId) {
    return <NotFoundPage />;
  }
  const dateFormat = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const redirect = localStorage.getItem("redirectTo") || "page=1";
    SetRedirectTo(redirect);
  }, []);
  return (
    <div>
      {isLoading ? (
        <div>loading...</div>
      ) : isError && error instanceof Error ? (
        <>{error.message}</>
      ) : (
        <div className="container mx-auto px-4 pt-8">
          <Link href={`/${redirectTo}`}>
            <div className="pb-4 flex items-center gap-2 hover:text-orange-500">
              <ArrowLeftCircleIcon className="h-10 w-10" />
              <span className="text-lg">Back</span>
            </div>
          </Link>
          <div className="flex flex-wrap gap-2 md:gap-8">
            <div className="flex flex-wrap flex-col items-center gap-4">
              <Image
                src={data?.image}
                priority={false}
                width="200"
                height="200"
                loading="lazy"
                alt=""
              />
              <h1 className="font-bold text-xl whitespace-nowrap">
                {data.name}
              </h1>
            </div>
            <div className="">
              <div aria-label="Gender" className="py-2">
                <span className="font-semibold">Gender</span>
                <div className="border rounded-md px-2 py-1">{data.gender}</div>
              </div>
              <div aria-label="Status" className="py-2">
                <span className="font-semibold">Status</span>
                <Status status={data.status} />
              </div>
              <div aria-label="Location" className="py-2">
                <span className="font-semibold">Location</span>
                <div className="ml-4">- {data.location.name}</div>
              </div>
              <div aria-label="Origin" className="py-2">
                <span className="font-semibold">Origin</span>
                <div className="ml-4">- {data.origin.name}</div>
              </div>
              <div aria-label="Species" className="py-2">
                <span className="font-semibold">Species</span>
                <div className="ml-4">- {data.species}</div>
              </div>
              <div aria-label="Created" className="py-2">
                <span className="font-semibold">Created</span>
                <div className="ml-4">
                  - {dateFormat.format(new Date(data.created))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const param = ctx.params;
  console.log(param?.id);

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["character"], () => {
    return getCharacter(param?.id);
  });
  return {
    props: { dehydrateState: dehydrate(queryClient) },
  };
};

export default CharacterPage;
