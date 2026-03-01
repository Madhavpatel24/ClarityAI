import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Heart, Target, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-foreground mb-4">About CLARITY</h1>
            <p className="text-xl text-muted-foreground">
              Empowering financial institutions with intelligent regulatory compliance analysis
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Our Mission</h2>
            <Card className="p-8 border border-border bg-background">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                CLARITY was created to solve a critical challenge faced by banks and financial
                institutions regulated by the Reserve Bank of India: the complexity of managing
                compliance with multiple, overlapping regulatory frameworks.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that compliance analysis should be fast, accurate, and accessible. Our
                mission is to democratize regulatory intelligence by providing institutions of all
                sizes with enterprise-grade compliance analysis powered by advanced artificial
                intelligence.
              </p>
            </Card>
          </div>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Accuracy */}
              <Card className="p-6 border border-border bg-background">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Accuracy</h3>
                <p className="text-sm text-muted-foreground">
                  We prioritize precision in every analysis. Our algorithms are continuously refined
                  against known regulatory cases and expert validation.
                </p>
              </Card>

              {/* Innovation */}
              <Card className="p-6 border border-border bg-background">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  We leverage cutting-edge AI and machine learning to solve regulatory challenges
                  in ways that were previously impossible.
                </p>
              </Card>

              {/* Integrity */}
              <Card className="p-6 border border-border bg-background">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Integrity</h3>
                <p className="text-sm text-muted-foreground">
                  We're committed to transparency, responsible AI practices, and ethical deployment
                  of our technology.
                </p>
              </Card>
            </div>
          </div>

          {/* How We're Different */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Why CLARITY</h2>
            <div className="space-y-4">
              <Card className="p-6 border border-border bg-background">
                <h3 className="font-semibold text-foreground mb-2">Purpose-Built for RBI Compliance</h3>
                <p className="text-muted-foreground">
                  Unlike generic compliance tools, CLARITY is specifically designed for the Indian
                  regulatory landscape and RBI-regulated institutions.
                </p>
              </Card>

              <Card className="p-6 border border-border bg-background">
                <h3 className="font-semibold text-foreground mb-2">Advanced AI Technology</h3>
                <p className="text-muted-foreground">
                  We use state-of-the-art natural language processing and machine learning to understand
                  regulatory documents with contextual intelligence.
                </p>
              </Card>

              <Card className="p-6 border border-border bg-background">
                <h3 className="font-semibold text-foreground mb-2">Speed & Efficiency</h3>
                <p className="text-muted-foreground">
                  Analyze complex policy documents in minutes instead of weeks, enabling faster
                  compliance decisions and faster time-to-market.
                </p>
              </Card>

              <Card className="p-6 border border-border bg-background">
                <h3 className="font-semibold text-foreground mb-2">Comprehensive Reporting</h3>
                <p className="text-muted-foreground">
                  Get detailed conflict analysis, penalty assessments, and actionable recommendations
                  all in a single report.
                </p>
              </Card>

              <Card className="p-6 border border-border bg-background">
                <h3 className="font-semibold text-foreground mb-2">Expert-Validated</h3>
                <p className="text-muted-foreground">
                  Our analysis models are validated against actual compliance cases and reviewed by
                  regulatory experts.
                </p>
              </Card>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-8">Important Information</h2>
            <Card className="p-8 border border-border bg-background">
              <h3 className="font-semibold text-foreground mb-4">Limitations & Disclaimers</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span>
                    CLARITY is a decision support tool, not a substitute for professional legal or
                    compliance advice
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span>
                    All analysis results should be reviewed by qualified professionals before
                    implementation
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span>
                    We are not liable for incomplete, inaccurate, or misapplied analyses or
                    recommendations
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span>
                    Regulatory landscapes are constantly evolving; always verify against current
                    guidelines
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold flex-shrink-0">•</span>
                  <span>
                    Users assume all responsibility for compliance decisions made based on this tool
                  </span>
                </li>
              </ul>
            </Card>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <Card className="p-8 border border-border bg-background">
              <h2 className="text-2xl font-bold text-foreground mb-2">Get In Touch</h2>
              <p className="text-muted-foreground mb-6">
                Have questions or feedback? We'd love to hear from you.
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Email:{' '}
                  <a href="mailto:info@clarity.ai" className="text-primary hover:underline">
                    info@clarity.ai
                  </a>
                </p>
                <p>
                  Website:{' '}
                  <a href="#" className="text-primary hover:underline">
                    www.clarity.ai
                  </a>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
