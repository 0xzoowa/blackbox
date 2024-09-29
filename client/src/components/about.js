import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <article className="container mx-auto p-6 max-w-3xl min-h-[calc(100vh-64px-56px)]">
      <header className="mb-6">
        <h1 className="inline-block text-xl font-bold text-white bg-purple-600 dark:bg-purple-700 px-3 py-1 rounded">
          What is a blackbox?
        </h1>
      </header>

      <section className="mb-8">
        <p className="text-sm leading-relaxed text-gray-500 dark:text-stone-500 [&:not(.dark)]:text-gray-500 mb-4">
          According to master chat: A black box refers to a system, device, or
          process whose internal workings are unknown or not fully understood,
          but whose inputs and outputs are visible and can be observed. In other
          words, while you can see how the system behaves and interact with it,
          you cannot see or understand the mechanisms or logic inside it.
        </p>
      </section>

      <header className="mb-6">
        <h1 className="inline-block text-xl font-bold text-white bg-purple-600 dark:bg-purple-700 px-3 py-1 rounded">
          About the creator
        </h1>
      </header>

      <section className="mb-8">
        <h2 className="text-sm font-semibold mb-4 text-purple-600 dark:text-purple-400">
          Professional Life: API Design & Implementation
        </h2>
        <p className="text-sm leading-relaxed text-gray-500 dark:text-stone-500 [&:not(.dark)]:text-gray-500 mb-4">
          By day, I'm a software engineer specializing in designing and
          implementing APIs. My current tech stack includes:
        </p>

        <div className="flex space-x-8 mb-4">
          <div className="flex-1">
            <h3 className="text-xs font-medium mb-2 text-purple-600 dark:text-purple-400">
              Languages
            </h3>
            <ul className="list-disc list-inside text-xs text-gray-500 dark:text-stone-500 [&:not(.dark)]:text-gray-500">
              <li>JavaScript</li>
              <li>TypeScript</li>
              <li>C</li>
              <li>C#</li>
            </ul>
          </div>
          <div className="flex-1">
            <h3 className="text-xs font-medium mb-2 text-purple-600 dark:text-purple-400">
              Frameworks
            </h3>
            <ul className="list-disc list-inside text-xs text-gray-500 dark:text-stone-500 [&:not(.dark)]:text-gray-500">
              <li>ExpressJS</li>
              <li>NestJS</li>
              <li>ASP.NET Core</li>
            </ul>
          </div>
        </div>

        <h2 className="text-sm font-semibold mb-4 text-purple-600 dark:text-purple-400">
          Personal Passion: Continuous Learning
        </h2>
        <p className="text-sm leading-relaxed text-gray-500 dark:text-stone-500 [&:not(.dark)]:text-gray-500 mb-4">
          At night, my engineering mindset doesn't rest. I'm a passionate
          learner with a deep curiosity for technology.
        </p>

        <ul className="list-disc list-inside mb-4 text-sm leading-relaxed text-gray-500 dark:text-stone-500 [&:not(.dark)]:text-gray-500">
          <li>
            <strong>Approach</strong>: When a technology piques my interest, I
            dissect it until I understand its core principles.
          </li>
          <li>
            <strong>Philosophy</strong>: I'm not fond of black boxes. To use a
            technology effectively, I need to understand its inner workings.
          </li>
        </ul>

        {/* <h3 className="text-sm font-semibold mb-4 text-purple-600 dark:text-purple-400">
          Project: Blackbox
        </h3> */}
        <header className="mb-6">
          <h1 className="inline-block text-xl font-bold text-white bg-purple-600 dark:bg-purple-700 px-3 py-1 rounded">
            Why blackbox?
          </h1>
        </header>
        <p className="text-sm leading-relaxed text-gray-500 dark:text-stone-500 [&:not(.dark)]:text-gray-500 mb-4">
          To document my learning process, I've created "Blackbox":
        </p>
        <ul className="list-disc list-inside mb-4 text-sm leading-relaxed text-gray-500 dark:text-stone-500 [&:not(.dark)]:text-gray-500">
          <li>
            <strong>Purpose</strong>: To record my thought process for future
            reference
          </li>
          <li>
            <strong>Audience</strong>: Myself and anyone else who might find it
            helpful
          </li>
          <li>
            <strong>Content</strong>: You can explore some of my insights in the{" "}
            <Link
              to="/blog"
              className="text-purple-600 dark:text-purple-400 hover:underline"
            >
              blog
            </Link>{" "}
            section
          </li>
        </ul>
      </section>

      <p className="text-sm leading-relaxed text-gray-500 dark:text-stone-500 [&:not(.dark)]:text-gray-500 italic">
        Thank you for stopping by and taking an interest in my journey!
      </p>
    </article>
  );
};

export default About;
