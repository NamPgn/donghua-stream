'use client';

import { useEffect } from 'react';
import MVLink from '@/components/Link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {

  useEffect(() => {
    console.error('Error occurred:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg text-center">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-red-600 mb-2">Rất tiếc!</h1>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Đã xảy ra lỗi</h2>
          <p className="text-gray-600 mb-6">
            Chúng tôi xin lỗi vì sự bất tiện này. Vui lòng thử lại hoặc quay về trang chủ.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => reset()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Thử lại
          </button>
          
          <MVLink
            href="/"
            className="block w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
          >
            Về trang chủ
          </MVLink>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Mã lỗi: {error.digest || 'Không xác định'}</p>
          <p className="mt-2">Nếu vấn đề vẫn tiếp tục, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi.</p>
        </div>
      </div>
    </div>
  );
}
