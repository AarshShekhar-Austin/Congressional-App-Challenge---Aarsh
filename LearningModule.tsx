import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, BookOpen, Star, ChevronDown, ChevronUp, CheckCircle, Circle } from 'lucide-react';

const modules = {
  'emotional-reading': {
    title: 'Emotional Reading & Intelligence',
    icon: Heart,
    color: 'pink',
    progress: 35,
    units: [
      {
        title: "Understanding Basic Emotions",
        topics: [
          { name: "Recognizing facial expressions", status: "mastered" },
          { name: "Matching emotions to situations", status: "mastered" },
          { name: "Using visuals to interpret emotions", status: "proficient" },
          { name: "Identifying emotions in stories", status: "familiar" },
          { name: "Exploring emotion intensity", status: "attempted" }
        ],
        description: "Children will learn to identify basic emotions (happy, sad, angry, scared) through facial cues, understand how different emotions relate to common scenarios, and use picture cards and drawings to connect emotions to visual representations.",
        progress: 80,
        image: "https://lifealteringstemcells.com/wp-content/uploads/2023/11/Stem-Cell-Therapy-Autism.jpg"
      },
      {
        title: "Exploring Emotional Vocabulary",
        topics: [
          { name: "Learning words for emotions", status: "mastered" },
          { name: "Associating words with feelings", status: "proficient" },
          { name: "Expressing emotions using words", status: "familiar" },
          { name: "Creating an emotion dictionary", status: "not-started" }
        ],
        description: "Expanding emotional vocabulary beyond basic emotions, including terms like excited, nervous, and frustrated. Practice connecting the right emotion with the correct situation through interactive exercises and encourage verbal expression of feelings.",
        progress: 60,
        image: "https://st4.depositphotos.com/2249091/19612/i/450/depositphotos_196122694-stock-photo-mother-autistic-child-holding-drawing.jpg"
      },
      {
        title: "Emotional Regulation Strategies",
        topics: [
          { name: "Recognizing overwhelming emotions", status: "proficient" },
          { name: "Simple coping strategies", status: "familiar" },
          { name: "Managing big emotions in real time", status: "attempted" },
          { name: "Creating a calm-down toolkit", status: "not-started" },
          { name: "Practicing mindfulness for kids", status: "not-started" },
          { name: "Understanding the body's response to emotions", status: "not-started" }
        ],
        description: "Teach children to notice signs of stress, frustration, or anxiety in themselves. Introduce deep breathing, counting, and other calming methods for emotional regulation. Practice exercises that help control strong emotions during a task or interaction.",
        progress: 40,
        image: "https://i.dailymail.co.uk/1s/2024/04/02/11/83144279-13262707-image-a-3_1712054336451.jpg"
      },
      {
        title: "Empathy and Understanding Others' Emotions",
        topics: [
          { name: "Understanding others' perspectives", status: "familiar" },
          { name: "Practicing empathetic responses", status: "attempted" },
          { name: "Role-playing to foster empathy", status: "not-started" },
          { name: "Recognizing emotions in others", status: "not-started" },
          { name: "Developing active listening skills", status: "not-started" }
        ],
        description: "Introduce how to recognize and consider what others may be feeling in various scenarios. Teach children how to respond appropriately when someone else is feeling sad, happy, or frustrated. Engage in simple role-playing exercises to practice showing empathy and supportive behaviors.",
        progress: 25,
        image: "https://mebefamily.com/wp-content/uploads/Explaining-Autism-to-Family.jpg"
      },
      {
        title: "Combining Emotions and Social Interaction",
        topics: [
          { name: "Using emotions in conversation", status: "attempted" },
          { name: "Understanding social cues", status: "not-started" },
          { name: "Responding appropriately in social scenarios", status: "not-started" },
          { name: "Practicing emotional intelligence in group settings", status: "not-started" },
          { name: "Recognizing cultural differences in emotional expression", status: "not-started" }
        ],
        description: "Practice using emotion-based words in simple conversational settings. Teach children to interpret body language, tone of voice, and facial expressions in social contexts. Develop appropriate social responses based on emotional and environmental cues.",
        progress: 15,
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Recognizing and Handling Social Conflict",
        topics: [
          { name: "Identifying emotional triggers in conflicts", status: "not-started" },
          { name: "Conflict resolution strategies", status: "not-started" },
          { name: "Role-playing conflict scenarios", status: "not-started" },
          { name: "Learning to compromise", status: "not-started" },
          { name: "Practicing assertiveness", status: "not-started" }
        ],
        description: "Teach children how to recognize situations that may lead to emotional disagreements or frustration. Introduce simple strategies like taking turns, asking for help, or calmly explaining feelings to resolve conflicts. Engage in guided role-playing exercises where children practice handling conflicts in a calm and controlled manner.",
        progress: 0,
        image: "https://help4psychology.co.uk/wp-content/uploads/2019/12/iStock-999105220-1-1170x780.jpg"
      },
      {
        title: "Emotional Self-Awareness",
        topics: [
          { name: "Recognizing personal emotions in different situations", status: "not-started" },
          { name: "Understanding emotional triggers", status: "not-started" },
          { name: "Tracking emotions over time", status: "not-started" },
          { name: "Developing emotional self-reflection skills", status: "not-started" },
          { name: "Creating personal emotional growth plans", status: "not-started" }
        ],
        description: "Help children become aware of how they feel during specific tasks or when interacting with others. Identify specific triggers that may lead to certain emotions like frustration, anger, or joy. Teach children to notice patterns in their emotions, such as when they feel happy or upset, and how to navigate those patterns positively.",
        progress: 0,
        image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
      },
      {
        title: "Advanced Emotional Communication",
        topics: [
          { name: "Expressing complex emotions", status: "not-started" },
          { name: "Handling misunderstandings", status: "not-started" },
          { name: "Non-verbal emotional expression", status: "not-started" },
          { name: "Using metaphors to describe emotions", status: "not-started" },
          { name: "Emotional storytelling", status: "not-started" }
        ],
        description: "Encourage children to articulate more complex emotions such as disappointment, pride, or confusion. Practice clarifying feelings when someone else misunderstands their emotional expression. Teach children to recognize how body language, gestures, and tone of voice can be used to convey emotions effectively.",
        progress: 0,
        image: "https://images.unsplash.com/photo-1516534775068-ba3e7458af70?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
      }
    ]
  },
  // ... (other modules remain unchanged)
};

