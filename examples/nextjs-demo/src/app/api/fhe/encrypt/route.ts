import { NextRequest, NextResponse } from 'next/server';
import { initFhevm } from '@fhevm/sdk/core';

export async function POST(request: NextRequest) {
  try {
    const { value, type } = await request.json();

    if (typeof value !== 'number' || !type) {
      return NextResponse.json(
        { error: 'Invalid input: value must be a number and type is required' },
        { status: 400 }
      );
    }

    const fhevm = await initFhevm({
      network: 'sepolia',
      gatewayUrl: process.env.GATEWAY_URL || 'https://gateway.zama.ai',
    });

    const encrypted = await fhevm.encrypt(value, type);

    return NextResponse.json({
      success: true,
      data: encrypted,
    });
  } catch (error) {
    console.error('Encryption error:', error);
    return NextResponse.json(
      { error: 'Encryption failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
