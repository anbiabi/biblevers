
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const vibrantGradients = [
  "linear-gradient(to bottom right, #ffcf87, #ff8ba7)",
  "linear-gradient(to bottom right, #fbd07c, #f7f779, #b0f4e6)",
  "linear-gradient(to bottom right, #adffd6, #84ffc9, #c4e0ff)",
  "linear-gradient(to bottom right, #ffccc9, #ffb0cd, #d8bbff)",
  "linear-gradient(to bottom right, #a8ff78, #78ffd6)",
  "linear-gradient(to bottom right, #f0ffe9, #c9f5d9, #fcffbf)",
  "linear-gradient(to bottom right, #fee17c, #ffcbb6, #ffd6de)",
  "linear-gradient(to bottom right, #eaefb1, #e0f9b5, #abede8)",
  "linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%)",
  "linear-gradient(180deg, rgb(254,100,121) 0%, rgb(251,221,186) 100%)",
  "linear-gradient(184.1deg, rgba(249,255,182,1) 44.7%, rgba(226,255,172,1) 67.2%)",
  "linear-gradient(90deg, hsla(139, 70%, 75%, 1) 0%, hsla(63, 90%, 76%, 1) 100%)",
  "linear-gradient(90deg, hsla(46, 73%, 75%, 1) 0%, hsla(176, 73%, 88%, 1) 100%)",
  "linear-gradient(to top, #d299c2 0%, #fef9d7 100%)",
  "linear-gradient(to top, #accbee 0%, #e7f0fd 100%)",
  "linear-gradient(to right, #ee9ca7, #ffdde1)"
]

export const getRandomVibrantGradient = () => {
  return vibrantGradients[Math.floor(Math.random() * vibrantGradients.length)]
}
