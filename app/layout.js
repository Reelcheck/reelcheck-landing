export const metadata = {
  title: "ReelCheck — L'avis vidéo qui prouve tout",
  description: "Vos clients filment leur séjour. ReelCheck diffuse leurs vidéos sur votre site et les réseaux sociaux.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
