import React from "react";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterFollowButton,
  TwitterMentionButton,
} from "react-twitter-embed";
import Box from "@mui/material/Box";

export default function Twitter() {
  return (
    <>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="cindie_2022"
        options={{
          height: 600,
          width: 320,
        }}
        theme="dark"
      />
      <Box display="grid">
        <TwitterFollowButton screenName={"cindie_2022"} />

        <TwitterMentionButton screenName={"cindie_2022"} />

        <TwitterShareButton
          url={"https://twitter.com/cindie_2022"}
          options={{
            text: "Descubre lo mejor del Mundo cinematográfico independiente",
            via: "cindie",
          }}
        />
      </Box>
    </>
  );
}
