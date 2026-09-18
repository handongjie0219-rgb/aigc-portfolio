import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "韩东杰 · HDJ Studio — AIGC 内容创作",
  description: "韩东杰的 AIGC 内容创作作品集，涵盖品牌 IP、海报、字体、Banner、AI 广告与 AI 短剧。",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
