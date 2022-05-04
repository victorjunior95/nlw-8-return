import { useState } from "react";

import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
  screenshot: string | null;
  onScreenshotTook: (screenshot: string | null) => void;
}

export function ScreenshotButton({ screenshot, onScreenshotTook }: ScreenshotButtonProps) {
  // estado para gerenciar o 'loading'
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false);

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true);

    // a exclamação "!", no final, indica que sempre haverá uma tag 'html' (descartando a possibilidade de null)
    const canvas = await html2canvas(document.querySelector('html')!);
    // transforma o texto em imagem/foto/print
    const base64Image = canvas.toDataURL('image/png');

    onScreenshotTook(base64Image);

    setIsTakingScreenshot(false);
  }

  // verificar se já tenho uma foto/print
  if (screenshot) {
    return (
      <button
        type="button"
        className="p-1 w-10 h-10 rounded-md border transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        onClick={() => onScreenshotTook(null)}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'right bottom', // nesse caso por causa da posição do conteúdo
          backgroundSize: 180,
        }}
      >
        <Trash weight="fill" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      // Add função disable
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
    >
      { isTakingScreenshot ? <Loading /> : <Camera className="w-6 h-6" /> }
    </button>
  );
}