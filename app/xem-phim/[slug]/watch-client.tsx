"use client";

import type React from "react";
import { useEffect, useState, useRef } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  Star,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoPlayer } from "@/components/video-player";
import { Wrapper } from "@/components/wrapper";
import MVLink from "@/components/Link";
import { ANIME_PATHS } from "@/constant/path.constant";
import { SOCIAL_LINKS } from "@/constant/social.constant";
import MVImage from "@/components/ui/image";
import { useHistoryStore } from "@/store/history";

interface Product {
  _id: string;
  seri: string;
  isApproved: boolean;
  view: number;
  slug: string;
}

interface Comment {
  user: string;
  content: string;
  rating: number;
  date: string;
}

export interface CombiningEpisode {
  _id: string;
  name: string;
  slug: string;
  episodesName: string;
  link1: string;
}
interface Category {
  _id: string;
  name: string;
  slug: string;
  des: string;
  type: string;
  isMovie: string;
  year: string;
  time: string;
  lang: string;
  quality: string;
  thumbnail?: string;
  linkImg?: string;
  products: Product[];
  combiningEpisodes: CombiningEpisode[];
}



interface Anime {
  name: string;
  slug: string;
  seri: string;
  isApproved: boolean;
  view: number;
  category: Category;
  copyright: string;
  comment: Comment[];
  zaloGroupLink?: string;
  createdAt: string;
  prevEpisode: string;
  nextEpisode: string;
}

