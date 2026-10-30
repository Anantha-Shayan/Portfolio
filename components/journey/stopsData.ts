// Stop metadata shared by the shell, the rail and the sections.
// `command` is the real tool whose output has the same shape as the section.

export const DOMAIN = "ananthadev.online";

export const STOPS = [
  { id: "dns", name: "dig", plain: "Who is Anantha?" },
  { id: "whois", name: "whois", plain: "About" },
  { id: "systemd", name: "systemctl", plain: "Experience" },
  { id: "nmap", name: "nmap", plain: "Skills" },
  { id: "curl", name: "curl", plain: "Projects" },
  { id: "tls", name: "openssl", plain: "Education" },
  { id: "ping", name: "ping", plain: "Contact" },
] as const;
