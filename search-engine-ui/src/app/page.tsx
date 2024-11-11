'use client';  // Next.jsでクライアントコンポーネントを使用するために必要

import { CompanySearch } from '@/components/search-engine';
// import { App } from '@/components/search-engine';

export default function Home() {
  return <CompanySearch />;
  // return <App />;
}