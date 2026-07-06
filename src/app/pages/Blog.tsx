import { motion } from "motion/react";
import { Link } from "react-router";
import { Clock } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const posts = [
  {
    id: 1,
    title: "Micro-frontends in Enterprise Architecture",
    excerpt: "Exploring the trade-offs, tooling, and team structures required to successfully scale a micro-frontend approach in a large organization.",
    date: "Oct 12, 2023",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1552821773-37cbce3a7965?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwdHlwb2dyYXBoeSUyMGRhcmslMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzgxNTk1Nzg1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    featured: true
  },
  {
    id: 2,
    title: "The Death of Local State",
    excerpt: "Why modern applications are moving towards server-state management tools like React Query, and when you actually still need Redux.",
    date: "Sep 28, 2023",
    readTime: "6 min read",
    featured: false
  },
  {
    id: 3,
    title: "Designing for Engineers",
    excerpt: "How to create internal developer tools that your team actually wants to use. Spoiler: CLI isn't always the answer.",
    date: "Aug 15, 2023",
    readTime: "5 min read",
    featured: false
  },
  {
    id: 4,
    title: "CSS Architecture in 2024",
    excerpt: "A deep dive into utility-first CSS, component libraries, and the future of styling web applications.",
    date: "Jul 02, 2023",
    readTime: "10 min read",
    featured: false
  }
];

export default function Blog() {
  const featured = posts.find(p => p.featured);
  const rest = posts.filter(p => !p.featured);

  return (
    <div className="pt-32 pb-10 text-white/90 relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-10"
        >
          <h1 className="text-5xl md:text-7xl font-display font-medium text-white mb-6 tracking-tight">
            Insights
          </h1>
          <p className="text-xl text-white/50 font-light">
            Thoughts on software engineering, design systems, and building digital products.
          </p>
        </motion.div>

        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10"
          >
            <Link to={`/blog/${featured.id}`} className="group block relative rounded-3xl overflow-hidden bg-white/5 border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                  <div className="flex items-center gap-4 text-sm text-white/40 mb-6">
                    <span>{featured.date}</span>
                    <div className="size-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1"><Clock className="size-3" /> {featured.readTime}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-4 group-hover:text-primary transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-white/60 text-lg mb-8 line-clamp-3">
                    {featured.excerpt}
                  </p>
                  <span className="inline-flex items-center text-white font-medium group-hover:gap-2 transition-all">
                    Read Article &rarr;
                  </span>
                </div>
                <div className="relative h-64 md:h-full order-1 md:order-2 border-b md:border-b-0 md:border-l border-white/10">
                  <ImageWithFallback
                    src={featured.image!}
                    alt={featured.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + (i * 0.1) }}
            >
              <Link to={`/blog/${post.id}`} className="group block h-full p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all">
                <div className="flex items-center gap-4 text-sm text-white/40 mb-4">
                  <span>{post.date}</span>
                  <div className="size-1 rounded-full bg-white/20" />
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-display font-medium text-white mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-white/50 line-clamp-3">
                  {post.excerpt}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
