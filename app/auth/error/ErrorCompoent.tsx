// app/auth/error/ErrorPageContent.tsx
'use client';

import { useSearchParams } from 'next/navigation';

export default function ErrorPageContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return <div>Error: {error}</div>;
}
