"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface PhoneInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> {
  value: string;
  onChange: (value: string) => void;
}

export function PhoneInput({
  value,
  onChange,
  className,
  ...props
}: PhoneInputProps) {
  return (
    <div className="flex items-center overflow-hidden rounded-lg border border-neutral-200 bg-white focus-within:border-[#EC1D8D] focus-within:ring-2 focus-within:ring-[#EC1D8D]/15 transition-all">
      {/* Flag + prefix — not editable */}
      <div className="flex shrink-0 select-none items-center gap-1.5 border-r border-neutral-200 bg-neutral-50 px-3 py-2.5 text-sm font-medium text-neutral-600">
        <Image
          src={
            "https://upload.wikimedia.org/wikipedia/en/archive/a/ae/20190917170935%21Flag_of_the_United_Kingdom.svg"
          }
          height={30}
          width={30}
          alt="UK Flag"
          className="rounded-sm"
          unoptimized
        />
        <span>+44</span>
      </div>

      {/* Number input */}
      <input
        type="tel"
        inputMode="numeric"
        placeholder="7911 123456"
        value={value}
        onChange={(e) => {
          // Strip any leading 0 (UK convention when dialling with country code)
          const raw = e.target.value.replace(/[^\d\s]/g, "");
          onChange(raw.startsWith("0") ? raw.slice(1) : raw);
        }}
        className={cn(
          "w-full bg-transparent px-3 py-2.5 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none",
          className,
        )}
        {...props}
      />
    </div>
  );
}
