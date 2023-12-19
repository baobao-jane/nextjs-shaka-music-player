import { Box } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
import { Lrc, LrcLine } from "react-lrc";

type Props = {
  currentMillisecond: number;
  signal: any;
};

const LyricsBox: FC<Props> = ({ currentMillisecond, signal }) => {
  const [lyrics, setLyrics] = useState<string>("");

  const lineRenderer = useCallback(
    ({ active, line: { content } }: { active: boolean; line: LrcLine }) => (
      <Box
        sx={{
          textAlign: "center",
          color: active ? "green" : "black",
          fontWeight: active ? 700 : 400,
          fontSize: active ? 18 : 15,
        }}
      >
        {content}
      </Box>
    ),
    []
  );

  useEffect(() => {
    const fetchLyrics = async () => {
      try {
        const response = await fetch(
          "/sample-files/Love Me Like You Do (Ellie Goulding) - 320 Kbps - (BossM.lrc"
        );
        const data = await response.text();
        setLyrics(data);
      } catch (error) {
        console.error("Error fetching lyrics:", error);
      }
    };

    fetchLyrics();
  }, []);

  return (
    <Box>
      <Lrc
        lrc={lyrics}
        lineRenderer={lineRenderer}
        verticalSpace
        currentMillisecond={currentMillisecond}
        recoverAutoScrollSingal={signal}
        recoverAutoScrollInterval={0}
      />
    </Box>
  );
};
export default LyricsBox;
