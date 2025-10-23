import { Instagram, Youtube, Facebook } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-6">
          <a
            href="https://www.instagram.com/sv.astroforening/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gold transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61582565966726"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gold transition-colors"
            aria-label="Facebook"
          >
            <Facebook size={24} />
          </a>
          <a
            href="https://www.tiktok.com/@sv.astroforening"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gold transition-colors"
            aria-label="TikTok"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-white hover:text-gold transition-colors"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </a>
          <a
            href="https://www.youtube.com/@sv.astroforening"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gold transition-colors"
            aria-label="YouTube"
          >
            <Youtube size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
}
