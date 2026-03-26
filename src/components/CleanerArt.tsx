"use client";

import Lottie from "lottie-react";

import animationData from "../../public/cleaner-art.json";

const BRAND_PINK = [0.925490196078, 0.113725490196, 0.552941176471, 1];
const LOTTIE_BLUE = [0.250980407, 0.43137255311, 1, 1];

function isMatchingColor(value: unknown) {
  return (
    Array.isArray(value) &&
    value.length === 4 &&
    value.every(
      (entry, index) =>
        typeof entry === "number" &&
        Math.abs(entry - LOTTIE_BLUE[index]) < 0.000001,
    )
  );
}

function replaceAccentColor(value: unknown): unknown {
  if (Array.isArray(value)) {
    if (isMatchingColor(value)) {
      return [...BRAND_PINK];
    }

    return value.map(replaceAccentColor);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        key,
        replaceAccentColor(entry),
      ]),
    );
  }

  return value;
}

const brandedAnimationData = replaceAccentColor(animationData);

export function CleanerArt() {
  return (
    <Lottie
      animationData={brandedAnimationData}
      loop
      className="mx-auto w-full "
    />
  );
}
