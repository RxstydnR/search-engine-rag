import React, { useState, useCallback, memo } from 'react';
import { Search, Send, Loader2, RotateCcw, MousePointerClick } from 'lucide-react';

interface Prompt {
  title: string;
  description: string;
  icon: string;
}

interface Message {
  text: string;
  isUser: boolean;
}

const SAMPLE_PROMPTS: Prompt[] = [
  {
    title: "会社の制度について",
    description: "福利厚生や休暇制度について教えてください",
    icon: "🏢"
  },
  {
    title: "業務マニュアル",
    description: "経費精算の手続き方法を教えてください",
    icon: "📘"
  },
  {
    title: "社内ツール",
    description: "社内で使用している情報共有ツールの使い方を教えてください",
    icon: "🔧"
  }
];

const AnimatedBackground = memo(() => {
  const circles = Array.from({ length: 20 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    top: `${(i * 23) % 100}%`,
    width: `${150 + (i * 17) % 100}px`,
    height: `${150 + (i * 17) % 100}px`,
    delay: `${i * 0.5}s`,
    duration: `${10 + (i * 3) % 10}s`
  }));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        {circles.map((circle, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-500/10 animate-float"
            style={{
              left: circle.left,
              top: circle.top,
              width: circle.width,
              height: circle.height,
              // animation: `float ${circle.duration} infinite linear`,
              animationDelay: circle.delay,
              '--duration': circle.duration,
            } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

export const CompanySearch = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isChatView, setIsChatView] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSearch = useCallback((searchQuery = query) => {
    if (!searchQuery.trim() || isSearching) return;
    
    setIsSearching(true);
    document.body.classList.add('searching');
    
    setTimeout(() => {
      setIsChatView(true);
      setMessages([
        { text: searchQuery, isUser: true },
        { text: "検索結果を分析しています...", isUser: false }
      ]);
      setIsSearching(false);
      document.body.classList.remove('searching');
    }, 1000);
  }, [query, isSearching]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  const handleReset = useCallback(() => {
    setIsChatView(false);
    setMessages([]);
    setQuery('');
    setIsSearching(false);
  }, []);

  return (
    <div className="min-h-screen text-white">
      {/* <style jsx global>{`
        @keyframes float {
          0% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, 30px) rotate(120deg); }
          66% { transform: translate(-30px, 30px) rotate(240deg); }
          100% { transform: translate(0, 0) rotate(360deg); }
        }

        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        .search-view .search-container {
          transform: scale(1) translateZ(0);
          opacity: 1;
        }

        .search-view .chat-container {
          transform: scale(0.7) translateZ(-1000px);
          opacity: 0;
          pointer-events: none;
        }

        .chat-view .search-container {
          transform: scale(1.3) translateZ(1000px);
          opacity: 0;
          pointer-events: none;
        }

        .chat-view .chat-container {
          transform: scale(1) translateZ(0);
          opacity: 1;
        }

        body.searching {
          perspective: 1000px;
        }

        body.searching .search-container {
          animation: zoomOut 1s forwards;
        }

        @keyframes zoomOut {
          0% { transform: scale(1) translateZ(0); }
          100% { transform: scale(1.3) translateZ(1000px); }
        }
      `}</style> */}
      
      <div className={`transition-all duration-1000 ${isChatView ? 'chat-view' : 'search-view'}`}>
        {/* 検索ビュー */}
        <div className="search-container fixed inset-0 flex flex-col items-center justify-center transition-all duration-1000">
          <div className="w-full max-w-4xl px-4">
            <h1 className="text-4xl font-bold text-center mb-8">社内情報検索</h1>
            <div className="relative mb-12">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="検索したい内容を入力..."
                className="w-full px-4 py-3 pr-12 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <button
                onClick={() => handleSearch()}
                disabled={isSearching}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white disabled:opacity-50 transition-colors duration-300"
              >
                {isSearching ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Search className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* プロンプト例 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SAMPLE_PROMPTS.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setQuery(prompt.description);
                    handleSearch(prompt.description);
                  }}
                  className="group p-4 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{prompt.icon}</span>
                    <MousePointerClick className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" />
                  </div>
                  <h3 className="font-medium mb-1">{prompt.title}</h3>
                  <p className="text-sm text-gray-400">{prompt.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* チャットビュー */}
        <div className="chat-container fixed inset-0 flex items-center justify-center p-8 transition-all duration-1000">
          <div className="w-full max-w-4xl h-[80vh] bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-4 flex flex-col relative">
            {/* リセットボタン */}
            <button
              onClick={handleReset}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors duration-300 bg-gray-700/50 rounded-lg backdrop-blur-sm hover:bg-gray-600/50"
              title="検索画面に戻る"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <div className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-slideUp`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-blue-600/80 backdrop-blur-sm text-white'
                        : 'bg-gray-700/80 backdrop-blur-sm text-gray-100'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="メッセージを入力..."
                className="w-full px-4 py-3 pr-12 bg-gray-700/50 backdrop-blur-sm rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors duration-300">
                <Send className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
