export const Contact: React.FC<{ contact: string }> = (p) => {
  return (
    <a
      className="link link-accent block"
      href={(p.contact.includes("@") ? "mailto:" : "") + p.contact}
    >
      {p.contact}
    </a>
  );
};
