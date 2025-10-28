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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 relative overflow-hidden">
      {/* Login card */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div className={`bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 transform transition-all duration-300 ${isShaking ? 'animate-shake' : ''}`}>
          <div className="text-center mb-8">
            <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              🎉 HAPPY BIRTHDAY 🎉
            </h1>
            <p className="text-xl font-bold text-purple-600 mb-2">MOKA</p>
            <p className="text-gray-600">特別なページへようこそ</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="id" className="block text-sm font-bold text-gray-700 mb-2">
                ID
              </label>
              <input
                type="text"
                id="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none transition-colors bg-white/80"
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
                className="w-full px-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:outline-none transition-colors bg-white/80"
                placeholder="パスワードを入力してください"
                required
              />
            </div>

            {error && (
              <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-xl text-center animate-pulse">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300"
            >
              ログイン
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              🎂 もかまるのために特別に作られたページです 🎂
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
