import React, { useState } from "react";
import { useGlobalState } from "../context/globalState";
import { X } from "lucide-react";

const BlogPost = ({ title, content }) => {
  const { baseUrl } = useGlobalState();
  const [expandedImages, setExpandedImages] = useState(new Set());
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const toggleImage = (index) => {
    setExpandedImages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const openFullscreen = (imageUrl) => {
    setFullscreenImage(imageUrl);
    document.body.style.overflow = "hidden";
  };

  const closeFullscreen = () => {
    setFullscreenImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <article className="mb-8 w-full max-w-full overflow-hidden px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
        {Array.isArray(content) &&
          content.map((item, index) => {
            switch (item?.type) {
              case "paragraph":
                return (
                  <p key={index} className="mb-4 text-sm md:text-base">
                    {item.text}
                  </p>
                );
              case "heading":
                return (
                  <h3
                    key={index}
                    className="text-xl md:text-2xl font-semibold mb-2"
                  >
                    {item.text}
                  </h3>
                );
              case "subheading":
                return (
                  <h4
                    key={index}
                    className="text-lg md:text-xl font-medium mb-2"
                  >
                    {item.text}
                  </h4>
                );
              case "image":
                const isExpanded = expandedImages.has(index);
                const imageUrl = `${baseUrl}/${item.text}`;
                return (
                  <div key={index} className="mb-8">
                    <div className="relative w-full max-w-full overflow-hidden">
                      <img
                        src={imageUrl}
                        alt={item.alt || " "}
                        onClick={() => toggleImage(index)}
                        className={`
                          cursor-pointer
                          rounded-lg
                          shadow-md
                          transition-all
                          duration-300
                          mx-auto
                          ${
                            isExpanded
                              ? "w-full md:w-auto md:max-w-full md:max-h-[80vh]"
                              : "w-full max-h-[300px] md:max-h-[400px] object-cover"
                          }
                        `}
                      />
                      <div className="mt-1 text-center space-y-2">
                        <div className="text-sm text-gray-500">
                          Click to {isExpanded ? "shrink" : "expand"}
                        </div>
                        {isExpanded && (
                          <button
                            onClick={() => openFullscreen(imageUrl)}
                            className="text-sm text-blue-600 hover:text-blue-800"
                          >
                            View Full Size
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              case "code":
                return (
                  <div
                    key={index}
                    className="w-full max-w-full overflow-x-auto"
                  >
                    <pre className="bg-gray-100 p-4 rounded-md mb-4 text-sm md:text-base whitespace-pre-wrap break-words">
                      <code className="block w-full">{item.text}</code>
                    </pre>
                  </div>
                );
              default:
                return null;
            }
          })}
      </article>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={closeFullscreen}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={closeFullscreen}
          >
            <X size={24} />
          </button>
          <img
            src={fullscreenImage}
            alt="Fullscreen view"
            className="max-w-[95vw] max-h-[95vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default BlogPost;
