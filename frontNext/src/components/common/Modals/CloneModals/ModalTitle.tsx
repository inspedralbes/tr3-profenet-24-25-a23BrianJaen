"use client"

import { Courses } from "@/src/types/types";

interface ModalTitleProps {
  normalText: string;
  highlightedText?: string;
  additionalText?: string;
  classes?: Courses[];
  selectedClasses?: Courses[];
}

export default function ModalTitle({ normalText, highlightedText, additionalText, classes, selectedClasses }: ModalTitleProps) {
  return (
    <h2 className="text-primary text-center text-xl font-bold mb-1.5">
      {normalText} <strong className="font-bold">{highlightedText}</strong> {additionalText} {classes && selectedClasses && `(${selectedClasses.length}/${classes.length})`}
    </h2>
  );
}
