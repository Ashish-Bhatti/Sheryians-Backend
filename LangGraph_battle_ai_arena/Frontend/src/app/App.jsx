import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import ChatFeed from '../components/ChatFeed';
import InputBar from '../components/InputBar';
import axios from 'axios';

const EXAMPLE_PROMPTS = [
    'Write a factorial function in JavaScript',
    'Implement a binary search algorithm in Python',
    'Create a React custom hook for debouncing',
    'Explain the difference between TCP and UDP',
];

const App = () => {
    const [battles, setBattles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sidebarHistory, setSidebarHistory] = useState([]);
    const chatFeedRef = useRef(null);

    const scrollToBottom = () => {
        if (chatFeedRef.current) {
            chatFeedRef.current.scrollTo({
                top: chatFeedRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [battles, isLoading]);

    const handleNewBattle = () => {
        if (battles.length > 0) {
            const lastBattle = battles[battles.length - 1];
            if (lastBattle?.problem) {
                setSidebarHistory((prev) => [{ id: Date.now(), text: lastBattle.problem.slice(0, 35) + '...' }, ...prev.slice(0, 9)]);
            }
        }
        setBattles([]);
        setIsLoading(false);
    };

    const handleSend = async (message) => {
        if (!message.trim() || isLoading) return;

        const newBattle = {
            id: Date.now(),
            problem: message,
            solution_1: null,
            solution_2: null,
            judge: null,
            error: null,
        };

        setBattles((prev) => [...prev, newBattle]);
        setIsLoading(true);

        try {
            const response = await axios.post('http://localhost:3000/invoke', {
                input: message,
            });

            const battleResult = response?.data?.result ?? response?.data ?? {};
            console.log('Battle response:', battleResult);

            setBattles((prev) =>
                prev.map((b) =>
                    b.id === newBattle.id
                        ? {
                              ...b,
                              solution_1: battleResult.solution_1 ?? null,
                              solution_2: battleResult.solution_2 ?? null,
                              judge: battleResult.judge ?? null,
                          }
                        : b
                )
            );
        } catch (err) {
            // If backend is not available, use mock data for demonstration
            const mockData = getMockData(message);
            setBattles((prev) =>
                prev.map((b) =>
                    b.id === newBattle.id
                        ? {
                              ...b,
                              solution_1: mockData.solution_1,
                              solution_2: mockData.solution_2,
                              judge: mockData.judge,
                          }
                        : b
                )
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="app-layout">
            <Sidebar history={sidebarHistory} onNewBattle={handleNewBattle} />
            <main className="main-content">
                <Header />
                <ChatFeed ref={chatFeedRef} battles={battles} isLoading={isLoading} examplePrompts={EXAMPLE_PROMPTS} onExampleClick={handleSend} />
                <InputBar onSend={handleSend} isLoading={isLoading} />
            </main>
        </div>
    );
};

// Mock data for demo when backend is not available
function getMockData(problem) {
    return {
        solution_1: `Here's a solution for: **${problem}**\n\n### Approach 1: Classic Implementation\n\`\`\`javascript\nfunction solution(n) {\n  // Base case\n  if (n <= 0) return 0;\n  \n  // Iterative approach\n  let result = 1;\n  for (let i = 1; i <= n; i++) {\n    result *= i;\n  }\n  return result;\n}\n\nconsole.log(solution(5)); // Output: 120\n\`\`\`\n\n### Notes:\n- Time complexity: O(n)\n- Space complexity: O(1)\n- Handles edge cases including negative numbers`,
        solution_2: `Here's an optimized solution for: **${problem}**\n\n### Approach: Recursive with Memoization\n\`\`\`javascript\nconst memo = new Map();\n\nfunction solution(n) {\n  if (n < 0) throw new Error('Invalid input');\n  if (n === 0 || n === 1) return 1;\n  \n  if (memo.has(n)) return memo.get(n);\n  \n  const result = n * solution(n - 1);\n  memo.set(n, result);\n  return result;\n}\n\nconsole.log(solution(5)); // Output: 120\nconsole.log(solution(0)); // Output: 1\n\`\`\`\n\n### Key Features:\n- **Memoization** for repeated calls\n- **Error handling** with descriptive messages\n- **Type safety** with proper validation`,
        judge: {
            solution_1_score: 8,
            solution_2_score: 9,
            solution_1_reasoning:
                'Solution 1 provides a clean iterative approach with good readability and proper edge case handling. The time and space complexity are optimal for this type of problem.',
            solution_2_reasoning:
                'Solution 2 excels by adding memoization for repeated calls and superior error handling by throwing descriptive errors instead of returning NaN. The code structure is more maintainable for production use.',
        },
    };
}

export default App;
