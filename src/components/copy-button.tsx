'use client';

import { Check, Copy } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

type Props = {
  text: string;
  label: string;
  copiedLabel?: string;
};

export function CopyButton({ text, label, copiedLabel = 'Скопировано' }: Props) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={copy} aria-live="polite">
      {copied ? <Check className="text-brand-teal" /> : <Copy />}
      {copied ? copiedLabel : label}
    </Button>
  );
}
