import { Fragment, useEffect, useState } from "react";
import { Post, Sub } from "../types";
import Head from "next/head";
import PostCard from "../components/PostCard";
import useSWR, { useSWRInfinite } from "swr";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "../context/auth";

export default function Home() {
  const [observedPost, setObservedPost] = useState("");
  //const { data: posts } = useSWR<Post[]>("/posts");
  const { data: topSubs } = useSWR<Sub[]>("/misc/top-subs");

  const description =
    "ReadHub is a network of communities based on people's interests. Find communities you are interested in, and become part of an online community!";
  const title = "ReadHuber...--// the front page of the internet!";

  const { authenticated } = useAuthState();

  const {
    data,
    error,
    size: page,
    setSize: setPage,
    isValidating,
    revalidate,
  } = useSWRInfinite<Post[]>((index) => `/posts?page=${index}`)
  
  const isInitialLoading = !data && !error;
  const posts: Post[] = data ? ([] as any[]).concat(...data): [];

  useEffect(() => {
    if (!posts || posts.length === 0) return;

    const id = posts[posts.length - 1].identifier;

    if (id !== observedPost) {
      setObservedPost(id);
      observeElement(document.getElementById(id)!);
    }
  }, [posts]);

  const observeElement = (element: HTMLElement) => {
    if (!element) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          console.log("Reached botton of post");
          setPage(page + 1);
          observer.unobserve(element);
        }
      },
      { threshold: 1 }
    );
    observer.observe(element);
  };

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
        <meta property="og:description" content={description}></meta>
        <meta property="og:title" content={title}></meta>
        <meta property="twitter:description" content={description}></meta>
        <meta property="twitter:title" content={title}></meta>
      </Head>
      <div className="container flex pt-4">
        {/** Posts  feed */}
        <div className="w-full px-4 md:w-160 md:p-0">
          {isInitialLoading && (
            <p className="text-lg text-center">Loading...</p>
          )}
          {posts?.map((post: Post) => (
            <PostCard
              post={post}
              key={post.identifier}
              revalidate={revalidate}
            />
          ))}
          {isValidating && posts?.length > 0 && (
            <p className="text-lg text-center">Loading More ..</p>
          )}
        </div>
        {/* Sidebar */}
        <div className="hidden ml-6 w-80 md:block">
          <div className="bg-white rounded">
            <div className="p-4 border-b-2">
              <p className="text-lg font-semibold text-center">
                TOP Communities
              </p>
            </div>
            <div>
              {topSubs?.map((sub) => (
                <div
                  key={sub.name}
                  className="flex items-center px-4 py-2 text-xs border-b"
                >
                  <Link href={`/r/${sub.name}`}>
                    <a>
                      <Image
                        src={sub.imageUrl}
                        alt="Sub"
                        width={(6 * 16) / 4}
                        height={(6 * 16) / 4}
                        className="rounded-full cursor-pointer"
                      />
                    </a>
                  </Link>
                  <Link href={`/r/${sub.name}`}>
                    <a className="font-bold hover:cursor-pointer">
                      /r/{sub.name}
                    </a>
                  </Link>
                  <p className="ml-auto font-medium">{sub.postCount}</p>
                </div>
              ))}
            </div>
            {authenticated && (
              <div className="p-4 border-t-2">
                <Link href="/subs/create">
                  <a className="w-full px-2 py-1 green button">
                    Create Community
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const res = await Axios.get('/posts')
//     return { props: { post: res.data } }
//   } catch (err) {
//     return { props: { error: 'Something went wrong '}}
//   }
// }
