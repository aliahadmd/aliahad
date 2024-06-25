import React from "react";
import { User, Mail, Github, Linkedin, FileText } from "lucide-react";
import BlurImage from "@/components/image/image";

const Home = () => {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <BlurImage
              className="h-48 w-full object-cover md:w-48"
              src="/images/ali.png"
              alt="Profile"
              width="800"
              height="800"
            />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              Software Engineer
            </div>
            <h1 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Ali Ahad
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-gray-500">
              Passionate about creating elegant solutions to complex problems. I
              specialize in full-stack development with a focus on Data-Driven
              development and Machine Learning.
            </p>
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">About Me</h2>
          <p className="text-gray-600 mb-4">
            With over 5 years of experience in software development, I&apos;ve
            worked on a variety of projects ranging from e-commerce platforms to
            data visualization tools. I&apos;m constantly learning and exploring
            new technologies to stay at the forefront of the ever-evolving tech
            landscape.
          </p>
          <p className="text-gray-600 mb-4">
            When I&apos;m not coding, you can find me hiking in the mountains,
            reading sci-fi novels, or experimenting with new recipes in the
            kitchen.
          </p>
        </div>

        <div className="px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "TypeScript",
              "C/C++",
              "Python",
              "SQL",
              "Pytorch",
              "Git",
              "VPS",
              "Docker",
            ].map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact</h2>
          <div className="space-y-4">
            <p className="flex items-center text-gray-600">
              <Mail className="h-5 w-5 mr-2 text-gray-400" /> ali@aliahad.com
            </p>
            <p className="flex items-center text-gray-600">
              <Github className="h-5 w-5 mr-2 text-gray-400" />{" "}
              github.com/aliahadmd
            </p>
            <p className="flex items-center text-gray-600">
              <Linkedin className="h-5 w-5 mr-2 text-gray-400" />{" "}
              linkedin.com/in/aliahadmd
            </p>
          </div>
        </div>

        <div className="px-8 py-6">
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FileText className="h-5 w-5 mr-2" />
            Download Resume
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
