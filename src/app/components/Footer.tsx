import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { AKLogo } from "./AKLogo";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pt-16 pb-10 mt-10 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-10">
          <div className="col-span-2 order-1 md:order-none">
            <Link to="/" className="flex items-center mb-6">
              <AKLogo size={40} />
            </Link>
            <p className="text-white/60 text-lg max-w-sm">
              Computer Science student building performant software and open-source tools.
            </p>
          </div>

          <div className="col-span-1 order-3 md:order-none">
            <h4 className="font-medium text-white mb-6">Navigation</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link to="/projects" className="hover:text-white transition-colors">Work</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">Insights</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div className="col-span-1 order-2 md:order-none">
            <h4 className="font-medium text-white mb-6">Socials</h4>
            <ul className="space-y-4 text-white/60">
              <li>
                <a href="#" className="flex items-center gap-1 hover:text-white transition-colors">
                  Twitter <ArrowUpRight className="size-3" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-1 hover:text-white transition-colors">
                  LinkedIn <ArrowUpRight className="size-3" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-1 hover:text-white transition-colors">
                  GitHub <ArrowUpRight className="size-3" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-1 hover:text-white transition-colors">
                  Dribbble <ArrowUpRight className="size-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-sm text-white/40">
          <p>© {new Date().getFullYear()} Software Engineer. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
