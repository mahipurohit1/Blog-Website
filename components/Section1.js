import fetcher from "@/libs/fetcher";
import Image from "next/image";
import Link from "next/link";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";

import Author from "./child/author";
import Error from "./child/error";
import Spinner from "./child/spinner";
export default function section1() {
  SwiperCore.use([Autoplay]);
  const { data, isLoading, isError } = fetcher("api/tranding");

  if (isLoading) return <Spinner></Spinner>;
  if (isError) return <Error></Error>;
  const bg = {
    background: "url('/images/banner.png') no-repeat",
    backgroundPosition: "right",
    backgroundSize: "400px 550px",
  };

  return (
    <section className="py-16" style={bg}>
      <div className="container mx-auto md:px-20">
        <h1 className="font-bold text-4xl pb-12 text-center">Trending</h1>

        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2000,
          }}
        >
          {data.map((value, index) => (
            <SwiperSlide key={index}>
              <Slide data={value}></Slide>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function Slide({ data }) {
  const { id, title, img, description, category, published, author } = data;
  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="image">
        <Link href={`/posts/${id}`}>
          <Image src={img} width={500} height={550} alt={title} />
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="cat">
          <Link
            href={`/posts/${id}`}
            className="text-orange-600 hover:text-orange-800"
          >
            {category}
          </Link>
          <Link
            href={`/posts/${id}`}
            className="text-gray-800 hover:text-gray-600"
          >
            - {published}
          </Link>
        </div>
        <div className="title">
          <Link
            href={`/posts/${id}`}
            className="text-3xl md:text-5xl font-bold text-gray-800 hover:text-gray-600"
          >
            {title}
          </Link>
        </div>
        <p className="text-gray-500 py-3">{description}</p>
        {author && <Author></Author>}
      </div>
    </div>
  );
}
