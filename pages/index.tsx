import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCharacters } from "../libs/characters";
import {
  ArrowSmallLeftIcon,
  ArrowSmallRightIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Link from "next/link";
import Loading from "../components/Loading";
import Footer from "../components/Footer";

const Home: NextPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const { isLoading, isError, data, error } = useQuery(
    ["characters", page],
    () => getCharacters(page)
  );

  const pageHandler = (next: boolean, page: number) => {
    if (next === true) {
      setPage(page + 1);
      localStorage.setItem("redirectTo", `?page=${page + 1}`);
    } else {
      if (page > 1) {
        setPage(page - 1);
        localStorage.setItem("redirectTo", `?page=${page - 1}`);
      }
    }
  };
  const Status = ({ status, species }: { status: string; species: string }) => {
    if (status === "Alive") {
      return (
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-green-500"></div>
          <span>Alive - {species}</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-red-500"></div>
          <span>Dead - {species}</span>
        </div>
      );
    }
  };
  useEffect(() => {
    if (router.query.page === undefined) {
      setPage(1);
    } else {
      setPage(Number(router.query.page));
    }
  }, [router]);

  return (
    <>
      <div className="container mx-auto px-4 pt-4 pb-10">
        <Head>
          <title>the rick and morty</title>
          <meta name="description" content="The rick and morty characters" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div className="text-center pb-4">
            <Link href={"/"}>
              <h2 className="font-bold text-3xl">
                The Rick and Morty Characters
              </h2>
            </Link>
          </div>
          {isLoading ? (
            <Loading />
          ) : isError && error instanceof Error ? (
            <div>{error.message}</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {data.results.map((character: typeof props) => (
                <div
                  className="flex flex-wrap md:flex-nowrap items-center bg-neutral-800 rounded-md gap-1"
                  key={character.id}
                >
                  <div className="rounded-full mx-auto md:mx-0">
                    <Image
                      src={character.image}
                      priority={false}
                      width="100"
                      height="100"
                      loading="lazy"
                      alt=""
                    />
                  </div>
                  <div className="p-2">
                    <Link href={`/character/${character.id}`}>
                      <h2 className="text-lg font-bold hover:text-orange-500">
                        {character.name}
                      </h2>
                    </Link>
                    <div className="flex flex-col gap-2">
                      <span>
                        <Status
                          status={character.status}
                          species={character.species}
                        />
                      </span>
                      <div>
                        <p className="text-neutral-400">
                          Last known location :
                        </p>
                        <span>{character.location.name}</span>
                      </div>
                      <div>
                        <p className="text-neutral-400">Origin :</p>
                        <span>{character.origin.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="fixed bottom-0 left-0 right-0">
            <div className="flex justify-center gap-6">
              <Link href={`?page=${page > 1 ? page - 1 : 1}`}>
                <div
                  className="bg-neutral-900 border border-neutral-600 px-4 py-1 rounded-md shadow flex items-center gap-2 cursor-pointer"
                  onClick={() => pageHandler(false, page)}
                >
                  <ArrowSmallLeftIcon className="h-5 w-5" /> Prev
                </div>
              </Link>
              <Link href={`?page=${data?.info.next !== null ? page + 1 : 1}`}>
                <div
                  className="bg-neutral-900 border border-neutral-600 px-4 py-1 rounded-md shadow flex items-center gap-2 cursor-pointer"
                  onClick={() => pageHandler(true, page)}
                >
                  <span className="bg-gradient-to-r from-rose-500 to-violet-500 bg-clip-text text-transparent">
                    Next
                  </span>{" "}
                  <ArrowSmallRightIcon className="h-5 w-5" />
                </div>
              </Link>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { page } = ctx.query;
  const currentPage = page === undefined ? 1 : page;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["characters", currentPage], () =>
    getCharacters(Number(currentPage))
  );
  // const characters = await getCharacters(Number(page));
  return {
    props: { dehydrateState: dehydrate(queryClient) },
  };
};

export default Home;
