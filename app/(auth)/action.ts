'use server';

import { z } from 'zod';

// import { createUser, getUser } from '@/lib/db/queries';

import { signIn } from './auth';
import { cookies } from 'next/headers';
// import { encrypt } from '@/lib/server/encryption';
const authFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export interface LoginActionState {
    status: 'idle' | 'in_progress' | 'success' | 'failed' | 'invalid_data';
}

// export const login = async (
//     _: LoginActionState,
//     formData: FormData,
// ): Promise<LoginActionState> => {
//     try {
//         const validatedData = authFormSchema.parse({
//             email: formData.get('email'),
//             password: formData.get('password'),
//         });

//         await signIn('credentials', {
//             email: validatedData.email,
//             password: validatedData.password,
//             redirect: false,
//         });

//         return { status: 'success' };
//     } catch (error) {
//         if (error instanceof z.ZodError) {
//             return { status: 'invalid_data' };
//         }

//         return { status: 'failed' };
//     }
// };

