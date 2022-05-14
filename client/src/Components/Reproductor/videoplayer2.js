import React from "react";

function View2({ ubicacion }) {
  return (
    <div>
      <video
        width="940"
        height="680"
        controls
        controlsList="nodownload"
      >
        <source src={ubicacion} type="video/mp4" />
      </video>
    </div>
  );
}

export default View2;