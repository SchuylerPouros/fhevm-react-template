import { NextRequest, NextResponse } from 'next/server';
import { initFhevm } from '@fhevm/sdk/core';

export async function GET(request: NextRequest) {
  try {
    const fhevm = await initFhevm({
      network: 'sepolia',
      gatewayUrl: process.env.GATEWAY_URL || 'https://gateway.zama.ai',
    });

    const publicKey = await fhevm.getPublicKey();

    return NextResponse.json({
      success: true,
      data: {
        publicKey,
        timestamp: Date.now(),
      },
    });
  } catch (error) {
    console.error('Key retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve public key', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
