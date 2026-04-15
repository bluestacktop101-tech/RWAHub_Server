import { Link } from "@tanstack/react-router";
import { Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy-deep border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="font-display font-bold text-primary-foreground text-sm">R</span>
              </div>
              <span className="font-display font-semibold text-lg text-foreground">
                RWA <span className="text-gradient-primary">Hub</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-md">
              A complete, integrated ecosystem supporting the entire real-world asset lifecycle — from tokenization to trading, with full regulatory compliance.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://www.linkedin.com/company/rwahub" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-primary transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors">About</Link>
              <Link to="/services" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Services</Link>
              <Link to="/assets" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Assets</Link>
              <Link to="/technology" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Technology</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Company</h4>
            <div className="space-y-2">
              <Link to="/team" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Team</Link>
              <Link to="/hiring" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Hiring</Link>
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} RWA Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
