import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { BookOpen, Brain, Heart, ArrowLeft, Info, Gamepad } from 'lucide-react';

const PersonalizedNotes: React.FC = () => {
  const location = useLocation();
  const params = useParams();
  const isInLesson = location.pathname.includes('/lesson/');
  const basePath = isInLesson ? `/learn/${params.module}/unit/${params.unit}/lesson/${params.lesson}` : '';

  const NotesContent = () => (
    <div className="space-y-8">
      {/* Understanding Emotions Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <Brain className="text-blue-600 mr-3" size={24} />
          <h3 className="text-xl font-semibold text-blue-800">Understanding Overwhelming Emotions</h3>
        </div>
        
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <p className="text-gray-700 leading-relaxed mb-4">
            Emotions are like waves in our daily life - sometimes gentle, sometimes strong. For children with autism, these emotional waves can feel especially intense. Think of your emotions like a colorful rainbow of feelings, each one unique and important. When emotions become overwhelming, it's like having too many colors mixing together at once, making it hard to see clearly.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Just as a rainbow appears under certain conditions, our overwhelming emotions often have specific triggers. Understanding these triggers is like becoming a weather forecaster for your feelings - it helps you prepare and respond better when emotional storms approach.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold text-blue-700 mb-2">Key Points to Remember:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Emotions can be simple or overwhelming</li>
              <li>It's normal for emotions to feel bigger sometimes</li>
              <li>Everyone experiences strong emotions</li>
              <li>Learning to manage emotions helps us stay calm</li>
            </ul>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold text-blue-700 mb-2">Common Triggers:</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-blue-50 p-2 rounded">😤 Frustration</div>
              <div className="bg-blue-50 p-2 rounded">😢 Disappointment</div>
              <div className="bg-blue-50 p-2 rounded">😰 Sensory Overload</div>
              <div className="bg-blue-50 p-2 rounded">😕 Schedule Changes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Body Signals Section */}
      <div className="bg-gradient-to-r from-pink-50 to-red-50 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <Heart className="text-pink-600 mr-3" size={24} />
          <h3 className="text-xl font-semibold text-pink-800">Body Signals Checklist</h3>
        </div>

        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <p className="text-gray-700 leading-relaxed mb-4">
            Your body is like a smart alarm system that sends you signals when emotions are building up. Just as a thermometer shows temperature, your body has ways of showing emotional temperature. Learning to read these signals early can help you take action before emotions become too intense.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Think of these body signals as your personal early warning system. When you notice these signs, it's like your body is giving you a gentle tap on the shoulder, saying "Hey, let's take care of these feelings before they get too big!"
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl mb-2">❤️</div>
            <h4 className="font-semibold text-pink-700">Heart Rate</h4>
            <p className="text-sm text-gray-600">Beating faster than usual?</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl mb-2">💪</div>
            <h4 className="font-semibold text-pink-700">Muscles</h4>
            <p className="text-sm text-gray-600">Feeling tight or tense?</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="text-2xl mb-2">🫁</div>
            <h4 className="font-semibold text-pink-700">Breathing</h4>
            <p className="text-sm text-gray-600">Quick and shallow?</p>
          </div>
        </div>
      </div>

      {/* Coping Strategies Section */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-lg">
        <div className="flex items-center mb-4">
          <BookOpen className="text-green-600 mr-3" size={24} />
          <h3 className="text-xl font-semibold text-green-800">My Calming Strategies</h3>
        </div>

        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <p className="text-gray-700 leading-relaxed mb-4">
            Calming strategies are like having a toolbox full of special tools to help you feel better. Just as different jobs need different tools, different emotional situations might need different calming strategies. The more you practice these strategies when you're feeling calm, the better they'll work when you really need them.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Deep breathing and grounding exercises are two powerful tools in your emotional toolbox. Deep breathing is like pressing a reset button for your body, while grounding helps anchor you to the present moment when emotions feel overwhelming.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold text-green-700 mb-2">Deep Breathing Exercise</h4>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="bg-green-50 p-2 rounded">
                <div>1️⃣</div>
                <div className="text-sm">Find quiet spot</div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <div>2️⃣</div>
                <div className="text-sm">Breathe in (4)</div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <div>3️⃣</div>
                <div className="text-sm">Hold (4)</div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <div>4️⃣</div>
                <div className="text-sm">Breathe out (4)</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold text-green-700 mb-2">5-4-3-2-1 Grounding</h4>
            <div className="grid grid-cols-5 gap-2 text-center">
              <div className="bg-green-50 p-2 rounded">
                <div>👀</div>
                <div className="text-sm">5 see</div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <div>👂</div>
                <div className="text-sm">4 hear</div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <div>✋</div>
                <div className="text-sm">3 feel</div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <div>👃</div>
                <div className="text-sm">2 smell</div>
              </div>
              <div className="bg-green-50 p-2 rounded">
                <div>👅</div>
                <div className="text-sm">1 taste</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Reference Cards */}
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <p className="text-gray-700 leading-relaxed">
            Having ready-to-use phrases and reminders is like carrying a map that helps you navigate through emotional moments. These phrases are like friendly helpers that can guide you when you're not sure what to say or do. Remember, using these tools shows wisdom and strength, not weakness.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-yellow-50 p-4 rounded-lg shadow">
            <h4 className="font-semibold text-yellow-800 mb-2">Helpful Phrases</h4>
            <ul className="space-y-2">
              <li className="bg-white p-2 rounded">"I need a break to calm down"</li>
              <li className="bg-white p-2 rounded">"Can you help me? I'm feeling overwhelmed"</li>
              <li className="bg-white p-2 rounded">"I need some quiet time"</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg shadow">
            <h4 className="font-semibold text-purple-800 mb-2">Remember</h4>
            <ul className="space-y-2">
              <li className="bg-white p-2 rounded">It's okay to feel strong emotions</li>
              <li className="bg-white p-2 rounded">Asking for help shows strength</li>
              <li className="bg-white p-2 rounded">You have tools to feel better</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg relative">
      <Link 
        to="/games" 
        className="absolute top-6 right-6 inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-md"
      >
        <Gamepad className="mr-2" size={20} />
        Play Learning Games
      </Link>
      <h2 className="text-2xl font-semibold text-blue-800 mb-6">Aarsh's Personalized/Generated Study Notes</h2>
      <NotesContent />
    </div>
  );
};

export default PersonalizedNotes;