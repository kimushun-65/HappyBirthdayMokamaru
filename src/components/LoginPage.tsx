'use client'

import { useState } from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (id === 'mokamaru' && password === 'mokamaru1029') {
      setError('');
      onLogin();
    } else {
      setError('IDまたはパスワードが間違っています');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 relative overflow-hidden p-4">
      {/* Login card */}
      <div className="relative z-10 w-full max-w-md">
        <div className={`bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300 ${isShaking ? 'animate-shake' : ''}`}>
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent leading-tight">
              🎉 HAPPY BIRTHDAY 🎉
            </h1>
            <p className="text-lg sm:text-xl font-bold text-purple-600 mb-2">MOKA</p>
            <p className="text-sm sm:text-base text-gray-600">特別なページへようこそ</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <label htmlFor="id" className="block text-sm font-bold text-gray-700 mb-2">
                ID
              </label>
              <input
                type="text"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none transition-colors bg-white/80"
                placeholder="IDを入力してください"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-2">
                パスワード
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none transition-colors bg-white/80"
                placeholder="パスワードを入力してください"
                required
              />
            </div>

            {error && (
              <div className="bg-red-100 border-2 border-red-400 text-red-700 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-center animate-pulse text-sm sm:text-base">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transform active:scale-95 transition-all duration-300 text-base sm:text-lg"
            >
              ログイン
            </button>
          </form>

          <div className="mt-4 sm:mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              🎂 もかまるのために特別に作られたページです 🎂
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
