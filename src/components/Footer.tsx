import React from "react";
import { socialLinks } from "@/lib/data";

function Footer(): JSX.Element {
  return (
    <footer className="bg-darker-bg py-8 border-t border-muted mt-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} Belal Aboseada. All rights reserved.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-accent transition-colors"
                aria-label={link.name}
              >
                <link.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default React.memo(Footer);