// Component Zalo Button đẹp
const ZaloButton = ({
  href,
  variant = "default",
  size = "default",
  showIcon = true,
  children
}: {
  href: string;
  variant?: "default" | "outline" | "ghost" | "floating";
  size?: "sm" | "default" | "lg";
  showIcon?: boolean;
  children?: React.ReactNode;
}) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]";

  const variants = {
    default: "  ",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    ghost: "text-blue-600 hover:bg-blue-50",
    floating: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl fixed bottom-6 right-6 z-50 rounded-full animate-pulse hover:animate-none"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    default: "px-4 py-2",
    lg: "px-6 py-3 text-lg"
  };

  const className = `${baseClasses} ${variants[variant]} ${sizes[size]}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {showIcon && (
        <MVImage src="/7044033_zalo_icon.svg" width={80} height={80} alt="Zalo" className="w-5 h-5" />
      )}
      {children || "Tham gia nhóm Zalo"}
      <ExternalLink className="w-4 h-4 opacity-70" />
    </a>
  );
};


export function WatchClient({ anime }: { anime: Anime }) {
  const [comment, setComment] = useState("");
  const addToHistory = useHistoryStore((state) => state.addToHistory);
  const desktopEpisodeListRef = useRef<HTMLDivElement>(null);
  const mobileEpisodeListRef = useRef<HTMLDivElement>(null);
  const currentEpisodeRef = useRef<HTMLDivElement>(null);
  const currentMobileEpisodeRef = useRef<HTMLDivElement>(null);
  const [combiningEpisodes, setCombiningEpisodes] = useState<CombiningEpisode | null>(null);
  // Thêm useEffect để cập nhật lịch sử xem
  useEffect(() => {
    addToHistory({
      id: anime.category._id,
      name: anime.name,
      slug: anime.slug,
      thumbnail: anime.category.linkImg || '',
      currentEpisode: anime.seri,
      lastWatched: Date.now(),
    });
  }, [anime, addToHistory]);

  // Thêm useEffect để scroll đến tập đang xem
  useEffect(() => {
    // Scroll cho desktop view
    if (currentEpisodeRef.current && desktopEpisodeListRef.current) {
      const container = desktopEpisodeListRef.current;
      const element = currentEpisodeRef.current;

      const elementTop = element.offsetTop;
      const containerTop = container.offsetTop;
      const scrollPosition = elementTop - containerTop - (container.clientHeight / 2) + (element.clientHeight / 2);

      container.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }

    // Scroll cho mobile view
    if (currentMobileEpisodeRef.current && mobileEpisodeListRef.current) {
      const container = mobileEpisodeListRef.current;
      const element = currentMobileEpisodeRef.current;

      const elementTop = element.offsetTop;
      const containerTop = container.offsetTop;
      const scrollPosition = elementTop - containerTop - (container.clientHeight / 2) + (element.clientHeight / 2);

      container.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }


  }, [anime.seri]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    setComment("");
  };

  const currentEpisode = anime.category.products[0];

  const zaloLink = anime.zaloGroupLink || SOCIAL_LINKS.ZALO;
  return (
    <div className="min-h-screen bg-background">
      <Wrapper>
        <div className="flex items-center gap-2 mb-4">
          <MVLink href={`${ANIME_PATHS.BASE}/${anime.category.slug}`} >
            <Button variant="ghost" size="sm" className="gap-1 cursor-pointer">
              <ArrowLeft className="h-4 w-4" />
              Trở về Chi tiết
            </Button>
          </MVLink>
        </div>

        <div className="container mx-auto py-6 space-y-6 md:space-y-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
            <div className="w-full lg:w-3/4">
              <div className="rounded-lg overflow-hidden">
                <VideoPlayer episode={currentEpisode} anime={anime} combiningEpisodes={combiningEpisodes} />

                <div className="block md:hidden mt-4 rounded-lg p-4">
                  <h2 className="text-lg font-semibold mb-3 border-b pb-2">
                    Danh sách tập
                  </h2>
                  <div className="flex gap-2 mb-3">
                    {anime.prevEpisode && (
                      <Button variant="outline" size="sm" asChild>
                        <MVLink
                          href={`${ANIME_PATHS.WATCH}/${anime.prevEpisode}`}
                          className="flex items-center gap-1"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Tập trước
                        </MVLink>
                      </Button>
                    )}
                    {anime.nextEpisode && (
                      <Button variant="outline" size="sm" asChild>
                        <MVLink
                          href={`${ANIME_PATHS.WATCH}/${anime.nextEpisode}`}
                          className="flex items-center gap-1"
                        >
                          Tập sau
                          <ChevronRight className="h-4 w-4" />
                        </MVLink>
                      </Button>
                    )}
                  </div>

                  <Tabs defaultValue="list" className="w-full">
                    {anime.category.combiningEpisodes?.length > 0 && (
                      <TabsList className="w-full mb-4">
                        <TabsTrigger value="list" className="flex-1">Danh sách tập</TabsTrigger>
                        <TabsTrigger value="grouped" className="flex-1">Tập đã gộp</TabsTrigger>
                      </TabsList>
                    )}

                    <TabsContent value="list" className="mt-0">
                      <div className="h-[200px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground/30 hover:scrollbar-thumb-muted-foreground/50" ref={mobileEpisodeListRef}>
                        <div className="space-y-2">
                          {anime.category.products.map(
                            (product: Product, index) => (
                              <div
                                key={index}
                                ref={Number(product.seri) === Number(anime.seri) ? currentMobileEpisodeRef : null}
                                className="flex items-center justify-between p-2 rounded-lg border hover:bg-muted/50 transition-colors"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                                    <h3 className="font-medium text-sm">
                                      {anime.category.isMovie !== "drama" ? "Full" : `Tập ${product.seri}`}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                      Đã phát hành
                                    </p>
                                  </div>
                                </div>
                                {anime.category.isMovie !== "drama" ? (
                                  <Button
                                    size="sm"
                                    variant={
                                      Number(product.seri) === Number(anime.seri)
                                        ? "default"
                                        : "outline"
                                    }
                                    asChild
                                    disabled={!product.isApproved}
                                  >
                                    <MVLink
                                      href={`${ANIME_PATHS.WATCH}/${anime.category.slug}`}
                                    >
                                      {Number(product.seri) === Number(anime.seri) ? 'Đang xem' : 'Xem'}
                                    </MVLink>
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    asChild
                                    variant={
                                      Number(product.seri) === Number(anime.seri)
                                        ? "default"
                                        : "outline"
                                    }
                                    disabled={!product.isApproved}
                                  >
                                    <MVLink
                                      href={`${ANIME_PATHS.WATCH}/${product.slug}`}
                                    >
                                      {Number(product.seri) === Number(anime.seri) ? 'Đang xem' : 'Xem'}
                                    </MVLink>
                                  </Button>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </TabsContent>

                    {anime.category.combiningEpisodes?.length > 0 && (
                      <TabsContent value="grouped" className="mt-0">
                        <div className="h-[200px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground/30 hover:scrollbar-thumb-muted-foreground/50">
                          <div className="space-y-2">
                            {anime.category.combiningEpisodes.map((product: CombiningEpisode, index) => {
                              return (
                                <div key={index} className="flex items-center justify-between p-2 rounded-lg border hover:bg-muted/50 transition-colors">
                                  <div className="flex items-center gap-2">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                                      <h3 className="font-medium text-sm">
                                        Tập {product.episodesName}
                                      </h3>
                                      <p className="text-xs text-muted-foreground">
                                        Đã phát hành
                                      </p>
                                    </div>
                                  </div>
                                  <Button
                                    className="cursor-pointer"
                                    variant={combiningEpisodes?.episodesName === product.episodesName ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setCombiningEpisodes(product)}
                                  >
                                    <div>{combiningEpisodes?.episodesName === product.episodesName ? "Đang xem" : "Xem"}</div>
                                  </Button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </TabsContent>
                    )}
                  </Tabs>
                </div>
              </div>
            </div>

            <div className="hidden md:block w-full lg:w-1/4">
              <div className="bg-card rounded-lg shadow-sm p-4">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold border-b pb-2">
                    Danh sách tập
                  </h2>
                  <div className="flex gap-2 mt-4">
                    {anime.prevEpisode && (
                      <Button variant="outline" size="sm" asChild>
                        <MVLink
                          href={`${ANIME_PATHS.WATCH}/${anime.prevEpisode}`}
                          className="flex items-center gap-1"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Tập trước
                        </MVLink>
                      </Button>
                    )}
                    {anime.nextEpisode && (
                      <Button variant="outline" size="sm" asChild>
                        <MVLink
                          href={`${ANIME_PATHS.WATCH}/${anime.nextEpisode}`}
                          className="flex items-center gap-1"
                        >
                          Tập sau
                          <ChevronRight className="h-4 w-4" />
                        </MVLink>
                      </Button>
                    )}
                  </div>
                </div>

                <Tabs defaultValue="list" className="w-full">
                  {anime.category.combiningEpisodes?.length > 0 && (
                    <TabsList className="w-full mb-4">
                      <TabsTrigger value="list" className="flex-1">Danh sách tập</TabsTrigger>
                      <TabsTrigger value="grouped" className="flex-1">Tập đã gộp</TabsTrigger>
                    </TabsList>
                  )}

                  <TabsContent value="list" className="mt-0">
                    <div className="h-[500px] overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground/30 hover:scrollbar-thumb-muted-foreground/50" ref={desktopEpisodeListRef}>
                      <div className="space-y-4">
                        <div className="grid gap-3">
                          {anime.category.products.map(
                            (product: Product, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                                ref={Number(product.seri) === Number(anime.seri) ? currentEpisodeRef : null}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-medium">
                                    {anime.category.isMovie === "drama" ? product.seri : 'Full'}
                                  </div>
                                  <div>
                                    {anime.category.isMovie !== "drama" ? (
                                      <h3 className="font-medium">Full</h3>
                                    ) : (
                                      <h3 className="font-medium">
                                        Tập {product.seri}
                                      </h3>
                                    )}
                                    <p className="text-sm text-muted-foreground">
                                      Đã phát hành
                                    </p>
                                  </div>
                                </div>
                                {anime.category.isMovie !== "drama" ? (
                                  <Button
                                    size="sm"
                                    variant={
                                      Number(product.seri) === Number(anime.seri)
                                        ? "default"
                                        : "outline"
                                    }
                                    asChild
                                    disabled={!product.isApproved}
                                  >
                                    <MVLink
                                      href={`${ANIME_PATHS.WATCH}/${anime.category.slug}`}
                                    >
                                      {Number(product.seri) === Number(anime.seri) ? 'Đang xem' : 'Xem'}
                                    </MVLink>
                                  </Button>
                                ) : (
                                  <Button
                                    size="sm"
                                    asChild
                                    variant={
                                      Number(product.seri) === Number(anime.seri)
                                        ? "default"
                                        : "outline"
                                    }
                                    disabled={!product.isApproved}
                                  >
                                    <MVLink
                                      href={`${ANIME_PATHS.WATCH}/${product.slug}`}
                                    >
                                      {Number(product.seri) === Number(anime.seri) ? 'Đang xem' : 'Xem'}
                                    </MVLink>
                                  </Button>
                                )}
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {anime.category.combiningEpisodes?.length > 0 && (
                    <TabsContent value="grouped" className="mt-0">
                      <div className="h-[500px] overflow-y-auto pr-2 space-y-2 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-muted-foreground/30 hover:scrollbar-thumb-muted-foreground/50">
                        <div className="space-y-4">
                          <div className="grid gap-3">
                            {anime.category.combiningEpisodes.map((product: CombiningEpisode, index) => {
                              return (
                                <div key={index} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                                  <div className="flex items-center gap-3">
                                    <div>
                                      <h3 className="font-medium">
                                        Tập {product.episodesName}
                                      </h3>
                                      <p className="text-sm text-muted-foreground">
                                        Đã phát hành
                                      </p>
                                    </div>
                                  </div>
                                  <Button
                                    className="cursor-pointer"
                                    variant={combiningEpisodes?.episodesName === product.episodesName ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setCombiningEpisodes(product)}
                                  >
                                    <div>{combiningEpisodes?.episodesName === product.episodesName ? "Đang xem" : "Xem"}</div>
                                  </Button>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  )}
                </Tabs>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">
              {anime.category?.isMovie === 'drama' ? anime.name + " - Tập " + anime.seri : anime.name}
            </h1>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
              {anime.category?.isMovie === 'drama' ? "Tập " + anime.seri : ''}
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Đăng tải: {new Date(anime.createdAt).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{anime.category.time}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
          <div className="space-y-6">
            <div className="p-4 rounded-lg border">
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="secondary">{anime.category.type}</Badge>
                <Badge variant="secondary">{anime.category.isMovie}</Badge>
                <Badge
                  variant="outline"
                  className="text-yellow-600 bg-yellow-50"
                >
                  {anime.copyright}
                </Badge>
              </div>
              <p className="mb-4">{anime.category.des}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div>Năm: {anime.category.year}</div>
                <div>Thời lượng: {anime.category.time}</div>
                <div>Ngôn ngữ: {anime.category.lang}</div>
                <div>Chất lượng: {anime.category.quality}</div>
              </div>
            </div>

            <Tabs defaultValue="comments" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="comments">Bình luận</TabsTrigger>
              </TabsList>
              <TabsContent value="comments">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Bình luận</h2>
                    {/* Zalo CTA trong comment section */}
                    <ZaloButton href={zaloLink} variant="ghost" size="sm">
                      <MessageCircle className="w-4 h-4" />
                      Chat trên Zalo
                    </ZaloButton>
                  </div>

                  <form
                    onSubmit={handleSubmitComment}
                    className="p-4 rounded-lg border mb-6"
                  >
                    <h3 className="font-medium mb-2">Thêm bình luận</h3>
                    <textarea
                      className="w-full p-2 border rounded-md mb-2 min-h-[100px]"
                      placeholder="Viết bình luận của bạn..."
                      value={comment}
                      onChange={handleCommentChange}
                    />
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        💡 Tham gia nhóm Zalo để thảo luận realtime!
                      </p>
                      <Button type="submit">Đăng bình luận</Button>
                    </div>
                  </form>

                  <div className="space-y-6">
                    {anime.comment && anime.comment.length > 0 ? (
                      anime.comment.map((comment: Comment, i: number) => (
                        <div key={i} className="p-4 rounded-lg border">
                          <div className="flex justify-between mb-2">
                            <div className="font-medium">{comment.user}</div>
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="h-3 w-3 text-yellow-500" />
                              <span>{comment.rating}/10</span>
                            </div>
                          </div>
                          <p className="text-muted-foreground mb-2">
                            {comment.content}
                          </p>
                          <div className="text-xs text-muted-foreground">
                            {comment.date}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 border rounded-lg bg-muted/20">
                        <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                        <p className="text-muted-foreground mb-4">
                          Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
                        </p>
                        <ZaloButton href={zaloLink} variant="default" size="sm">
                          Thảo luận trên Zalo
                        </ZaloButton>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Floating Zalo Button - Always visible */}
        {/* <ZaloButton href={zaloLink} variant="floating" showIcon={false}>
          <img src="/7044033_zalo_icon.svg" alt="Zalo" className="w-6 h-6" />
        </ZaloButton> */}
      </Wrapper>
    </div>
  );
}