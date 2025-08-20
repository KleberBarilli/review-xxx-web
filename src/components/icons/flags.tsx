import * as React from "react";

type Props = React.SVGProps<SVGSVGElement>;

export const FlagUS: React.FC<Props> = (props) => (
  <svg viewBox="0 0 36 24" aria-hidden {...props}>
    <rect width="36" height="24" fill="#B22234" />
    <g fill="#fff">
      <rect y="2" width="36" height="2" />
      <rect y="6" width="36" height="2" />
      <rect y="10" width="36" height="2" />
      <rect y="14" width="36" height="2" />
      <rect y="18" width="36" height="2" />
    </g>
    <rect width="14" height="10" fill="#3C3B6E" />
  </svg>
);

export const FlagBR: React.FC<Props> = (props) => (
  <svg
    viewBox="0 0 40 28" // 10:7 (mais próximo do oficial)
    aria-hidden
    shapeRendering="geometricPrecision"
    {...props}
  >
    {/* campo verde */}
    <rect width="40" height="28" fill="#009B3A" />

    {/* losango amarelo */}
    <polygon points="20,3 36.5,14 20,25 3.5,14" fill="#FFDF00" />

    {/* recorte do círculo azul */}
    <defs>
      <clipPath id="br-c">
        <circle cx="20" cy="14" r="7" />
      </clipPath>
    </defs>

    {/* círculo + faixa branca curvada (recortada no círculo) */}
    <g clipPath="url(#br-c)">
      <circle cx="20" cy="14" r="7" fill="#002776" />

      {/* faixa (curva) — rotacionada ~15° como na bandeira */}
      <path
        d="M6 18 C 14 9.5, 26 9.5, 34 18"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.6"
        strokeLinecap="round"
        transform="rotate(-15 20 14)"
      />

      {/* estrelas simplificadas (pontos) — visíveis só em tamanhos >14px */}
      <g fill="#FFFFFF" opacity=".95">
        <circle cx="24.6" cy="17.7" r=".6" />
        <circle cx="22.4" cy="16.1" r=".5" />
        <circle cx="21.0" cy="18.5" r=".45" />
        <circle cx="18.6" cy="15.4" r=".45" />
        <circle cx="16.3" cy="17.8" r=".45" />
      </g>
    </g>
  </svg>
);
