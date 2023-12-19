import { FC, useEffect, useRef, useState } from "react";
import "shaka-player/dist/controls.css";
import shaka from "shaka-player/dist/shaka-player.ui";
import "shaka-player";

import LyricsBox from "./lyrics-box";
import { useRecoverAutoScrollImmediately } from "react-lrc";
import useTimer from "src/hooks/use-timer";
import { Box, Typography } from "@mui/material";

const ShakaAudioPlayer: FC = () => {
  const [open, setOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContainerRef = useRef<HTMLDivElement | null>(null);
  const { currentMillisecond, setCurrentMillisecond, reset, play, pause } =
    useTimer(1);
  const { signal, recoverAutoScrollImmediately } =
    useRecoverAutoScrollImmediately();

  useEffect(() => {
    initPlayer();
  }, []);

  const initPlayer = async () => {
    shaka.polyfill.installAll();
    const player = new shaka.Player(audioRef.current as HTMLVideoElement);

    if (player && audioContainerRef.current && audioRef.current) {
      player.configure({
        abr: { enabled: true },
      });

      try {
        await player
          .load("/sample-files/ellie-goulding-love-me-like-you-do_132741.mp4")
          .then(function () {
            console.log("The audio has now been loaded!");

            // addSubtitleTracks(player);
          });
      } catch (error: any) {
        console.log("error: ", error);
      }
    }
  };

  const handlePlayButton = () => {
    play();
    setInterval(() => {
      if (audioRef.current) {
        setCurrentMillisecond(audioRef.current.currentTime * 1000);
      }
    }, 100);
  };

  const handlePauseButton = () => {
    pause();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
      onClick={recoverAutoScrollImmediately}
    >
      <Typography sx={{ textAlign: "center", my: 2 }}>
        next.js shaka player audio with .lrc
      </Typography>
      <Box ref={audioContainerRef} sx={{ width: 400, height: 50, mb: 2 }}>
        <audio
          style={{
            width: "100%",
            height: "100%",
          }}
          controls
          ref={audioRef}
          onPlay={handlePlayButton}
          onPause={handlePauseButton}
        />
      </Box>
      <LyricsBox currentMillisecond={currentMillisecond} signal={signal} />
    </Box>
  );
};

export default ShakaAudioPlayer;
