# Portfolio — 3D / WebGL

크리에이티브 개발자 개인 포트폴리오. Three.js 기반 인터랙티브 히어로 씬을 가진 싱글 페이지.

## 스택

- **Next.js 16** (App Router) + **TypeScript**
- **React Three Fiber + drei** — Three.js 선언형 렌더링
- **@react-three/postprocessing** — Bloom 등 포스트 이펙트
- **Tailwind CSS v4** + **Framer Motion**

## 개발

```bash
npm run dev      # http://localhost:3000
npm run build    # 프로덕션 빌드
npm start        # 빌드 결과 실행
```

## 구조

```
src/
├─ app/
│  ├─ layout.tsx        # 메타데이터, 폰트, 다크 테마
│  ├─ page.tsx          # 섹션 조합
│  └─ globals.css       # 테마 토큰 · 유틸 클래스
├─ components/
│  ├─ Navbar.tsx
│  ├─ Hero.tsx          # 3D 씬 + 카피 (WebGL은 ssr:false 동적 로드)
│  ├─ About.tsx
│  ├─ Projects.tsx
│  ├─ Contact.tsx
│  ├─ Section.tsx       # 스크롤 reveal 헬퍼
│  └─ three/
│     └─ HeroScene.tsx  # R3F Canvas · 모핑 블롭 · 파티클 · Bloom
└─ lib/
   └─ data.ts           # 프로필 · 스킬 · 프로젝트 데이터 (여기만 수정)
```

## 내용 수정

`src/lib/data.ts` 한 파일에서 이름·소개·소셜·프로젝트를 모두 관리합니다.

## 배포

Vercel 권장. 리포지토리 연결 후 기본 설정으로 배포됩니다.
