// 포트폴리오 콘텐츠 — 이 파일만 수정하면 사이트 내용이 바뀝니다.
//
// ⚠️ 링크 원칙: 실제 URL이 없으면 비워두세요(href 생략 또는 "").
//    `#`이나 루트 도메인(https://github.com/)은 절대 넣지 마세요 —
//    깨진/가짜 링크는 빈 칸보다 신뢰를 더 깎습니다.
//    href가 비어 있으면 해당 링크·버튼은 자동으로 숨겨집니다.

type Social = {
  label: string;
  href?: string; // TODO: 실제 프로필 URL을 채우면 링크가 노출됩니다.
};

type ScholarStats = {
  citations: number;
  hIndex: number;
  i10: number;
};

type Profile = {
  name: string;
  role: string;
  tagline: string;
  about: string;
  email: string;
  socials: Social[];
  cvUrl?: string; // TODO: public/cv.pdf 등을 두고 "/cv.pdf"로 지정하면 CV 버튼 노출.
  scholar?: ScholarStats; // TODO: Google Scholar 인용 지표를 채우면 배지 노출.
};

export const profile: Profile = {
  name: "Jeongseok Oh",
  role: "AI Researcher · Efficient LLM",
  tagline:
    "대형 언어모델을 더 작고, 빠르고, 저렴하게 — 추론 효율과 압축을 연구합니다.",
  about:
    "데이터 사이언티스트이자 AI 연구자로서, 거대한 언어모델을 실제 환경에서 쓸 수 있게 만드는 효율성 문제에 집중합니다. 양자화·희소화·KV 캐시 최적화·추측 디코딩 같은 기법으로 정확도를 지키면서 비용과 지연을 줄이는 방법을 탐구합니다.",
  email: "jeongseok0112@gmail.com",
  socials: [
    { label: "Google Scholar" }, // TODO: 실제 Scholar 프로필 URL
    { label: "GitHub" }, // TODO: 실제 GitHub 프로필 URL
    { label: "arXiv" }, // TODO: 실제 arXiv author 페이지 URL
    { label: "LinkedIn" }, // TODO: 실제 LinkedIn 프로필 URL
  ],
  // cvUrl: "/cv.pdf",
  // scholar: { citations: 0, hIndex: 0, i10: 0 },
};

// 연구 관심사 / 기술 스택
export const skills = [
  "Quantization (GPTQ/AWQ)",
  "Pruning & Sparsity",
  "Knowledge Distillation",
  "KV Cache Optimization",
  "Speculative Decoding",
  "Mixture-of-Experts",
  "PyTorch",
  "CUDA / Triton",
  "vLLM",
  "Transformers",
];

export type Publication = {
  title: string;
  venue: string;
  year: string;
  authors: string;
  href?: string; // TODO: arXiv/PDF/DOI URL. 비우면 "PDF ↗" 링크가 숨겨집니다.
  bibtex?: string; // TODO: 채우면 "Cite (BibTeX)" 복사 버튼이 노출됩니다.
  highlight?: string;
};

export const publications: Publication[] = [
  {
    title:
      "Beyond 4-bit: Outlier-Aware Quantization for Lossless LLM Inference",
    venue: "NeurIPS",
    year: "2025",
    authors: "J. Oh, et al.",
    highlight: "Spotlight",
    // TODO: href, bibtex
  },
  {
    title:
      "SparseKV: Dynamic KV Cache Eviction for Long-Context Transformers",
    venue: "ICLR",
    year: "2025",
    authors: "J. Oh, et al.",
    // TODO: href, bibtex
  },
  {
    title:
      "Draft & Verify Smarter: Adaptive Speculative Decoding at Scale",
    venue: "ICML",
    year: "2024",
    authors: "J. Oh, et al.",
    // TODO: href, bibtex
  },
  {
    title:
      "Distilling Mixture-of-Experts into Dense Models without Accuracy Loss",
    venue: "EMNLP",
    year: "2024",
    authors: "J. Oh, et al.",
    // TODO: href, bibtex
  },
];

export type Project = {
  title: string;
  description: string;
  tags: string[];
  href?: string; // TODO: GitHub repo URL. 비우면 카드가 링크 없이 표시됩니다.
  year: string;
};

export const projects: Project[] = [
  {
    title: "tiny-quant",
    description:
      "GPTQ/AWQ를 한 줄로 적용하는 경량 양자화 툴킷. 7B 모델을 단일 GPU에서 추론 가능하게.",
    tags: ["PyTorch", "CUDA", "Quantization"],
    year: "2025",
    // TODO: href (GitHub repo)
  },
  {
    title: "kv-slim",
    description:
      "긴 컨텍스트에서 KV 캐시 메모리를 4배 줄이는 동적 eviction 라이브러리.",
    tags: ["Triton", "vLLM", "Long-Context"],
    year: "2025",
    // TODO: href (GitHub repo)
  },
  {
    title: "specbench",
    description:
      "추측 디코딩 전략을 공정하게 비교하는 벤치마크 스위트.",
    tags: ["Benchmark", "Inference", "Transformers"],
    year: "2024",
    // TODO: href (GitHub repo)
  },
  {
    title: "moe-distill",
    description:
      "MoE 모델을 dense 모델로 증류하는 학습 레시피와 평가 파이프라인.",
    tags: ["Distillation", "MoE", "Training"],
    year: "2024",
    // TODO: href (GitHub repo)
  },
];
