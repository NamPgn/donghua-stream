import Link from 'next/link';

const footerLinks = [
  {
    title: 'Navigation',
    links: [
      { name: 'Home', href: '/' },
      { name: 'Popular', href: '/popular' },
      { name: 'New', href: '/new' },
      { name: 'Categories', href: '/categories' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'DMCA', href: '/dmca' },
    ],
  },
  {
    title: 'Social',
    links: [
      { name: 'Twitter', href: 'https://twitter.com' },
      { name: 'Discord', href: 'https://discord.com' },
      { name: 'GitHub', href: 'https://github.com' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} HH3D. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 