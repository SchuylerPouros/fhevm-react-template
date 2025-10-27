import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: true,
    message: 'FHE API is running',
    endpoints: {
      encrypt: '/api/fhe/encrypt',
      decrypt: '/api/fhe/decrypt',
      compute: '/api/fhe/compute',
      keys: '/api/keys',
    },
  });
}
