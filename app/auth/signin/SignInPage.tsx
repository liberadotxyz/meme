// app/auth/error/page.tsx
'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { TradeComponentSkeleton } from '@/components/skeleton/HmepageSkeleton';
export default function SingInErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    // If the error is due to cancellation, redirect to home.
    // The specific error string might vary, but 'Callback' is a common one.
    if (error === 'OAuthCallback' || error === 'Callback') {
      router.push('/');
    }
  }, [error, router]);

  // You can still display an error message for other, more serious errors
  return (
    <div>
      {error !== 'OAuthCallback' && error !== 'Callback' && (
        <div style={{ color: 'red' }}>
          An unexpected authentication error occurred. Please try again.
        </div>
      )}
      <TradeComponentSkeleton></TradeComponentSkeleton>
    </div>
  );
}