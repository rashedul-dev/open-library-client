import { Link } from "react-router-dom";
import { Github, Linkedin, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  return (
    <footer className="mt-10 bg-gradient-to-r from-black via-gray-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Branding */}
          <div>
            <h2 className="text-2xl font-bold">Open Library</h2>
            <p className="mt-2 text-sm text-gray-300">
              Your personal digital library. Borrow, track, and manage your
              books with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-blue-400 transition">
                  All Books
                </Link>
              </li>
              <li>
                <Link
                  to="/create-books"
                  className="hover:text-blue-400 transition"
                >
                  Add Books
                </Link>
              </li>
              <li>
                <Link
                  to="/borrow-summary"
                  className="hover:text-blue-400 transition"
                >
                  Borrow Summary
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Connect</h3>
            <div className="flex space-x-4 mt-2">
              <a
                href="mailto:rashedulislam.edge@gmail.com"
                className="hover:text-blue-400 transition"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/rashedul-dev/"
                target="_blank"
                className="hover:text-blue-400 transition"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/rashedul-dev"
                target="_blank"
                className="hover:text-blue-400 transition"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <Separator className="my-6 bg-white/10" />

        {/* Bottom Section */}
        <div className="text-sm text-gray-400 text-center">
          &copy; {new Date().getFullYear()} Open Library. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
