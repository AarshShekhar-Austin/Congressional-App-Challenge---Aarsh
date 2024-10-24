import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, Edit, PlayCircle, CheckCircle, Brain, Video, VideoOff, HelpCircle, Mic, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';

const sections = [
  { id: 'tutor', name: 'AI Interactive Tutor', icon: Brain },
  { id: 'textbook', name: 'Textbook Analysis', icon: BookOpen },
  { id: 'notes', name: 'Personalized Notes', icon: Edit },
  { id: 'activity', name: 'Engaging Activity', icon: PlayCircle },
  { id: 'test', name: 'Final Exam', icon: CheckCircle },
];

const tutorScript = [
  "Hi there, Aarsh! I'm so glad to see you today. We're going to talk about something very important—what happens when we feel really big emotions. Do you ever feel that way sometimes?",
  "It's okay if you do, and it's okay if you don't. Everyone feels big emotions sometimes. Today, we're going to learn how to recognize when our emotions feel really big or overwhelming. Does that sound good to you, Aarsh?",
  "Let’s think about a time when you might feel upset or frustrated. Hmm, how about when something doesn’t go the way you want? Maybe when a toy doesn’t work, or when you’re having trouble with a game. Can you think of a time when you felt really frustrated or upset, Aarsh?",
  "Great job, Aarsh! Let’s imagine you’re building something with blocks, and suddenly the blocks fall over. That can be frustrating, right? How do you think you’d feel if that happened?",
  "Yes, that sounds like it could make someone feel really upset or even angry. Sometimes when we feel those big emotions, our body gives us little clues. Aarsh, do you ever notice anything happening in your body when you feel really upset?",
  "That’s right, Aarsh! When we feel really upset or overwhelmed, our body can start to feel different. Sometimes our heart beats fast, our tummy feels funny, or our hands might even shake. Have you ever felt that before?",
  "Those are clues from your body telling you, ‘Hey, I’m feeling really big emotions right now!’ When you start noticing those clues, you can say, ‘I think I’m feeling really upset right now.’ Let’s try that together, Aarsh. Can you say it with me: ‘I think I’m feeling really upset right now.",
  "Great job, Aarsh! Now that you know how to recognize when your emotions are getting big, let’s learn what to do when that happens. One thing that really helps is to take slow, deep breaths. Want to try it with me?",
  "Okay, ready? Take a slow breath in through your nose, like this",
  "Now, breathe out slowly through your mouth",
  "Let’s do that two more times, Aarsh. Ready? Breathe in… and breathe out… Great! How do you feel? Do you feel a little bit calmer?",
  "You did an amazing job calming down, Aarsh! Now, let’s think back to that situation with the blocks falling over. Remember how we were feeling really upset? What’s the first thing we can do when we notice we’re feeling upset?",
  "Yes! We can say, ‘I think I’m feeling really upset right now.’ And what’s the next thing we can do to help ourselves feel better?",
  "That’s right, Aarsh! We can take those deep breaths to calm down. Do you think taking deep breaths could help the next time you feel really upset?",
  "You did such a great job today, Aarsh! Now, you know how to recognize when your emotions are feeling really big, and you have a great tool—deep breathing—to help you feel better. Remember, it’s okay to feel upset sometimes. What’s important is knowing how to help yourself feel calm. Are you ready to practice this the next time you feel really big emotions?",
  "Wonderful, Aarsh! I’m so proud of you. Anytime you feel those big emotions, remember to notice how your body feels and take your calming breaths. You’re doing amazing! I’ll see you next time, and we can keep practicing together. Bye for now!",
  
];

