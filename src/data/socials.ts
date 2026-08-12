export type SocialIcon = "email" | "github" | "linkedin";

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
  external: boolean;
}

export const socialLinks: SocialLink[] = [
  {
    label: "Email",
    href: "mailto:paul.thumfart@gmail.com",
    icon: "email",
    external: false,
  },
  {
    label: "GitHub",
    href: "https://github.com/Dumdart",
    icon: "github",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/paul-thumfart-74b7543b8",
    icon: "linkedin",
    external: true,
  },
];
