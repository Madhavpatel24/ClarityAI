'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const STEPS = [
  'Extracting Clauses',
  'Identifying Regulations',
  'Analyzing Conflicts',
  'Evaluating Penalties',
  'Generating Narrative',
  'Compiling Report',
];

export function LoadingSteps() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Analyzing Document</h2>
        <p className="text-muted-foreground">This may take a moment...</p>
      </div>

      <div className="space-y-4 max-w-md mx-auto">
        {STEPS.map((step, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="relative w-8 h-8">
              {index < currentStep ? (
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              ) : index === currentStep ? (
                <div className="w-8 h-8 rounded-full border-2 border-primary border-r-transparent animate-spin" />
              ) : (
                <div className="w-8 h-8 rounded-full border-2 border-border" />
              )}
            </div>
            <span
              className={`text-sm font-medium ${
                index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {step}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-8 flex justify-center">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
      </div>
    </div>
  );
}
