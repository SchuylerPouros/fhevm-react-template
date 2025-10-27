import { NextRequest, NextResponse } from 'next/server';
import { initFhevm } from '@fhevm/sdk/core';

export async function POST(request: NextRequest) {
  try {
    const { ciphertext, type, signature, contractAddress } = await request.json();

    if (!ciphertext || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: ciphertext and type are required' },
        { status: 400 }
      );
    }

    const fhevm = await initFhevm({
      network: 'sepolia',
      gatewayUrl: process.env.GATEWAY_URL || 'https://gateway.zama.ai',
    });

    let result;
    if (signature && contractAddress) {
      // User decryption with EIP-712 signature
      result = await fhevm.userDecrypt(ciphertext, type, signature, contractAddress);
    } else {
      // Public decryption
      result = await fhevm.publicDecrypt(ciphertext, type);
    }

    return NextResponse.json({
      success: true,
      data: {
        value: result.value.toString(),
        type: result.type,
      },
    });
  } catch (error) {
    console.error('Decryption error:', error);
    return NextResponse.json(
      { error: 'Decryption failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
