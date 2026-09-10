import IconButton from "@mui/material/IconButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

const navLinks = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 py-10 sm:px-6 md:flex-row md:justify-between lg:px-8">
        <div className="text-center md:text-left">
          <p className="font-mono text-base font-semibold">
            Alok<span className="text-coffee-light">.</span>Pradhan
          </p>
          <p className="mt-1 text-xs text-paper/50">
            © {year} Alok Pradhan. All rights reserved.
          </p>
        </div>

        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-paper/70"
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="transition-colors hover:text-coffee-light"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <IconButton
            component="a"
            href="https://github.com/alokm74"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            size="small"
            sx={{ color: "#F6F7F9", "&:hover": { color: "#A9662B" } }}
          >
            <GitHubIcon fontSize="small" />
          </IconButton>
          <IconButton
            component="a"
            href="https://linkedin.com/in/alok-pradhan-m74"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            size="small"
            sx={{ color: "#F6F7F9", "&:hover": { color: "#A9662B" } }}
          >
            <LinkedInIcon fontSize="small" />
          </IconButton>
          <IconButton
            component="a"
            href="mailto:palok8163@gmail.com"
            aria-label="Send an email"
            size="small"
            sx={{ color: "#F6F7F9", "&:hover": { color: "#A9662B" } }}
          >
            <EmailIcon fontSize="small" />
          </IconButton>
        </div>
      </div>
    </footer>
  );
}