const textbookContent = [
  {
    title: "Understanding and Recognizing Overwhelming Emotions",
    content: `
      <div class="space-y-6">
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-blue-800 mb-4">What Are Overwhelming Emotions?</h2>
          <div class="flex items-center gap-6 mb-4">
            <div class="flex-1">
              <p class="mb-4">Emotions are feelings we experience every day. They can be simple, like feeling happy when we're playing or sad when we lose a toy. But sometimes, emotions can feel really big and hard to control. These are called overwhelming emotions. They are so strong that they can make it difficult to think clearly, focus, or act calmly.</p>
              <p class="bg-yellow-100 p-2 rounded mb-4">Everyone experiences overwhelming emotions at times, but for children who are autistic, these emotions can feel even bigger and harder to understand.</p>
            </div>
            <img src="https://images.unsplash.com/photo-1590650153855-d9e808231d41" alt="Child expressing emotions" class="w-1/3 rounded-lg shadow-lg"/>
          </div>
        </div>

        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-blue-800 mb-4">What Causes Overwhelming Emotions?</h2>
          <div class="grid grid-cols-2 gap-6 mb-4">
            <div class="bg-white p-4 rounded-lg shadow">
              <h3 class="font-semibold text-blue-700 mb-2">Frustration</h3>
              <p>This can happen when something doesn't go the way you expected, or you can't figure something out.</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
              <h3 class="font-semibold text-blue-700 mb-2">Disappointment</h3>
              <p>This is when you feel let down, like when a plan doesn't work out or when someone cancels something you were excited about.</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
              <h3 class="font-semibold text-blue-700 mb-2">Sensory Overload</h3>
              <p>For many autistic children, bright lights, loud noises, or busy environments can feel like too much.</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow">
              <h3 class="font-semibold text-blue-700 mb-2">Changes in Routine</h3>
              <p>If something unexpected happens, like a change in schedule, it can cause feelings of confusion, frustration, or anxiety.</p>
            </div>
          </div>
          <p class="bg-yellow-100 p-2 rounded">Understanding what causes your overwhelming emotions is helpful. Once you know why you're feeling a certain way, you can start to use tools to calm down.</p>
        </div>

        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-blue-800 mb-4">How Does the Body React to Overwhelming Emotions?</h2>
          <div class="flex items-center gap-6">
            <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd" alt="Body reactions" class="w-1/3 rounded-lg shadow-lg"/>
            <div class="flex-1">
              <div class="space-y-3">
                <div class="bg-white p-3 rounded-lg shadow">
                  <span class="font-semibold text-blue-700">Increased Heart Rate:</span> When you're feeling scared, angry, or anxious, your heart might start beating faster.
                </div>
                <div class="bg-white p-3 rounded-lg shadow">
                  <span class="font-semibold text-blue-700">Muscle Tightness:</span> You might notice your shoulders, neck, or arms feel tense or tight.
                </div>
                <div class="bg-white p-3 rounded-lg shadow">
                  <span class="font-semibold text-blue-700">Short Breathing:</span> Your breathing may become shallow or faster when emotions are intense.
                </div>
                <div class="bg-white p-3 rounded-lg shadow">
                  <span class="font-semibold text-blue-700">Feeling Hot or Sweaty:</span> Sometimes, when we feel overwhelmed, we might get sweaty or feel hot.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    title: "Naming and Understanding Emotions",
    content: `
      <div class="space-y-6">
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-blue-800 mb-4">Why Is It Important to Name Your Emotions?</h2>
          <div class="flex items-center gap-6">
            <div class="flex-1">
              <p class="mb-4">After you've noticed that you're feeling overwhelmed, the next thing to do is give that emotion a name. Naming your emotion helps you make sense of it.</p>
              <p class="bg-yellow-100 p-2 rounded mb-4">When you know what you're feeling, it's easier to figure out what to do next.</p>
            </div>
            <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b" alt="Naming emotions" class="w-1/3 rounded-lg shadow-lg"/>
          </div>
        </div>

        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-blue-800 mb-4">How Can You Practice Naming Emotions?</h2>
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="bg-white p-4 rounded-lg shadow text-center">
              <div class="text-3xl mb-2">🤔</div>
              <h3 class="font-semibold text-blue-700 mb-2">Pause and Think</h3>
              <p class="text-sm">Take a moment to stop and think about what's happening.</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow text-center">
              <div class="text-3xl mb-2">🔍</div>
              <h3 class="font-semibold text-blue-700 mb-2">Notice Triggers</h3>
              <p class="text-sm">What happened before the feeling came?</p>
            </div>
            <div class="bg-white p-4 rounded-lg shadow text-center">
              <div class="text-3xl mb-2">💭</div>
              <h3 class="font-semibold text-blue-700 mb-2">Express Yourself</h3>
              <p class="text-sm">Use words to explain how you feel.</p>
            </div>
          </div>
        </div>

        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-blue-800 mb-4">Expanding Your Emotional Vocabulary</h2>
          <div class="flex items-center gap-6">
            <img src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88" alt="Emotional vocabulary" class="w-1/3 rounded-lg shadow-lg"/>
            <div class="flex-1">
              <p class="bg-yellow-100 p-2 rounded mb-4">Being able to name more than just basic emotions like "happy" or "sad" is very helpful.</p>
              <div class="space-y-3">
                <div class="bg-white p-3 rounded-lg shadow">
                  <span class="font-semibold text-blue-700">Frustration:</span> When you try hard but things aren't working out.
                </div>
                <div class="bg-white p-3 rounded-lg shadow">
                  <span class="font-semibold text-blue-700">Anxiety:</span> Feeling nervous or worried about what might happen.
                </div>
                <div class="bg-white p-3 rounded-lg shadow">
                  <span class="font-semibold text-blue-700">Disappointment:</span> When things don't happen the way you hoped.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },
  {
    title: "Strategies for Managing Overwhelming Emotions",
    content: `
      <div class="space-y-6">
        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-blue-800 mb-4">Deep Breathing: The Power of Slowing Down</h2>
          <div class="flex items-center gap-6">
            <div class="flex-1">
              <p class="bg-yellow-100 p-2 rounded mb-4">When your emotions are feeling too big, one of the best strategies to help calm down is deep breathing.</p>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-white p-4 rounded-lg shadow">
                  <h3 class="font-semibold text-blue-700 mb-2">Step 1: Find a Quiet Spot</h3>
                  <p>Go somewhere quiet where you can focus.</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow">
                  <h3 class="font-semibold text-blue-700 mb-2">Step 2: Breathe In</h3>
                  <p>Count to four as you breathe in through your nose.</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow">
                  <h3 class="font-semibold text-blue-700 mb-2">Step 3: Hold</h3>
                  <p>Hold your breath for a count of four.</p>
                </div>
                <div class="bg-white p-4 rounded-lg shadow">
                  <h3 class="font-semibold text-blue-700 mb-2">Step 4: Breathe Out</h3>
                  <p>Slowly breathe out through your mouth for four counts.</p>
                </div>
              </div>
            </div>
            <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773" alt="Deep breathing" class="w-1/3 rounded-lg shadow-lg"/>
          </div>
        </div>

        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-blue-800 mb-4">Grounding Techniques: Using Your Senses</h2>
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <div class="grid grid-cols-5 gap-4">
              <div class="text-center">
                <div class="text-3xl mb-2">👀</div>
                <h3 class="font-semibold text-blue-700">See</h3>
                <p class="text-sm">5 things</p>
              </div>
              <div class="text-center">
                <div class="text-3xl mb-2">👂</div>
                <h3 class="font-semibold text-blue-700">Hear</h3>
                <p class="text-sm">4 things</p>
              </div>
              <div class="text-center">
                <div class="text-3xl mb-2">✋</div>
                <h3 class="font-semibold text-blue-700">Touch</h3>
                <p class="text-sm">3 things</p>
              </div>
              <div class="text-center">
                <div class="text-3xl mb-2">👃</div>
                <h3 class="font-semibold text-blue-700">Smell</h3>
                <p class="text-sm">2 things</p>
              </div>
              <div class="text-center">
                <div class="text-3xl mb-2">👅</div>
                <h3 class="font-semibold text-blue-700">Taste</h3>
                <p class="text-sm">1 thing</p>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-8">
          <h2 class="text-2xl font-semibold text-blue-800 mb-4">Asking for Help</h2>
          <div class="flex items-center gap-6">
            <img src="https://images.unsplash.com/photo-1516534775068-ba3e7458af70" alt="Asking for help" class="w-1/3 rounded-lg shadow-lg"/>
            <div class="flex-1">
              <p class="bg-yellow-100 p-2 rounded mb-4">Asking for help is not a sign of weakness. It's a smart way to manage big emotions and get the support you need.</p>
              <div class="space-y-3">
                <div class="bg-white p-3 rounded-lg shadow">
                  "I'm feeling really upset, and I don't know what to do. Can you help me?"
                </div>
                <div class="bg-white p-3 rounded-lg shadow">
                  "My emotions are getting too big, and I need a break."
                </div>
                <div class="bg-white p-3 rounded-lg shadow">
                  "I think I need some time to calm down."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  }
  
];

const progressQuizQuestions = [
  {
    question: "What are overwhelming emotions?",
    options: [
      "Simple feelings we have every day",
      "Emotions that are easy to control",
      "Strong feelings that make it hard to think clearly or act calmly",
      "Emotions that only happy people have"
    ],
    correctAnswer: 2
  },
  {
    question: "Which of these is NOT a common cause of overwhelming emotions?",
    options: [
      "Frustration",
      "Disappointment",
      "Sensory overload",
      "Eating ice cream"
    ],
    correctAnswer: 3
  },
  {
    question: "What is one physical sign that you might be experiencing overwhelming emotions?",
    options: [
      "Increased heart rate",
      "Growing taller",
      "Feeling very cold",
      "Sudden ability to fly"
    ],
    correctAnswer: 0
  },
  {
    question: "Why is it important to name your emotions?",
    options: [
      "It makes the emotions go away instantly",
      "It helps you understand what you're feeling and find solutions",
      "It turns all emotions into happy ones",
      "It's not important to name emotions"
    ],
    correctAnswer: 1
  },
  {
    question: "What is a good strategy for managing overwhelming emotions?",
    options: [
      "Ignoring the feeling",
      "Yelling at others",
      "Deep breathing exercises",
      "Eating lots of candy"
    ],
    correctAnswer: 2
  },
  {
    question: "How many things should you try to see during the grounding exercise?",
    options: ["1", "3", "4", "5"],
    correctAnswer: 3
  },
  {
    question: "What should you do first when practicing deep breathing?",
    options: [
      "Start counting backward",
      "Find a quiet spot",
      "Call a friend",
      "Run around"
    ],
    correctAnswer: 1
  },
  {
    question: "Which is a good way to ask for help?",
    options: [
      "Pretend everything is fine",
      "Keep it to yourself",
      "Say 'I'm feeling upset, can you help me?'",
      "Get angry at others"
    ],
    correctAnswer: 2
  }
];

const LessonPage: React.FC = () => {
  const { module, unit, lesson } = useParams<{ module: string; unit: string; lesson: string }>();
  const [activeSection, setActiveSection] = useState('tutor');
  const [transcript, setTranscript] = useState<string[]>([]);
  const [userNotes, setUserNotes] = useState('');
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isTutorSpeaking, setIsTutorSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentScriptIndex, setCurrentScriptIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>(new Array(progressQuizQuestions.length).fill(-1));
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string }[]>([
    { role: 'assistant', content: 'Welcome Aarsh! Please let me know if you have any questions!' }
  ]);
  const [userMessage, setUserMessage] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    speechSynthesisRef.current = window.speechSynthesis;
    return () => {
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, []);

  useEffect(() => {
    if (activeSection === 'tutor') {
      startWebcam();
    } else {
      stopWebcam();
      stopTutorSpeech();
    }
  }, [activeSection]);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    if (videoRef.current && videoRef.current.srcObject) {
      const videoTrack = (videoRef.current.srcObject as MediaStream)
        .getVideoTracks()[0];
      videoTrack.enabled = !isVideoOn;
    }
  };

  const stopTutorSpeech = () => {
    if (speechSynthesisRef.current) {
      speechSynthesisRef.current.cancel();
    }
    setIsTutorSpeaking(false);
  };

  const speakTutorScript = async () => {
    setIsTutorSpeaking(true);
    for (let i = currentScriptIndex; i < tutorScript.length; i++) {
      if (isPaused) {
        setCurrentScriptIndex(i);
        return;
      }
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          if (speechSynthesisRef.current && !isPaused) {
            utteranceRef.current = new SpeechSynthesisUtterance(tutorScript[i]);
            utteranceRef.current.voice = speechSynthesisRef.current.getVoices().find(voice => voice.name === 'Google UK English Male') || null;
            utteranceRef.current.rate = 1.2;
            utteranceRef.current.pitch = 1.1;
            speechSynthesisRef.current.speak(utteranceRef.current);
            setTranscript(prev => [...prev, tutorScript[i]]);
            utteranceRef.current.onend = () => {
              setIsTutorSpeaking(false);
              setTimeout(() => {
                if (!isPaused) {
                  setIsTutorSpeaking(true);
                  resolve();
                }
              }, 7000); // Changed to 7 seconds
            };
          } else {
            resolve();
          }
        }, 100);
      });
    }
    setIsTutorSpeaking(false);
    setCurrentScriptIndex(0);
  };

  const handleUserNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNotes = e.target.value;
    setUserNotes(newNotes);
    if (newNotes.trim() === "Hey! My Name is Aarsh, and I am ready to start today!" && !isTutorSpeaking) {
      speakTutorScript();
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      speakTutorScript();
    } else {
      stopTutorSpeech();
    }
  };

  const handleSectionChange = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId !== 'tutor') {
      stopTutorSpeech();
    }
  };

  const handleQuizAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...quizAnswers];
    newAnswers[questionIndex] = answerIndex;
    setQuizAnswers(newAnswers);
  };

  const submitQuiz = () => {
    setShowQuizResults(true);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userMessage.trim()) {
      setChatMessages([...chatMessages, { role: 'user', content: userMessage }]);
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `You asked: "${userMessage}". This is where the AI's response would go.` 
        }]);
      }, 1000);
      setUserMessage('');
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'tutor':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-6">AI Interactive Tutor</h3>
            <div className="flex space-x-6 mb-6">
              <div className="w-1/2 aspect-[4/3] bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg overflow-hidden shadow-inner relative flex items-center justify-center">
                <img
                  src="https://s4.ezgif.com/tmp/ezgif-4-5783755ad5.gif"
                  alt="AI Tutor"
                  className="w-full h-full object-contain"
                />
                {isTutorSpeaking && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-full animate-pulse">
                    <Mic size={20} />
                  </div>
                )}
              </div>
              <div className="w-1/2 aspect-[4/3] bg-gray-200 rounded-lg relative overflow-hidden shadow-inner">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className={`w-full h-full object-cover ${isVideoOn ? '' : 'hidden'}`}
                />
                {!isVideoOn && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <VideoOff size={48} className="text-gray-400" />
                  </div>
                )}
                <button
                  onClick={toggleVideo}
                  className="absolute bottom-2 right-2 bg-gray-800 text-white p-2 rounded-full"
                >
                  {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
                </button>
                <button
                  onClick={togglePause}
                  className="absolute top-2 left-2 bg-gray-800 text-white p-2 rounded-full"
                >
                  {isPaused ? <Play size={20} /> : <Pause size={20} />}
                </button>
                {!isTutorSpeaking && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full animate-pulse">
                    <Mic size={20} />
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-6">
              <div className="w-1/2 bg-gray-100 p-4 rounded-lg h-48 overflow-y-auto shadow-inner">
                <h4 className="font-semibold mb-2">Transcript</h4>
                <div className="space-y-2">
                  {transcript.map((message, index) => (
                    <div key={index} className="p-2 bg-white rounded-md shadow-sm transition-all duration-300 hover:shadow-md">
                      <p className="text-sm text-gray-700">{message}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-1/2 bg-gray-100 p-4 rounded-lg h-48 shadow-inner">
                <h4 className="font-semibold mb-2">Your Notes</h4>
                <textarea
                  className="w-full h-36 p-2 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  value={userNotes}
                  onChange={handleUserNotes}
                  placeholder="Type your notes here..."
                />
              </div>
            </div>
          </div>
        );
      case 'textbook':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Textbook Analysis</h3>
            <div className="flex">
              <div className="w-3/4 pr-6">
                <div className="mb-4 flex justify-between items-center">
                  <button
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
                    disabled={currentPage === 0}
                  >
                    <ChevronLeft size={20} className="mr-2" />
                    Previous
                  </button>
                  <span className="text-gray-600">Page {currentPage + 1} of {textbookContent.length}</span>
                  <button
                    onClick={() => setCurrentPage(Math.min(textbookContent.length - 1, currentPage + 1))}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
                    disabled={currentPage === textbookContent.length - 1}
                  >
                    Next
                    <ChevronRight size={20} className="ml-2" />
                  </button>
                </div>
                <div className="bg-gray-100 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">{textbookContent[currentPage].title}</h2>
                  <div dangerouslySetInnerHTML={{ __html: textbookContent[currentPage].content }} />
                </div>
              </div>
              <div className="w-1/4">
                <div className="bg-gray-100 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold mb-2">Chat with AI</h4>
                  <div className="h-64 overflow-y-auto mb-2 bg-white p-2 rounded">
                    {chatMessages.map((msg, index) => (
                      <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                        <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                          {msg.content}
                        </span>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleChatSubmit} className="flex">
                    <input
                      type="text"
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      placeholder="Ask a question..."
                      className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2rounded-r-md">Send</button>
                  </form>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Progress Quiz</h4>
                  {progressQuizQuestions.map((question, index) => (
                    <div key={index} className="mb-4">
                      <p className="font-medium mb-2">{question.question}</p>
                      {question.options.map((option, optionIndex) => (
                        <label key={optionIndex} className="flex items-center mb-1">
                          <input
                            type="radio"
                            name={`question-${index}`}
                            value={optionIndex}
                            checked={quizAnswers[index] === optionIndex}
                            onChange={() => handleQuizAnswer(index, optionIndex)}
                            className="mr-2"
                          />
                          <span className={showQuizResults ? (optionIndex === question.correctAnswer ? 'text-green-600 font-semibold' : quizAnswers[index] === optionIndex ? 'text-red-600' : '') : ''}>
                            {option}
                          </span>
                        </label>
                      ))}
                      {showQuizResults && (
                        <p className="text-sm mt-1">
                          {quizAnswers[index] === question.correctAnswer ? (
                            <span className="text-green-600">Correct!</span>
                          ) : (
                            <span className="text-red-600">Incorrect. The correct answer is: {question.options[question.correctAnswer]}</span>
                          )}
                        </p>
                      )}
                    </div>
                  ))}
                  {!showQuizResults && (
                    <button onClick={submitQuiz} className="bg-green-500 text-white px-4 py-2 rounded-md w-full">
                      Submit Quiz
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 'notes':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Personalized Notes</h3>
            <p>Here are your personalized notes on recognizing overwhelming emotions:</p>
          </div>
        );
      case 'activity':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Engaging Activity</h3>
            <p>Let's play a game to practice recognizing overwhelming emotions!</p>
          </div>
        );
      case 'test':
        return (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Final Exam</h3>
            <p>Test your knowledge on recognizing overwhelming emotions:</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 flex p-4">
      {/* Vertical Sidebar */}
      <div className="w-64 bg-white shadow-lg rounded-lg p-4 mr-4 self-start sticky top-4">
        <ul className="space-y-2">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => handleSectionChange(section.id)}
                className={`w-full flex items-center p-2 rounded-md ${
                  activeSection === section.id
                    ? 'bg-pink-500 text-white'
                    : 'text-gray-600 hover:bg-pink-100'
                }`}
              >
                <section.icon className="mr-2" size={18} />
                {section.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1">
        {renderSectionContent()}
      </div>
    </div>
  );
};

export default LessonPage;