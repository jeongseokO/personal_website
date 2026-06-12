import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Jeongseok Oh · AI Researcher";
const description =
  "Efficient LLM을 연구하는 AI 연구자 / 데이터 사이언티스트 포트폴리오 — 양자화, 희소화, 추론 최적화.";

export const metadata: Metadata = {
  // TODO: 배포 도메인으로 교체하세요. 상대 경로 OG 이미지가 절대 URL로 변환됩니다.
  metadataBase: new URL("https://example.com"),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    url: "/",
    siteName: title,
    locale: "ko_KR",
    // TODO: public/og.png (1200×630) 파일을 추가하면 카드 미리보기가 노출됩니다.
    images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

// 첫 페인트 전에 저장된 테마를 적용해 깜빡임(FOUC) 방지
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.dataset.theme=t;}}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
