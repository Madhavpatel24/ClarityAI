export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-background overflow-hidden">
      {/* Soft Top Gradient Fade (blends with page glow) */}
      <div className="absolute inset-x-0 -top-20 h-24 bg-gradient-to-b from-transparent via-primary/5 to-background pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-14">
        {/* ===== MAIN GRID ===== */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-indigo-500 flex items-center justify-center text-white font-bold">
                C
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">
                CLARITY
              </h3>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered compliance intelligence platform designed to help
              RBI-regulated institutions detect policy conflicts, quantify risk,
              and accelerate audit readiness.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/upload" className="hover:text-primary transition-colors">
                  Upload Document
                </a>
              </li>
              <li>
                <a href="/methodology" className="hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="/history" className="hover:text-primary transition-colors">
                  Analysis History
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  API Reference
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ===== Divider Line with Glow ===== */}
        <div className="relative mb-8">
          <div className="h-px bg-border" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent blur-sm" />
        </div>

        {/* ===== Bottom Row ===== */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {currentYear} <span className="font-medium text-foreground">CLARITY</span>. All rights reserved.
          </p>

          <p className="text-xs max-w-xl text-center md:text-right leading-relaxed">
            CLARITY provides AI-assisted compliance insights. Results should be reviewed by qualified
            compliance professionals before regulatory action.
          </p>
        </div>
      </div>
    </footer>
  );
}