import { Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-4 md:px-8 bg-navy-deep">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div>
            <a href="#home" className="font-display text-xl font-bold tracking-tight flex items-center gap-1.5">
              <span className="text-gradient-primary">RWA</span>
              <span className="text-foreground">Hub</span>
            </a>
            <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
              Making every possible asset available to anyone, anywhere — powered by blockchain technology.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4">Ecosystem</h4>
            <div className="space-y-2">
              {["Insights", "Intelligence", "Integrations", "Investments", "Infrastructure"].map((link) => (
                <a key={link} href="#services" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4">Company</h4>
            <div className="space-y-2">
              {[
                { label: "About", href: "#about" },
                { label: "Team", href: "#team" },
                { label: "Contact", href: "#contact" },
                { label: "Documentation", href: "https://docs.rwa.io" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold text-sm mb-4">Connect</h4>
            <div className="flex gap-3">
              <a
                href="https://www.linkedin.com/company/rwahub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} RWA Hub. All rights reserved.
          </p>
          <p className="text-muted-foreground text-xs">
            Miami, Florida • 11–50 Employees
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
