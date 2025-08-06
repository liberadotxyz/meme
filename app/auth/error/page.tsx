// app/auth/error/page.tsx
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Suspense } from 'react';

import ErrorPageContent from './ErrorCompoent';
export default function ErrorPage() {
  return (
     <Suspense fallback={<div>Loading...</div>}>
      <ErrorPageContent />
    </Suspense>
  )
}