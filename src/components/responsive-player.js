import React from 'react';
import ReactPlayer from 'react-player';

const ResponsivePlayer = ({link}) => {
  return (
    <div className="container w-full md:w-1/2 mt-2 mb-2 shadow">
      <div className="relative overflow-hidden container-16-9">
        <ReactPlayer
          controls={true}
          className="absolute top-0 left-0"
          url={link}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default ResponsivePlayer;
