import React from 'react';

interface FileIconProps {
  type: string;
}

export function FileIcon({ type }: FileIconProps) {
  if (type === 'application/pdf') {
    return <span className="text-4xl">📄</span>;
  }
  if (type.startsWith('image/')) {
    return <span className="text-4xl">🖼️</span>;
  }
  return <span className="text-4xl">📄</span>;
}
