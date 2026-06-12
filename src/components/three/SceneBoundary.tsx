"use client";

import { Component, type ReactNode } from "react";

/**
 * WebGL/postprocessing 초기화 실패 시 히어로가 통째로 깨지지 않도록
 * 그래디언트 폴백으로 대체하는 에러 바운더리.
 */
export default class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(109,107,255,0.35),transparent_55%),radial-gradient(circle_at_40%_70%,rgba(255,93,158,0.25),transparent_50%)]" />
      );
    }
    return this.props.children;
  }
}
