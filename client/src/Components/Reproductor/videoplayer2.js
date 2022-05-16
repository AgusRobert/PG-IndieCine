import React from "react";

function View2({ ubicacion }) {
  return (
    <div>
      <video
        width="100%"
        height="100%"
        controls
        controlsList="nodownload"
      >
        <source src={ubicacion} type="video/mp4" />
      </video>
    </div>
  );
}

export default View2;