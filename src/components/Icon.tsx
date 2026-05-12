import type { ReactNode, SVGProps } from "react";

type IconName =
  | "home"
  | "closet"
  | "play"
  | "shop"
  | "pass"
  | "friends"
  | "profile"
  | "settings"
  | "bell"
  | "chevron"
  | "back"
  | "star"
  | "heart"
  | "camera"
  | "pose"
  | "sparkle"
  | "crown"
  | "coin"
  | "gem"
  | "check"
  | "x"
  | "fire"
  | "trophy"
  | "timer"
  | "music"
  | "eye";

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "children"> {
  name: IconName;
  size?: number;
}

const PATHS: Record<IconName, ReactNode> = {
  home: <path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2z" />,
  closet: <path d="M3 4h18v6H3zm0 8h18v8H3zm5-8v6m8-6v6" />,
  play: <path d="M5 4l14 8-14 8z" />,
  shop: (
    <path d="M3 7l1.5-3h15L21 7M3 7v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7M3 7h18M9 11a3 3 0 0 0 6 0" />
  ),
  pass: <path d="M4 5h16v14H4zm4 0v14m8-14v14M4 12h16" />,
  friends: (
    <path d="M16 11a4 4 0 1 0-4-4m0 0a4 4 0 0 0-4 4 4 4 0 0 0 4 4m4-4a4 4 0 0 1-4 4m-7 6c0-3 2-5 5-5m6 0c3 0 5 2 5 5" />
  ),
  profile: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm-7 9c0-4 3-7 7-7s7 3 7 7" />,
  settings: (
    <path d="M12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm9 3a9 9 0 0 0-.2-2l2-1.5-2-3.5-2.4 1a9 9 0 0 0-3.4-2L14.5 1h-5L9 3a9 9 0 0 0-3.4 2L3.2 4l-2 3.5L3.2 9a9 9 0 0 0 0 6l-2 1.5 2 3.5 2.4-1a9 9 0 0 0 3.4 2L9 23h5l.6-2a9 9 0 0 0 3.4-2l2.4 1 2-3.5L20.8 15a9 9 0 0 0 .2-3z" />
  ),
  bell: <path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9zm3 13a3 3 0 0 0 6 0" />,
  chevron: <path d="M9 6l6 6-6 6" />,
  back: <path d="M15 6l-6 6 6 6" />,
  star: <path d="M12 3l3 6 6 1-4.5 4 1 6.5L12 17l-5.5 3.5L7.5 14 3 10l6-1z" />,
  heart: <path d="M12 21s-7-4-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 5-9 9-9 9z" />,
  camera: <path d="M3 7h4l2-3h6l2 3h4v13H3zm9 10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />,
  pose: (
    <path d="M12 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM8 9l4 1 4-1m-4 1v6m-3-4l3 2 3-2m-6 9l3-5m6 5l-3-5" />
  ),
  sparkle: (
    <path d="M12 2l1.5 6 6 1.5-6 1.5L12 17l-1.5-6-6-1.5 6-1.5zM19 14l.7 2.3 2.3.7-2.3.7L19 20l-.7-2.3L16 17l2.3-.7z" />
  ),
  crown: <path d="M3 18h18l-2-10-4 4-4-7-4 7-4-4z" />,
  coin: (
    <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zm0 4v10m-3-7h5a1.5 1.5 0 1 1 0 3h-4a1.5 1.5 0 1 0 0 3h5" />
  ),
  gem: <path d="M6 9l6-6 6 6-6 12zm0 0h12M9 9l3 12 3-12" />,
  check: <path d="M5 12l5 5 9-11" />,
  x: <path d="M6 6l12 12M18 6L6 18" />,
  fire: <path d="M12 2c1 4 5 5 5 10a5 5 0 1 1-10 0c0-3 2-4 2-7 2 1 3 0 3-3z" />,
  trophy: (
    <path d="M8 4h8v4a4 4 0 0 1-8 0zM5 5H2v3a3 3 0 0 0 3 3m14-6h3v3a3 3 0 0 1-3 3m-9 1v4m-3 4h6" />
  ),
  timer: <path d="M12 7v5l3 2m-3 7a8 8 0 1 1 0-16 8 8 0 0 1 0 16zM9 2h6" />,
  music: (
    <path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-3-3 3 3 0 0 1 3 3zm12-2a3 3 0 1 1-3-3 3 3 0 0 1 3 3z" />
  ),
  eye: <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7zm11 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />,
};

export function Icon({ name, size = 18, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...rest}
    >
      {PATHS[name] ?? null}
    </svg>
  );
}
