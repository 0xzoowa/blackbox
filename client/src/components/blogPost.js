import React from "react";

const BlogPost = ({ title, content }) => {
  const baseUrl = process.env.REACT_APP_API_URL;
  console.log("base", baseUrl);
  return (
    <article className="mb-8">
      <h2 className="text-3xl font-bold mb-4">{title}</h2>
      {Array.isArray(content) &&
        content.map((item, index) => {
          switch (item?.type) {
            case "paragraph":
              return (
                <p key={index} className="mb-4">
                  {item.text}
                </p>
              );
            case "heading":
              return (
                <h3 key={index} className="text-2xl font-semibold mb-2">
                  {item.text}
                </h3>
              );
            case "subheading":
              return (
                <h4 key={index} className="text-xl font-medium mb-2">
                  {item.text}
                </h4>
              );
            case "image":
              return (
                <div key={index} className="mb-4">
                  <img
                    src={`${baseUrl}/${item.text}`}
                    alt={item.alt || " "}
                    className="max-w-full h-auto rounded-lg shadow-md"
                  />
                  {/* todo:image sizing */}
                </div>
              );
            case "code":
              return (
                <pre
                  key={index}
                  className="bg-gray-100 p-4 rounded-md mb-4 overflow-x-auto"
                >
                  <code>{item.text}</code>
                </pre>
              );
            default:
              return null;
          }
        })}
    </article>
  );
};

export default BlogPost;
