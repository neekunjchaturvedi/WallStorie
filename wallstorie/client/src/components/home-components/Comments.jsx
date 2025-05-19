import React, { useState } from "react";

// const CommentSection = () => {
//   const comments = [
//     {
//       id: 1,
//       name: "Sneha Aggarwal",
//       location: "Hyderabad, India",
//       comment:
//         "Working with your design team was an absolute pleasure. The attention to detail and creativity exceeded my expectations. Thank you for making my home beautiful!",
//       imgSrc: "https://via.placeholder.com/50", // Replace with actual profile image
//     },
//     {
//       id: 2,
//       name: "Asif Ali",
//       location: "Bangalore, India",
//       comment:
//         "Exceptional service! From the initial consultation to the final reveal. Highly recommend!",
//       imgSrc: "https://via.placeholder.com/50", // Replace with actual profile image
//     },
//     {
//       id: 3,
//       name: "Riya Sharma",
//       location: "Delhi, India",
//       comment:
//         "The designs were stunning, and the entire process was so smooth. My living room has never looked better!",
//       imgSrc: "https://via.placeholder.com/50", // Replace with actual profile image
//     },
//     {
//       id: 4,
//       name: "Arjun Kapoor",
//       location: "Mumbai, India",
//       comment:
//         "Brilliant team and excellent execution! I'm thrilled with how my home turned out.",
//       imgSrc: "https://via.placeholder.com/50", // Replace with actual profile image
//     },
//   ];

//   const [currentIndex, setCurrentIndex] = useState(0);

//   const goToNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 2) % comments.length);
//   };

//   const goToPrev = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0
//         ? comments.length - 2
//         : (prevIndex - 2 + comments.length) % comments.length
//     );
//   };

//   return (
//     <div className="w-full max-w-5xl mx-auto mt-12 px-4 h-[500px] relative my-10">
//       <div className="relative h-full">
//         <img
//           src="/src/assets/Image.png"
//           alt="Background"
//           className="absolute top-0 left-0 w-1/4 h-full object-cover rounded-lg shadow-lg"
//         />
//         <h2 className="absolute flex justify-end lg:inset-10 left-1/2 text-xl md:text-3xl font-bold text-green-700 text-left mb-5 ">
//           What Our Customers Say About Us
//         </h2>

//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
//           {[0, 1].map((offset) => {
//             const commentIndex = (currentIndex + offset) % comments.length;
//             return (
//               <div
//                 className="bg-green-50 bg-opacity-90 p-4 md:p-6 rounded-sm shadow-lg flex justify-center items-center w-72 md:w-80 lg:w-96"
//                 key={comments[commentIndex].id}
//               >
//                 <div className="flex items-start space-x-3 md:space-x-4">
//                   {/* Profile Image */}

//                   {/* Comment Content */}
//                   <div>
//                     <p className="text-gray-700 italic text-sm md:text-base mb-3 md:mb-4 font-lato">
//                       "{comments[commentIndex].comment}"
//                     </p>
//                     <p className="font-bold text-green-900 text-sm md:text-base">
//                       {comments[commentIndex].name}
//                     </p>
//                     <p className="text-xs md:text-sm text-gray-500">
//                       {comments[commentIndex].location}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         {/* Navigation Buttons */}
//         <div className="absolute bottom-5 left-64 flex space-x-4 z-10">
//           <button
//             className="p-3 bg-green-200 hover:bg-green-300  transition-colors text-black "
//             onClick={goToPrev}
//           >
//             &#8592;
//           </button>
//           <button
//             className="p-3 bg-green-200 hover:bg-green-300 transition-colors text-black"
//             onClick={goToNext}
//           >
//             &#8594;
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

function CommentSection() {
  return (
    <div>
      <img
        src=".\src\assets\testimonial.png"
        alt="testimonial"
        className="flex justify-center items-center w-2/3 object-cover mx-auto"
      />
    </div>
  );
}

export default CommentSection;
