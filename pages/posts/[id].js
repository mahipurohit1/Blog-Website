import Related from "@/components/child/related";
import Layout from "@/layout/Layout";
import getPost from "@/libs/helper";
import Image from "next/image";
import Author from "../../components/child/author";

export default function Page({ posts }) {
  const { id, title, img, description, category, published, author, subtitle } =
    posts;
  return (
    <Layout>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
        <div className="flex justify-center">{author && <Author></Author>}</div>

        <div className="post py-10">
          <h1 className="font-bold text-4xl text-center pb-5">{title}</h1>

          <p className="text-gray-500 text-xl text-center">{subtitle}</p>

          <div className="py-10">
            <Image src={img} width={900} height={600}></Image>
          </div>

          <div className="content text-gray-600 text-lg flex flex-col gap-4">
            {description}
          </div>
        </div>
        <Related></Related>
      </section>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const id = params.id;
  const posts = await getPost(id);
  return {
    props: {
      posts,
    },
  };
}
