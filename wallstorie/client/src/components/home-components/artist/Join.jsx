import React from "react";

const ArtistCollaboration = () => {
  return (
    <>
      <div className="flex max-w-4xl justify-center mx-auto flex-col mb-16">
        <div className="flex items-center justify-center bg-[#EAF7E5] rounded-xl p-6 shadow-sm max-w-xl mx-auto mb-10">
          <div className="max-w-md">
            <p className="text-green-700 font-medium mb-2 font-lato">
              We're excited to collaborate with passionate artists like you!
              Submit your artwork today and start transforming homes with your
              creativity
            </p>
            <button className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-full transition-colors duration-300">
              <a
                href={`https://wa.me/916302644520?text=I'm%20interested%20in%20Collaborating%20with%20WallStorie%20as%20an%20Artist`}
              >
                Get in touch
              </a>
            </button>
          </div>
        </div>
        <div className="md:block text-green-700 text-4xl md:text-5xl font-bold leading-tight flex flex-col sm: items-center justify-center">
          READY
          <br />
          TO JOIN?
        </div>
      </div>
    </>
  );
};

export default ArtistCollaboration;
