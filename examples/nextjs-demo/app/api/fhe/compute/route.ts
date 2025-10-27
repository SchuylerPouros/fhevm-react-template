import { NextRequest, NextResponse } from 'next/server';
import { initFhevm } from '@fhevm/sdk/core';

export async function POST(request: NextRequest) {
  try {
    const { operation, operands, types } = await request.json();

    if (!operation || !operands || !types) {
      return NextResponse.json(
        { error: 'Missing required fields: operation, operands, and types are required' },
        { status: 400 }
      );
    }

    if (!Array.isArray(operands) || !Array.isArray(types)) {
      return NextResponse.json(
        { error: 'Invalid input: operands and types must be arrays' },
        { status: 400 }
      );
    }

    if (operands.length !== types.length) {
      return NextResponse.json(
        { error: 'Invalid input: operands and types arrays must have the same length' },
        { status: 400 }
      );
    }

    const fhevm = await initFhevm({
      network: 'sepolia',
      gatewayUrl: process.env.GATEWAY_URL || 'https://gateway.zama.ai',
    });

    // Encrypt operands
    const encryptedOperands = await Promise.all(
      operands.map((value: number, index: number) =>
        fhevm.encrypt(value, types[index])
      )
    );

    return NextResponse.json({
      success: true,
      data: {
        operation,
        encryptedOperands: encryptedOperands.map(op => ({
          ciphertext: op.ciphertext,
          type: op.type,
        })),
      },
    });
  } catch (error) {
    console.error('Computation error:', error);
    return NextResponse.json(
      { error: 'Computation failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
