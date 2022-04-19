import Head from "next/head";
import EpicPage from "../components/epic/EpicPage";

const Home = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>PROMA</div>
      <div>프로젝트로 이동해주세요</div>
      {/* <EpicPage></EpicPage> */}
    </>
  );
};
export default Home;
