// components/ExportButton.tsx

import React from 'react';

const ExportButton: React.FC = () => {
  const handleExport = () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'chart.png';
      link.click();
    }
  };

  return (
    <button
      onClick={handleExport}
      className="mt-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-900"
    >
      Download Chart
    </button>
  );
};

export default ExportButton;
