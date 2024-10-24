import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, MessageCircle, CheckCircle, XCircle } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  justification: string;
  hint: string;
  studyTip: string;
}

const FinalExam: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [showHint, setShowHint] = useState<number | null>(null);
  const [currentQuestionChat, setCurrentQuestionChat] = useState<number | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'Welcome! I can help explain any questions you have trouble with.' }
  ]);

  const easyQuestions: Question[] = [
    {
      question: "What is one sign that you may be feeling overwhelmed?",
      options: [
        "Smiling a lot",
        "Feeling calm",
        "Heart racing",
        "Being sleepy"
      ],
      correctAnswer: 2,
      justification: "When you're overwhelmed, your body shows physical signs like a racing heart. This is an important signal that helps you recognize when you need to use your calming strategies. Next time you feel your heart racing, try taking some deep breaths to help slow it down.",
      hint: "Think about how your body feels when you're stressed or worried.",
      studyTip: "Keep a journal of how your body feels in different situations to help you recognize patterns."
    },
    {
      question: "Which of these can help you calm down when feeling overwhelmed?",
      options: [
        "Running around",
        "Taking deep breaths",
        "Yelling loudly",
        "Ignoring your feelings"
      ],
      correctAnswer: 1,
      justification: "Deep breathing is one of the most effective ways to calm down. It helps slow your heart rate and gives your brain more oxygen. Practice taking slow, deep breaths when you're calm so you can use this skill when you need it.",
      hint: "Think about what makes your body feel more relaxed.",
      studyTip: "Try practicing deep breathing for a few minutes each day, even when you're not upset."
    },
    {
      question: "What should you do if you feel frustrated during a game?",
      options: [
        "Throw the game",
        "Ask for a break",
        "Get more frustrated",
        "Yell at the game"
      ],
      correctAnswer: 1,
      justification: "Taking a break when frustrated helps you calm down and reset. It's like pressing a pause button on your strong feelings. When you come back, you'll be better able to handle the situation.",
      hint: "What would help you feel calmer?",
      studyTip: "Create a special 'calm down corner' where you can take breaks when needed."
    },
    {
      question: "Which of these is a calming strategy?",
      options: [
        "Shouting",
        "Listening to calm music",
        "Biting your nails",
        "Running around wildly"
      ],
      correctAnswer: 1,
      justification: "Calm music can help relax your mind and body. It's like giving your brain a gentle massage. Try making a playlist of songs that help you feel peaceful.",
      hint: "Which activity helps your body and mind feel peaceful?",
      studyTip: "Create a playlist of songs that make you feel calm and peaceful."
    },
    {
      question: "How do you know you need help with your emotions?",
      options: [
        "You feel confused and can't calm down",
        "You feel happy and relaxed",
        "You're smiling a lot",
        "You don't feel anything"
      ],
      correctAnswer: 0,
      justification: "Feeling confused and unable to calm down is a clear sign that you need help. It's like having a puzzle you can't solve alone - it's okay to ask someone to help you figure it out.",
      hint: "When do you find it hardest to handle your feelings?",
      studyTip: "Make a list of trusted people you can go to when you need help with big feelings."
    },
    {
      question: "What should you do if you are angry and can't calm down?",
      options: [
        "Keep getting angrier",
        "Ask for help",
        "Keep thinking about why you're angry",
        "Ignore your feelings"
      ],
      correctAnswer: 1,
      justification: "Asking for help when you're angry shows wisdom and strength. Sometimes we need others to help us manage big feelings, just like we might need help carrying something heavy.",
      hint: "Who could help you feel better?",
      studyTip: "Practice asking for help with small things so it's easier when you have big feelings."
    },
    {
      question: "When you're sad, what can help you feel better?",
      options: [
        "Ignoring the sadness",
        "Talking to a friend",
        "Being by yourself forever",
        "Crying all the time"
      ],
      correctAnswer: 1,
      justification: "Talking to a friend about your feelings can help you feel understood and supported. It's like sharing a heavy backpack - the load feels lighter when someone helps you carry it.",
      hint: "Who makes you feel better when you're sad?",
      studyTip: "Keep a list of friends and family members who are good listeners."
    },
    {
      question: "What should you do if someone else feels overwhelmed?",
      options: [
        "Tell them to stop",
        "Offer to listen",
        "Ignore them",
        "Get angry at them"
      ],
      correctAnswer: 1,
      justification: "Offering to listen shows kindness and support. Sometimes people just need someone to hear them out, like having a safe place to share their feelings.",
      hint: "What would you want someone to do for you?",
      studyTip: "Practice being a good listener with family and friends."
    },
    {
      question: "Which feeling is an example of being overwhelmed?",
      options: [
        "Feeling sleepy",
        "Feeling relaxed",
        "Feeling scared and nervous",
        "Feeling bored"
      ],
      correctAnswer: 2,
      justification: "Feeling scared and nervous are intense emotions that can be overwhelming. They're like storm clouds that make it hard to see clearly. Learning to recognize these feelings helps you know when to use your coping strategies.",
      hint: "Which feelings are the hardest to handle?",
      studyTip: "Draw pictures of how different emotions feel to help you recognize them."
    },
    {
      question: "What is the first step when you're overwhelmed?",
      options: [
        "Run away",
        "Recognize your feelings",
        "Do nothing",
        "Yell at others"
      ],
      correctAnswer: 1,
      justification: "Recognizing your feelings is like reading a map - it helps you know where you are and what to do next. Once you know what you're feeling, you can choose the right tools to help yourself feel better.",
      hint: "What do you need to know before you can feel better?",
      studyTip: "Practice naming your feelings throughout the day, even when they're not overwhelming."
    }
  ];

  const mediumQuestions: Question[] = [
    {
      question: "What is a common physical sign of being overwhelmed?",
      options: [
        "Feeling sleepy",
        "Sweating or shaking",
        "Smiling a lot",
        "Feeling hungry"
      ],
      correctAnswer: 1,
      justification: "Physical signs like sweating or shaking are your body's way of saying emotions are getting intense. Understanding these signals helps you catch overwhelming feelings early and manage them better.",
      hint: "Notice how your body reacts when you're stressed.",
      studyTip: "Keep a 'body signals' diary to track how your body responds to different emotions."
    },
    {
      question: "Which of these is NOT a good way to manage overwhelming emotions?",
      options: [
        "Taking deep breaths",
        "Yelling at someone",
        "Asking for help",
        "Taking a break"
      ],
      correctAnswer: 1,
      justification: "Yelling at others usually makes situations worse and can hurt relationships. Instead, try using calm communication or taking a break to manage your emotions.",
      hint: "Which response might make others feel bad?",
      studyTip: "Practice expressing feelings without raising your voice."
    },
    {
      question: "Why is it important to recognize when you're overwhelmed?",
      options: [
        "So you can get more angry",
        "So you can stop and calm down",
        "So you can ignore the feelings",
        "So you can keep going until you feel worse"
      ],
      correctAnswer: 1,
      justification: "Recognizing overwhelming emotions early lets you take action before they become too big to handle. It's like catching a small problem before it grows into a big one.",
      hint: "What happens if you wait too long to address big feelings?",
      studyTip: "Set regular 'emotion check-ins' throughout your day."
    },
    {
      question: "When might it be useful to ask for help managing emotions?",
      options: [
        "When you're feeling relaxed",
        "When you don't know how to calm down",
        "When you're bored",
        "When you're having fun"
      ],
      correctAnswer: 1,
      justification: "Asking for help when you're unsure how to calm down shows good judgment. Everyone needs help sometimes, and getting support can teach you new ways to handle big feelings.",
      hint: "When do you feel most stuck with your emotions?",
      studyTip: "Make a list of situations where asking for help would be smart."
    },
    {
      question: "Which of these strategies could help calm down when you're overwhelmed by frustration?",
      options: [
        "Talking about it with someone",
        "Getting more frustrated",
        "Blaming others",
        "Ignoring the feeling"
      ],
      correctAnswer: 0,
      justification: "Talking about your frustration helps you process the emotion and often leads to solutions. It's like untangling a knot - sometimes you need another perspective to figure it out.",
      hint: "What helps you understand your feelings better?",
      studyTip: "Practice explaining your frustrations calmly to a trusted person."
    },
    {
      question: "If you feel nervous before a presentation, what is a good thing to do?",
      options: [
        "Run away from the room",
        "Take deep breaths and remind yourself you can do it",
        "Keep thinking about being nervous",
        "Get more anxious"
      ],
      correctAnswer: 1,
      justification: "Deep breathing combined with positive self-talk helps calm your nerves and builds confidence. It's like giving yourself a pep talk while helping your body relax.",
      hint: "What could help both your body and mind feel calmer?",
      studyTip: "Write down encouraging phrases to tell yourself when nervous."
    },
    {
      question: "What happens if you don't manage overwhelming emotions?",
      options: [
        "They go away on their own",
        "They get worse",
        "They stop bothering you",
        "They don't matter"
      ],
      correctAnswer: 1,
      justification: "Unmanaged overwhelming emotions tend to grow stronger and can lead to bigger problems. It's like a snowball rolling downhill - it gets bigger unless you stop it.",
      hint: "What happens to feelings when we ignore them?",
      studyTip: "Notice how emotions change when you address them versus ignore them."
    },
    {
      question: "Which strategy is NOT helpful when overwhelmed by anger?",
      options: [
        "Counting slowly to 10",
        "Screaming loudly",
        "Walking away from the situation",
        "Taking deep breaths"
      ],
      correctAnswer: 1,
      justification: "Screaming often increases anger and tension rather than reducing it. Calmer responses like counting or walking away help you regain control of your emotions.",
      hint: "Which response might make you feel more out of control?",
      studyTip: "Create a list of calm responses to use when angry."
    },
    {
      question: "What can help you stay calm when something unexpected happens?",
      options: [
        "Panic and overreact",
        "Take a few deep breaths and think about what to do next",
        "Yell at others around you",
        "Do nothing and stay still"
      ],
      correctAnswer: 1,
      justification: "Taking deep breaths and thinking about next steps helps you respond thoughtfully instead of reacting emotionally. It's like pressing pause to make a better choice.",
      hint: "What helps you think more clearly?",
      studyTip: "Practice responding calmly to small unexpected changes."
    },
    {
      question: "Which of these is a healthy way to express anger?",
      options: [
        "Punching a wall",
        "Telling someone why you're upset",
        "Yelling at the person you're angry with",
        "Throwing things around"
      ],
      correctAnswer: 1,
      justification: "Expressing anger through calm communication helps others understand your feelings without making the situation worse. It's like building a bridge instead of a wall.",
      hint: "Which response helps others understand you better?",
      studyTip: "Practice using 'I feel' statements when expressing anger."
    }
  ];

  const hardQuestions: Question[] = [
    {
      question: "What is the most effective first step in managing overwhelming emotions?",
      options: [
        "Ignoring the emotion",
        "Recognizing and naming the emotion",
        "Responding impulsively",
        "Trying to forget the feeling"
      ],
      correctAnswer: 1,
      justification: "Recognizing and naming emotions helps you understand what you're dealing with and choose appropriate coping strategies. It's like diagnosing a problem before trying to fix it.",
      hint: "What do you need to know before you can handle an emotion?",
      studyTip: "Create an emotion vocabulary journal with different feeling words."
    },
    {
      question: "Why might deep breathing be a helpful tool during overwhelming emotions?",
      options: [
        "It increases your heart rate",
        "It distracts you from your emotions",
        "It slows your heart rate and calms your nervous system",
        "It makes you forget about the emotion"
      ],
      correctAnswer: 2,
      justification: "Deep breathing activates your body's relaxation response, helping to calm both physical and emotional symptoms of stress. It's like pressing a reset button for your nervous system.",
      hint: "How does breathing affect your body's stress response?",
      studyTip: "Learn different breathing techniques and practice them regularly."
    },
    {
      question: "Which scenario best describes being overwhelmed?",
      options: [
        "Feeling slightly annoyed but managing to stay calm",
        "Feeling happy and excited about a new activity",
        "Feeling so frustrated and anxious that you can't think clearly",
        "Feeling bored with nothing to do"
      ],
      correctAnswer: 2,
      justification: "Being overwhelmed often involves intense emotions that interfere with clear thinking and normal functioning. It's like having too many browser tabs open - everything becomes slow and confusing.",
      hint: "When do emotions make it hard to think or act normally?",
      studyTip: "Record situations where emotions make it hard to think clearly."
    },
    {
      question: "Which coping strategy would be least effective during overwhelming anger?",
      options: [
        "Counting to 10",
        "Punching a pillow",
        "Talking to a friend",
        "Taking a walk outside"
      ],
      correctAnswer: 1,
      justification: "While some believe physical aggression helps release anger, it often maintains or increases aggressive feelings. Better strategies focus on calming down rather than acting out the emotion.",
      hint: "Which response might keep angry feelings going?",
      studyTip: "Develop a list of non-aggressive ways to handle anger."
    },
    {
      question: "What role does 'self-talk' play in managing overwhelming emotions?",
      options: [
        "It makes the emotion go away immediately",
        "It helps you calm down by using positive, rational thoughts",
        "It increases feelings of stress and frustration",
        "It makes emotions feel less important"
      ],
      correctAnswer: 1,
      justification: "Positive self-talk helps reframe situations and calm emotional responses. It's like having a wise friend in your head helping you see things more clearly.",
      hint: "How can your thoughts affect your feelings?",
      studyTip: "Write down helpful phrases to tell yourself during difficult times."
    },
    {
      question: "Why is it important to ask for help when managing strong emotions?",
      options: [
        "You might not be able to manage them alone",
        "Other people will always know what to do",
        "It makes others take responsibility for your feelings",
        "It will make the emotions go away faster"
      ],
      correctAnswer: 0,
      justification: "Sometimes emotions are too complex or intense to handle alone, and getting support provides new perspectives and strategies. It's like having a co-pilot when navigation gets tough.",
      hint: "When might handling emotions alone be too difficult?",
      studyTip: "Identify trusted people who can help with different types of emotions."
    },
    {
      question: "Which of these describes a healthy way to handle frustration?",
      options: [
        "Throwing objects around",
        "Bottling up the feelings inside",
        "Taking a few deep breaths and focusing on solutions",
        "Blaming others for the problem"
      ],
      correctAnswer: 2,
      justification: "Combining calming strategies with problem-solving helps address both the emotional and practical aspects of frustration. It's like having a toolbox with different tools for different jobs.",
      hint: "What approach helps both your feelings and the situation?",
      studyTip: "Practice combining breathing exercises with problem-solving steps."
    },
    {
      question: "What can be the result of consistently avoiding overwhelming emotions?",
      options: [
        "They eventually go away",
        "They build up and may lead to an emotional outburst",
        "They stop affecting you",
        "They lose their intensity over time"
      ],
      correctAnswer: 1,
      justification: "Avoiding emotions doesn't make them disappear; instead, they often build up and can explode later. It's like trying to hold a beach ball underwater - it will eventually pop up with more force.",
      hint: "What happens to feelings we try to ignore?",
      studyTip: "Notice patterns between avoiding emotions and emotional outbursts."
    },
    {
      question: "Why is it important to understand your own emotional triggers?",
      options: [
        "So you can control others' actions",
        "So you can predict when you might get overwhelmed and manage it earlier",
        "So you can avoid situations completely",
        "So you can always feel calm and never get upset"
      ],
      correctAnswer: 1,
      justification: "Understanding your triggers helps you prepare for and manage emotional responses more effectively. It's like having a weather forecast for your feelings - you can plan ahead.",
      hint: "How can knowing what upsets you help you manage emotions?",
      studyTip: "Keep a trigger journal to identify patterns in what causes strong emotions."
    },
    {
      question: "What is the best approach to handling overwhelming sadness?",
      options: [
        "Avoid talking about it",
        "Keep focusing on the negative feelings",
        "Acknowledge the sadness and reach out for support",
        "Ignore the feeling and hope it goes away"
      ],
      correctAnswer: 2,
      justification: "Acknowledging sadness and seeking support helps process the emotion in a healthy way. It's like opening a window in a stuffy room - it helps release the heaviness.",
      hint: "What helps sadness feel less overwhelming?",
      studyTip: "Create a comfort plan for times when sadness feels too big."
    }
  ];

  const handleDifficultySelect = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    setAnswers(new Array(10).fill(-1));
    setShowResults(false);
    setShowHint(null);
    setCurrentQuestionChat(null);
  };

  const getCurrentQuestions = () => {
    switch (selectedDifficulty) {
      case 'easy':
        return easyQuestions;
      case 'medium':
        return mediumQuestions;
      case 'hard':
        return hardQuestions;
      default:
        return easyQuestions;
    }
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    const currentQuestions = getCurrentQuestions();
    return answers.reduce((score, answer, index) => {
      return score + (answer === currentQuestions[index].correctAnswer ? 1 : 0);
    }, 0);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (chatInput.trim()) {
      const currentQuestions = getCurrentQuestions();
      setChatMessages([
        ...chatMessages,
        { role: 'user', content: chatInput },
        { 
          role: 'assistant', 
          content: `Let me help you understand this question better. ${currentQuestions[currentQuestionChat || 0].hint} ${currentQuestions[currentQuestionChat || 0].studyTip}`
        }
      ]);
      setChatInput('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link to="/balloon-pop" className="flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="mr-2" size={20} />
            Back to Games
          </Link>
          <h1 className="text-3xl font-bold text-purple-800">Overwhelming Emotions Final Exam</h1>
        </div>

        {!selectedDifficulty ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Select Difficulty Level</h2>
            <div className="grid grid-cols-3 gap-6">
              <button
                onClick={() => handleDifficultySelect('easy')}
                className="p-6 bg-green-100 hover:bg-green-200 rounded-lg text-center transition-colors"
              >
                <h3 className="text-xl font-semibold text-green-800 mb-2">Easy</h3>
                <p className="text-green-600">Perfect for beginners</p>
              </button>
              <button
                onClick={() => handleDifficultySelect('medium')}
                className="p-6 bg-yellow-100 hover:bg-yellow-200 rounded-lg text-center transition-colors"
              >
                <h3 className="text-xl font-semibold text-yellow-800 mb-2">Medium</h3>
                <p className="text-yellow-600">For confident learners</p>
              </button>
              <button
                onClick={() => handleDifficultySelect('hard')}
                className="p-6 bg-red-100 hover:bg-red-200 rounded-lg text-center transition-colors"
              >
                <h3 className="text-xl font-semibold text-red-800 mb-2">Hard</h3>
                <p className="text-red-600">Challenge yourself</p>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {getCurrentQuestions().map((question, questionIndex) => (
              <div key={questionIndex} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold flex-1">
                    Question {questionIndex + 1}: {question.question}
                  </h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowHint(showHint === questionIndex ? null : questionIndex)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <HelpCircle size={20} />
                    </button>
                    <button
                      onClick={() => setCurrentQuestionChat(currentQuestionChat === questionIndex ? null : questionIndex)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <MessageCircle size={20} />
                    </button>
                  </div>
                </div>

                {showHint === questionIndex && (
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-blue-800">{question.hint}</p>
                  </div>
                )}

                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                        answers[questionIndex] === optionIndex
                          ? 'bg-blue-100'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${questionIndex}`}
                        checked={answers[questionIndex] === optionIndex}
                        onChange={() => handleAnswerSelect(questionIndex, optionIndex)}
                        className="mr-3"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>

                {showResults && (
                  <div className="mt-4">
                    {answers[questionIndex] === question.correctAnswer ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle size={20} className="mr-2" />
                        <div>
                          <p className="font-semibold">Correct!</p>
                          <p>{question.justification}</p>
                          <p className="mt-2 text-sm">Study Tip: {question.studyTip}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <XCircle size={20} className="mr-2" />
                        <div>
                          <p className="font-semibold">
                            Incorrect. The correct answer is: {question.options[question.correctAnswer]}
                          </p>
                          <p>{question.justification}</p>
                          <p className="mt-2 text-sm">Study Tip: {question.studyTip}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {currentQuestionChat === questionIndex && (
                  <div className="mt-4 border-t pt-4">
                    <div className="mb-4 max-h-60 overflow-y-auto">
                      {chatMessages.map((msg, index) => (
                        <div
                          key={index}
                          className={`mb-2 ${
                            msg.role === 'user' ? 'text-right' : 'text-left'
                          }`}
                        >
                          <span
                            className={`inline-block p-2 rounded-lg ${
                              msg.role === 'user'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {msg.content}
                          </span>
                        </div>
                      ))}
                    </div>
                    <form onSubmit={handleChatSubmit} className="flex gap-2">
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask a question about this topic..."
                        className="flex-1 p-2 border rounded-lg"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                      >
                        Send
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))}

            {!showResults ? (
              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Submit Exam
              </button>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <h2 className="text-2xl font-semibold mb-4">
                  Your Score: {calculateScore()} out of {getCurrentQuestions().length}
                </h2>
                <button
                  onClick={() => setSelectedDifficulty('')}
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Try Another Difficulty
                </button>
              </div>
            )}
          </div>
        )}
        <div className="mt-4">
  <Link 
    to="/dashboard" 
    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
  >
    <ArrowLeft className="mr-2" size={20} />
    Return to Dashboard
  </Link>
</div>
        
      </div>
    </div>
  );
};

export default FinalExam;