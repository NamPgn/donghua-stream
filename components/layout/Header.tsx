'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState, useCallback } from 'react';
import debounce from 'lodash/debounce';
import MVLink from '../Link';
import Image from 'next/image';
import { NAVIGATION } from '@/constant';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { useWatchlistStore } from '@/store/watchlist';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { animes } = useWatchlistStore();

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim()) {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`);
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    }, 500),
    []
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    debouncedSearch(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim()) {
      debouncedSearch(value);
    }
  };

  return (
    <header className="border-b sticky top-0 bg-background z-50">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center gap-4 md:gap-8">
            <MVLink href="/" className="text-md md:text-1xl font-bold">
              <Image src={'/images/b32705f7-9444-41f9-8457-d1cc7773a259-min.png'} alt='logo' width={60} height={60} />
            </MVLink>
            <nav className="hidden md:flex gap-6">
              {NAVIGATION.map((item) => (
                <MVLink
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                </MVLink>
              ))}
            </nav>
          </div>
          
          {/* Desktop Search and Profile */}
          <div className="hidden md:flex items-center gap-4">
        
            <Tooltip>
              <TooltipTrigger asChild>
                <MVLink href="/profile" className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 w-9 relative">
                  <Heart className="h-5 w-5" />
                  {animes.length > 0 && (
                    <Badge variant="secondary" className="absolute -top-1 -right-2 h-5 min-w-[20px] flex items-center justify-center p-0 text-xs">
                      {animes.length}
                    </Badge>
                  )}
                </MVLink>
              </TooltipTrigger>
              <TooltipContent>
                <p>Phim đã lưu</p>
              </TooltipContent>
            </Tooltip>

            <form onSubmit={handleSearch} className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm phim..."
                className="pl-8"
                value={searchQuery}
                onChange={handleInputChange}
              />
            </form>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="md:hidden"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm phim..."
                className="pl-8"
                value={searchQuery}
                onChange={handleInputChange}
              />
            </form>
          </div>
        )}

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t">
            <nav className="flex flex-col py-4">
              {NAVIGATION.map((item) => (
                <MVLink
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium transition-colors hover:text-primary ${
                    pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </MVLink>
              ))}
              <MVLink
                href="/profile"
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart className="h-4 w-4" />
                <span className="flex-1">Phim đã lưu</span>
                {animes.length > 0 && (
                  <Badge variant="secondary" className="h-5 min-w-[20px] flex items-center justify-center p-0 text-xs">
                    {animes.length}
                  </Badge>
                )}
              </MVLink>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
} 