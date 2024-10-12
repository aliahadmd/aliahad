import React from "react";
import { User, Mail, Github, Linkedin, FileText } from "lucide-react";
import Image from "next/image";

const Home = () => {
  return (
    <div className="min-h-screen p-8 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              className="h-48 w-full object-cover md:w-48"
              src="/images/ali.png"
              alt="Profile"
              width="800"
              height="800"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 dark:text-indigo-400 font-semibold">
              Software Engineer
            </div>
            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Ali Ahad
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300">
              Passionate about creating elegant solutions to complex problems. I
              specialize in full-stack development with a focus on Data-Driven
              development and Machine Learning.
            </p>
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50 dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">About Me</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            With over 6 years of experience in software development, I&apos;ve
            worked on a variety of projects ranging from e-commerce platforms to
            data visualization tools. I&apos;m constantly learning and exploring
            new technologies to stay at the forefront of the ever-evolving tech
            landscape.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            When I&apos;m not coding, you can find me hiking in the mountains,
            reading sci-fi novels, or experimenting with new recipes in the
            kitchen.
          </p>
        </div>

        <div className="px-8 py-6 dark:bg-gray-900">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "TypeScript",
              "C/C++",
              "Python",
              "PHP",
              "Golang",
              "SQL",
              "Pytorch",
              "Git",
              "VPS",
              "Docker",
              "Django",
              "React",
              "Vuejs",
              "Nodejs",
            ].map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50 dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Contact</h2>
          <div className="space-y-4">
            <a href="mailto:ali@aliahad.com" className="flex items-center text-gray-600 dark:text-gray-300">
              <Mail className="h-5 w-5 mr-2 text-gray-400 dark:text-gray-500" /> ali@aliahad.com
            </a>
            <a href="https://github.com/aliahadmd" className="flex items-center text-gray-600 dark:text-gray-300">
              <Github className="h-5 w-5 mr-2 text-gray-400 dark:text-gray-500" />{" "}
              github.com/aliahadmd
            </a>
            <a href="https://linkedin.com/in/aliahadmd" className="flex items-center text-gray-600 dark:text-gray-300">
              <Linkedin className="h-5 w-5 mr-2 text-gray-400 dark:text-gray-500" />{" "}
              linkedin.com/in/aliahadmd
            </a>
          </div>
        </div>

        <div className="px-8 py-6 dark:bg-gray-900">
          <a
            href="/pdf/MD_AHAD_ALI_4.pdf"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900"
          >
            <FileText className="h-5 w-5 mr-2" />
            Download/View Resume
          </a>
          <br />
          <span className="text-xs dark:text-gray-400">updated at: 06/09/2024 </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
