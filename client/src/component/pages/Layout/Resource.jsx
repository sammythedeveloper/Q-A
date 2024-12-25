import { motion } from "framer-motion";
const Resources = () => {
  return (
    <section id="resources" className="text-white py-20 bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold mb-6 font-heading">
          Developer Resources
        </h2>
        <p className="text-lg mb-8 max-w-3xl mx-auto font-body">
          Whether you're a beginner or an experienced developer, the following
          resources will help you stay up-to-date with the latest industry
          trends, improve your coding skills, and discover new tools. Dive into
          the world of development with these carefully curated resources.
        </p>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {[
    {
      title: "MDN Web Docs",
      desc: "Comprehensive documentation for web development, covering HTML, CSS, JavaScript, and more.",
      link: "https://developer.mozilla.org/en-US/"
    },
    {
      title: "freeCodeCamp",
      desc: "Interactive coding lessons and challenges that allow you to learn at your own pace.",
      link: "https://www.freecodecamp.org/"
    },
    {
      title: "GitHub",
      desc: "Explore and contribute to open-source projects and collaborate with other developers.",
      link: "https://github.com"
    },
    {
      title: "CSS-Tricks",
      desc: "A helpful guide for front-end developers, with tips on CSS, JavaScript, and more.",
      link: "https://css-tricks.com/"
    },
    {
      title: "Dev.to",
      desc: "A community where developers share articles, tutorials, and more on all things tech.",
      link: "https://dev.to"
    },
    {
      title: "Stack Overflow",
      desc: "The most popular Q&A site for programming questions, where developers can ask and answer questions.",
      link: "https://stackoverflow.com"
    }
  ].map((resource, index) => (
    <motion.div
      key={index}
      className="p-6 bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 border-2"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
    >
      {/* Title Section */}
      <h3 className="text-center text-lg font-bold mb-4 font-heading">{resource.title}</h3>
      
      {/* Description Section */}
      <p className="text-xs text-center font-body tracking-widest uppercase mb-4">{resource.desc}</p>
      
      {/* Link Section */}
      <a
        href={resource.link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline text-center block"
      >
        Visit Site
      </a>
    </motion.div>
  ))}
</div>

      </div>
    </section>
  );
};

export default Resources;
