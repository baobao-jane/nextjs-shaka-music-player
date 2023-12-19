import Head from "next/head";
import dynamic from "next/dynamic";
const ShakaAudioPlayer = dynamic(
  () => import("src/components/audio-player/shaka-audio-player"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Head>
        <title>nextjs-shaka-music-player</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <ShakaAudioPlayer />
      </main>
    </>
  );
}
