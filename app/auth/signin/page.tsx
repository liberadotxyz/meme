// app/auth/error/page.tsx
'use client';

import SingInErrorPage from './SignInPage';
import { Suspense } from 'react';
export default function ErrorPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
              <SingInErrorPage />
            </Suspense>
    )
}