import fetcher from "@/libs/fetcher";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import Author from "./child/author";
import Error from "./child/error";
import Spinner from "./child/spinner";
export default function section3() {
  const { data, isLoading, isError } = fetcher("api/popular");

  if (isLoading) return <Spinner></Spinner>;
  if (isError) return <Error></Error>;
  return (
    <section className="container mx-auto md:px-20 py-16">
      <h1 className="font-bold text-4xl py-12 text-center">Most Popular</h1>

      {/* swiper */}
      <Swiper
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
      >
        {data.map((value, index) => (
          <SwiperSlide key={index}>
            <Post data={value}></Post>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

function Post({ data }) {
  const { id, title, category, img, description, published, author } = data;

  return (
    <div className="grid gap-x-72">
      <div className="images">
        <Link href={`/posts/${id}`}>
          <Image src={img} width={500} height={400} alt={title} />
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4 ">
        <div className="cat">
          <Link
            href={`/posts/${id}`}
            className="text-orange-600 hover:text-orange-800"
          >
            {category}
          </Link>
          <Link
            href={`/posts/${id}`}
            className="text-gray-800 hover:text-gray-600 mr-1.5"
          >
            - {published}
          </Link>
        </div>
        <div className="title">
          <Link
            href={`/posts/${id}`}
            className="text-3xl md:text-3xl font-bold text-gray-800 hover:text-gray-600"
          >
            {title}
          </Link>
        </div>
        <p className="text-gray-500 py-3 ">{description}</p>
        {author && <Author></Author>}
      </div>
    </div>
  );
}