const LearningModule: React.FC = () => {
  const { module } = useParams<{ module: string }>();
  const [expandedUnit, setExpandedUnit] = useState<number | null>(null);
  const navigate = useNavigate();

  const currentModule = modules[module as keyof typeof modules];

  if (!currentModule) {
    return <div>Module not found</div>;
  }

  const { title, icon: Icon, color, units, progress: moduleProgress } = currentModule;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'mastered':
        return <CheckCircle className="text-purple-600" size={16} />;
      case 'proficient':
        return <Circle className="text-blue-500" size={16} />;
      case 'familiar':
        return <Circle className="text-orange-500" size={16} />;
      case 'attempted':
        return <Circle className="text-red-500 stroke-2" size={16} />;
      default:
        return <Circle className="text-gray-300" size={16} />;
    }
  };

  const handleContinueUnit = (unitIndex: number, topicIndex: number) => {
    navigate(`/learn/${module}/unit/${unitIndex + 1}/lesson/${topicIndex + 1}`);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-${color}-100 to-purple-100`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <Link to="/dashboard" className="flex items-center text-purple-600 hover:text-purple-800">
            <ArrowLeft className="mr-2" size={20} />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-purple-800">{title}</h1>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Icon className={`text-${color}-500 mr-2`} size={24} />
              <h2 className="text-2xl font-semibold text-purple-800">Course Overview</h2>
            </div>
            <div className="text-purple-600">
              <span className="font-semibold">{units.length} Units</span> • <span className="font-semibold">{units.reduce((acc, unit) => acc + unit.topics.length, 0)} Topics</span>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            This course is designed to help children aged 2-10 develop emotional intelligence and improve their ability to recognize, understand, and manage emotions in themselves and others.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Course Progress: {moduleProgress}%</h3>
            <div className="grid gap-2">
              {units.map((unit, unitIndex) => (
                <div key={unitIndex} className="flex items-center">
                  <span className="w-8 text-sm font-medium text-gray-500">Unit {unitIndex + 1}</span>
                  <div className="flex-1 grid grid-cols-10 gap-1">
                    {unit.topics.map((topic, topicIndex) => (
                      <div
                        key={topicIndex}
                        className={`w-full h-6 rounded flex items-center justify-center ${
                          topic.status === 'mastered' ? 'bg-purple-600' :
                          topic.status === 'proficient' ? 'bg-blue-500' :
                          topic.status === 'familiar' ? 'bg-orange-500' :
                          topic.status === 'attempted' ? 'bg-red-500' :
                          'bg-gray-300'
                        }`}
                      >
                        {topic.status === 'mastered' && <CheckCircle className="text-white" size={12} />}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-600 rounded mr-2"></div>
                <span>Mastered</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                <span>Proficient</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
                <span>Familiar</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
                <span>Attempted</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
                <span>Not started</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {units.map((unit, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div 
                className="flex items-center justify-between p-6 cursor-pointer"
                onClick={() => setExpandedUnit(expandedUnit === index ? null : index)}
              >
                <div className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${expandedUnit === index ? `bg-${color}-500 text-white` : `bg-${color}-100 text-${color}-500`}`}>
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-purple-800 ml-4">{unit.title}</h3>
                </div>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-4">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${unit.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-purple-600 mr-2">{unit.topics.length} topics</span>
                  {expandedUnit === index ? (
                    <ChevronUp size={20} className={`text-${color}-500`} />
                  ) : (
                    <ChevronDown size={20} className={`text-${color}-500`} />
                  )}
                </div>
              </div>
              {expandedUnit === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-600 mb-4">{unit.description}</p>
                  {unit.image && (
                    <img src={unit.image} alt={unit.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                  )}
                  <h4 className="font-semibold text-purple-700 mb-2">Topics:</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {unit.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center">
                        {getStatusIcon(topic.status)}
                        <span className="ml-2 text-gray-600">{topic.name}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`mt-4 bg-${color}-500 text-white px-4 py-2 rounded-full hover:bg-${color}-600 transition duration-300`}
                    onClick={() => handleContinueUnit(index, 0)}
                  >
                    {unit.progress > 0 ? 'Continue Unit' : 'Start Unit'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-purple-800">Course Challenge</h2>
            <Star className="text-yellow-500" size={24} />
          </div>
          <p className="text-gray-600 mb-4">Test your knowledge of the skills in this course.</p>
          <button className={`bg-${color}-500 text-white px-6 py-2 rounded-full hover:bg-${color}-600 transition duration-300`}>
            Start Course Challenge
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningModule;