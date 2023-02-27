import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Head from "next/head";
const Layout = (props) => {
  return (
    <>
      <Head>
        <title>Blog</title>
      </Head>
      <Header></Header>
      <main>{props.children}</main>
      <Footer />
    </>
  );
};

export default Layout;
