import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, RefreshCcw, HelpCircle, X, ArrowRight } from 'lucide-react';

interface Balloon {
  id: number;
  x: number;
  y: number;
  emotion: string;
  isOverwhelming: boolean;
  speed: number;
  size: number;
  color: string;
  stringControl: number;
}

const BalloonPop: React.FC = () => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [calmingStrategies, setCalmingStrategies] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string>('');
  const [level, setLevel] = useState(1);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  const emotions = [
    { emoji: '😠', name: 'Anger', isOverwhelming: true, color: '#ff4d4d' },
    { emoji: '😰', name: 'Anxiety', isOverwhelming: true, color: '#ffa64d' },
    { emoji: '😤', name: 'Frustration', isOverwhelming: true, color: '#ff6b6b' },
    { emoji: '😢', name: 'Sadness', isOverwhelming: true, color: '#4d94ff' },
    { emoji: '😊', name: 'Happiness', isOverwhelming: false, color: '#ffde4d' },
    { emoji: '😌', name: 'Contentment', isOverwhelming: false, color: '#4dff88' },
    { emoji: '🙂', name: 'Calm', isOverwhelming: false, color: '#4dffff' }
  ];

  const calmingTips = [
    'Take three deep breaths',
    'Count to ten slowly',
    'Think of your happy place',
    'Squeeze and release your muscles',
    'Focus on something you can see',
    'Listen to calming sounds',
    'Give yourself a gentle hug'
  ];

  const generateBalloon = (): Balloon => {
    const emotion = emotions[Math.floor(Math.random() * emotions.length)];
    return {
      id: Math.random(),
      x: Math.random() * (canvasRef.current?.width || 800 - 50),
      y: canvasRef.current?.height || 600,
      emotion: emotion.emoji,
      isOverwhelming: emotion.isOverwhelming,
      speed: 1 + Math.random() * 2,
      size: 40 + Math.random() * 20,
      color: emotion.color,
      stringControl: Math.random() * 20 - 10
    };
  };

  const drawBalloonWithString = (ctx: CanvasRenderingContext2D, balloon: Balloon) => {
    const stringLength = balloon.size * 2;
    
    ctx.beginPath();
    ctx.fillStyle = balloon.color;
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 2;
    
    ctx.arc(balloon.x, balloon.y, balloon.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(balloon.x, balloon.y + balloon.size);
    
    ctx.bezierCurveTo(
      balloon.x + balloon.stringControl,
      balloon.y + balloon.size + stringLength * 0.33,
      balloon.x - balloon.stringControl,
      balloon.y + balloon.size + stringLength * 0.66,
      balloon.x,
      balloon.y + balloon.size + stringLength
    );
    
    ctx.stroke();
    
    ctx.font = `${balloon.size}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#000';
    ctx.fillText(balloon.emotion, balloon.x, balloon.y);
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setCalmingStrategies([]);
    setLevel(1);
    setBalloons(Array(5).fill(null).map(generateBalloon));
  };

  const handleBalloonClick = (balloon: Balloon) => {
    if (balloon.isOverwhelming) {
      setScore(score + 10);
      const strategy = calmingTips[Math.floor(Math.random() * calmingTips.length)];
      setCalmingStrategies(prev => [...prev, strategy]);
      setFeedback('Good job! That was an overwhelming emotion.');
    } else {
      setScore(Math.max(0, score - 5));
      setFeedback('Oops! That was a calm emotion we want to keep.');
    }
    
    setBalloons(prev => prev.filter(b => b.id !== balloon.id));
    if (Math.random() < 0.8) {
      setBalloons(prev => [...prev, generateBalloon()]);
    }
  };

  useEffect(() => {
    if (!isPlaying || gameOver) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let activeBalloons = [...balloons];
      activeBalloons = activeBalloons.filter(balloon => {
        balloon.y -= balloon.speed;
        drawBalloonWithString(ctx, balloon);
        return balloon.y + balloon.size + balloon.size * 2 > 0;
      });

      if (activeBalloons.length < balloons.length) {
        setBalloons(activeBalloons);
        if (activeBalloons.length === 0) {
          setLevel(prev => prev + 1);
          setBalloons(Array(5 + level).fill(null).map(generateBalloon));
        }
      }

      if (score >= 100) {
        setGameOver(true);
        setIsPlaying(false);
        return;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    
    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      balloons.forEach(balloon => {
        const distance = Math.sqrt(
          Math.pow(x - balloon.x, 2) + Math.pow(y - balloon.y, 2)
        );
        if (distance < balloon.size) {
          handleBalloonClick(balloon);
        }
      });
    };

    canvas.addEventListener('click', handleClick);
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      canvas.removeEventListener('click', handleClick);
    };
  }, [isPlaying, balloons, gameOver, score, level]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Link to="/games" className="flex items-center text-blue-600 hover:text-blue-800 mr-8">
              <ArrowLeft className="mr-2" size={20} />
              Back to Snake Game
            </Link>
            <h1 className="text-3xl font-bold text-purple-800">Emotional Balloon Pop</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/final-exam" 
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <span>Take Final Exam</span>
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
            width={800}
            height={600}
            className="border border-gray-200 rounded-lg mx-auto bg-gradient-to-b from-blue-50 to-purple-50"
          />

          {feedback && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg">
              {feedback}
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
              <h2 className="text-xl font-semibold">How to Play Emotional Balloon Pop</h2>
              <button
                onClick={() => setShowInstructions(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <ul className="space-y-2">
              <li>Pop balloons with overwhelming emotions (anger, anxiety, frustration)</li>
              <li>Leave calm emotion balloons alone (happiness, contentment)</li>
              <li>Earn points for correctly identifying overwhelming emotions</li>
              <li>Collect calming strategies to use when you need them</li>
              <li>Reach 100 points to win!</li>
            </ul>
          </div>
        )}

        {calmingStrategies.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Your Calming Strategies:</h2>
            <div className="grid grid-cols-2 gap-4">
              {calmingStrategies.map((strategy, index) => (
                <div key={index} className="bg-blue-50 p-3 rounded-lg">
                  {strategy}
                </div>
              ))}
            </div>
          </div>
        )}

        {gameOver && (
          <div className="mt-6 bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-2xl font-semibold mb-2">Congratulations!</h2>
            <p className="text-lg mb-4">Final Score: {score}</p>
            <p className="text-gray-600">
              You've learned to identify and manage overwhelming emotions!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BalloonPop;