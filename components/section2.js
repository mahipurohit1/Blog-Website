import fetcher from "@/libs/fetcher";
import Image from "next/image";
import Link from "next/link";
import Author from "./child/author";
import Error from "./child/error";
import Spinner from "./child/spinner";
export default function section2() {
  const { data, isLoading, isError } = fetcher("api/posts");

  if (isLoading) return <Spinner></Spinner>;
  if (isError) return <Error></Error>;
  console.log(data);
  return (
    <section className="container mx-auto md:px-20 py-10">
      <h1 className="font-bold text-4xl py-12 text-center">Latest Posts</h1>

      {/* grid columns */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
        {data &&
          data.map((value, index) => <Post data={value} key={index}></Post>)}
      </div>
    </section>
  );
}

function Post(data) {
  // const { img, title, subtitle, published, category, author } = data;
  const { id } = data.data;
  return (
    <div className="item">
      <div className="images">
        <Link href={`/posts/${id}`}>
          <Image
            src={data.data.img}
            className="rounded"
            width={500}
            height={350}
            alt={data.data.title}
            priority
          />
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat">
          <Link
            href={`/posts/${id}`}
            className="text-orange-600 hover:text-orange-800"
          >
            {data.data.category} || unknown
          </Link>
          <Link
            href={`/posts/${id}`}
            className="text-gray-800 hover:text-gray-600"
          >
            - {data.data.published} || unknown
          </Link>
        </div>
        <div className="title">
          <Link
            href={`/posts/${id}`}
            className="text-xl font-bold text-gray-800 hover:text-gray-600"
          >
            {data.data.title}
          </Link>
        </div>
        <p className="text-gray-500 py-3">{data.data.subtitle}</p>
        {data.data.author && <Author></Author>}
      </div>
    </div>
  );
}
