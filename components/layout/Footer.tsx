import Link from 'next/link';
import { Facebook, Send, Music, MessageCircle } from 'lucide-react';

export const socialLinks = {
  facebook: 'https://www.facebook.com/phanhhh3d',
  tiktok: 'https://www.tiktok.com/@tieu_loli',
  telegram: 'https://t.me/myang_03',
  zalo: 'https://zalo.me/g/kxbtdy548'
} as const;

const socialIcons = {
  facebook: Facebook,
  tiktok: Music,
  telegram: Send,
  zalo: MessageCircle
} as const;


export default function Footer() {
  return (
    <footer className="py-8">
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <div className="flex items-center justify-between gap-4 px-10">
            <p>© {new Date().getFullYear()} HH3D. All rights reserved.</p>
            <div className="flex items-center gap-3">
              {Object.entries(socialLinks).map(([key, url]) => {
                const Icon = socialIcons[key as keyof typeof socialIcons];
                return (
                  <Link 
                    key={key}
                    href={url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-primary"
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
    </footer>
  );
} 