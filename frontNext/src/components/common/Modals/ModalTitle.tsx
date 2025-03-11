"use client"

interface ModalTitleProps {
  normalText: string;
  highlightedText?: string;
  additionalText?: string;
}

export default function ModalTitle({ normalText, highlightedText, additionalText }: ModalTitleProps) {
  return (
    <h2 className="text-primary text-center text-xl font-bold mb-1.5">
      {normalText} <strong className="font-bold">{highlightedText}</strong> {additionalText}
    </h2>
  );
}
