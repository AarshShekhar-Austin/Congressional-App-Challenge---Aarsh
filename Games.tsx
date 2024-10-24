import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RefreshCcw, HelpCircle, X, ArrowRight } from 'lucide-react';

const GRID_SIZE = 20;
const CELL_SIZE = 30;
const INITIAL_SNAKE_LENGTH = 3;
const INITIAL_DELAY = 150;

const Games: React.FC = () => {
  const [snake, setSnake] = useState<{ x: number; y: number }[]>([]);
  const [direction, setDirection] = useState<string>('right');
  const [food, setFood] = useState<{ x: number; y: number; emotion: string }[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(true);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snakeImageRef = useRef<HTMLImageElement>(new Image());
  
  useEffect(() => {
    snakeImageRef.current.src = 'https://banner2.cleanpng.com/20180217/kye/av14j8c17.webp';
  }, []);

  const generateFood = useCallback(() => {
    const newFood = [];
    const count = Math.min(3, Math.floor(snake.length / 5) + 1);
    
    for (let i = 0; i < count; i++) {
      let x, y;
      do {
        x = Math.floor(Math.random() * GRID_SIZE);
        y = Math.floor(Math.random() * GRID_SIZE);
      } while (
        snake.some(segment => segment.x === x && segment.y === y) ||
        newFood.some(f => f.x === x && f.y === y)
      );
      
      const emotions = ['😊', '😢', '😠', '😨', '😌'];
      newFood.push({
        x,
        y,
        emotion: emotions[Math.floor(Math.random() * emotions.length)]
      });
    }
    setFood(newFood);
  }, [snake]);

  const startGame = () => {
    const initialSnake = [];
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      initialSnake.push({ x: Math.floor(GRID_SIZE / 2) - i, y: Math.floor(GRID_SIZE / 2) });
    }
    setSnake(initialSnake);
    setDirection('right');
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    setIsPaused(false);
    generateFood();
  };

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#f0fdf4';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = '#e5e7eb';
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    snake.forEach((segment, index) => {
      if (index === 0) {
        ctx.drawImage(
          snakeImageRef.current,
          segment.x * CELL_SIZE,
          segment.y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      } else {
        ctx.fillStyle = index % 2 === 0 ? '#22c55e' : '#15803d';
        ctx.fillRect(
          segment.x * CELL_SIZE,
          segment.y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      }
    });

    food.forEach(({ x, y, emotion }) => {
      ctx.font = `${CELL_SIZE * 0.8}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(
        emotion,
        x * CELL_SIZE + CELL_SIZE / 2,
        y * CELL_SIZE + CELL_SIZE / 2
      );
    });
  }, [snake, food]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isPlaying && !isPaused && !currentQuestion) {
        switch (e.key) {
          case 'ArrowUp':
            if (direction !== 'down') setDirection('up');
            break;
          case 'ArrowDown':
            if (direction !== 'up') setDirection('down');
            break;
          case 'ArrowLeft':
            if (direction !== 'right') setDirection('left');
            break;
          case 'ArrowRight':
            if (direction !== 'left') setDirection('right');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, isPaused, direction, currentQuestion]);

  useEffect(() => {
    if (isPlaying && !isPaused && !currentQuestion) {
      const gameLoop = setInterval(() => {
        moveSnake();
      }, INITIAL_DELAY);
      return () => clearInterval(gameLoop);
    }
  }, [isPlaying, isPaused, snake, direction, food, currentQuestion]);

  useEffect(() => {
    drawGame();
  }, [drawGame]);

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case 'up':
        head.y -= 1;
        break;
      case 'down':
        head.y += 1;
        break;
      case 'left':
        head.x -= 1;
        break;
      case 'right':
        head.x += 1;
        break;
    }

    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE ||
      newSnake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      setGameOver(true);
      setIsPlaying(false);
      return;
    }

    newSnake.unshift(head);
    
    const foodIndex = food.findIndex(f => f.x === head.x && f.y === head.y);
    if (foodIndex >= 0) {
      setScore(score + 10);
      const emotion = food[foodIndex].emotion;
      const questions = {
        '😊': [
          'What makes you feel happy?',
          'How do you share happiness with others?',
          'What is your favorite happy memory?'
        ],
        '😢': [
          'What makes you feel sad?',
          'What helps you feel better when you are sad?',
          'How can others help when you feel sad?'
        ],
        '😠': [
          'What makes you feel angry?',
          'What helps you calm down when angry?',
          'How do you express anger safely?'
        ],
        '😨': [
          'What makes you feel scared?',
          'What helps you feel brave?',
          'Who helps you when you feel afraid?'
        ],
        '😌': [
          'What helps you feel calm?',
          'Where is your favorite calm place?',
          'What do you do to relax?'
        ]
      };
      
      const emotionQuestions = questions[emotion as keyof typeof questions];
      setCurrentQuestion(emotionQuestions[Math.floor(Math.random() * emotionQuestions.length)]);
      setIsPaused(true);
      
      const newFood = food.filter((_, index) => index !== foodIndex);
      setFood(newFood);
      if (newFood.length === 0) {
        generateFood();
      }
    } else {
      newSnake.pop();
    }
    
    setSnake(newSnake);
  };

  const handleQuestionResponse = () => {
    if (answer.trim()) {
      setAnswer('');
      setCurrentQuestion('');
      setIsPaused(false);
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Link to="/notes" className="flex items-center text-blue-600 hover:text-blue-800 mr-8">
              <ArrowLeft className="mr-2" size={20} />
              Back to Notes
            </Link>
            <h1 className="text-3xl font-bold text-purple-800">Emotion Snake</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/balloon-pop" 
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <span>Next Game: Emotional Balloon Pop</span>
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <button
              onClick={() => setShowInstructions(true)}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <HelpCircle className="mr-2" size={20} />
              How to Play
            </button>
            <div className="bg-white px-4 py-2 rounded-lg shadow">
              <span className="font-semibold">Score: {score}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 relative">
          <canvas
            ref={canvasRef}
            width={GRID_SIZE * CELL_SIZE}
            height={GRID_SIZE * CELL_SIZE}
            className="border border-gray-200 rounded-lg mx-auto"
          />

          {currentQuestion && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                <h3 className="text-lg font-semibold mb-4">{currentQuestion}</h3>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                  placeholder="Type your answer here..."
                  autoFocus
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleQuestionResponse();
                    }
                  }}
                />
                <button
                  onClick={handleQuestionResponse}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  Submit Answer
                </button>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-center space-x-4">
            {!isPlaying && !gameOver && (
              <button
                onClick={startGame}
                className="flex items-center px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                <Play className="mr-2" size={20} />
                Start Game
              </button>
            )}
            {isPlaying && !currentQuestion && (
              <button
                onClick={togglePause}
                className="flex items-center px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                {isPaused ? <Play size={20} /> : <Pause size={20} />}
                <span className="ml-2">{isPaused ? 'Resume' : 'Pause'}</span>
              </button>
            )}
            {gameOver && (
              <button
                onClick={startGame}
                className="flex items-center px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
              >
                <RefreshCcw className="mr-2" size={20} />
                Play Again
              </button>
            )}
          </div>
        </div>

        {showInstructions && (
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">How to Play Emotion Snake</h2>
              <button
                onClick={() => setShowInstructions(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <ul className="space-y-2">
              <li>Use arrow keys (↑, ↓, ←, →) to guide your snake</li>
              <li>Collect emotion emojis to grow longer and earn points</li>
              <li>Answer questions about emotions to continue playing</li>
              <li>Avoid hitting the walls or your own tail</li>
              <li>Try to achieve the highest score possible!</li>
            </ul>
          </div>
        )}

        {gameOver && (
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-2xl font-semibold mb-2">Game Over!</h2>
            <p className="text-lg mb-4">Final Score: {score}</p>
            <p className="text-gray-600">
              Great job managing emotions! Want to try again?
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;