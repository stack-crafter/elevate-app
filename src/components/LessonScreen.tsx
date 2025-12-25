import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { ArrowLeft, ArrowRight, Play, Target, ChevronDown } from 'lucide-react';

interface LessonScreenProps {
  selectedLanguage: string | null;
  selectedModule: string | null;
  selectedLesson: string | null;
  onLessonSelect: (lessonId: string) => void;
  onBack: () => void;
}

// Mock lesson data
const mockLessons = {
  'java-1': [
    {
      id: '1',
      title: 'Introduction to Java',
      goal: 'Understand what Java is and write your first program',
      content: `
        <h3>What is Java?</h3>
        <p>Java is a high-level, object-oriented programming language developed by Sun Microsystems (now owned by Oracle) in 1995. It's designed to be platform-independent, meaning code written in Java can run on any device that has the Java Virtual Machine (JVM) installed.</p>
        
        <h3>Key Features of Java:</h3>
        <ul>
          <li><strong>Platform Independent:</strong> "Write once, run anywhere"</li>
          <li><strong>Object-Oriented:</strong> Everything in Java is an object</li>
          <li><strong>Secure:</strong> Built-in security features</li>
          <li><strong>Robust:</strong> Strong memory management</li>
        </ul>

        <h3>Your First Java Program</h3>
        <p>Let's start with the classic "Hello, World!" program. This program will display the text "Hello, World!" on the screen.</p>

        <h3>Understanding the Code:</h3>
        <ul>
          <li><code>public class HelloWorld</code> - Defines a class named HelloWorld</li>
          <li><code>public static void main(String[] args)</code> - The main method where program execution begins</li>
          <li><code>System.out.println()</code> - Prints text to the console</li>
        </ul>
      `,
      completed: true
    },
    {
      id: '2',
      title: 'Variables and Data Types',
      goal: 'Learn about different data types and how to declare variables',
      content: `
        <h3>Variables in Java</h3>
        <p>A variable is a container that holds data that can be changed during program execution. In Java, every variable must be declared with a specific data type.</p>
        
        <h3>Primitive Data Types:</h3>
        <ul>
          <li><strong>int:</strong> Integer numbers (e.g., 42, -15)</li>
          <li><strong>double:</strong> Decimal numbers (e.g., 3.14, -2.5)</li>
          <li><strong>boolean:</strong> True or false values</li>
          <li><strong>char:</strong> Single characters (e.g., 'A', '5')</li>
          <li><strong>String:</strong> Text (e.g., "Hello World")</li>
        </ul>

        <h3>Variable Declaration:</h3>
        <p>To declare a variable, you specify the data type followed by the variable name:</p>
        <pre>int age = 25;
double price = 19.99;
String name = "Alice";
boolean isStudent = true;</pre>

        <h3>Try It Yourself!</h3>
        <p>In the code editor, try declaring different types of variables and printing their values.</p>
      `,
      completed: true
    }
  ],
  'python-1': [
    {
      id: '1',
      title: 'Getting Started with Python',
      goal: 'Learn Python basics and write your first program',
      content: `
        <h3>Welcome to Python!</h3>
        <p>Python is a high-level, interpreted programming language known for its simplicity and readability. It's perfect for beginners and widely used in web development, data science, and automation.</p>
        
        <h3>Why Python?</h3>
        <ul>
          <li><strong>Easy to Learn:</strong> Simple and readable syntax</li>
          <li><strong>Versatile:</strong> Used in many domains</li>
          <li><strong>Large Community:</strong> Extensive libraries and support</li>
          <li><strong>Interpreted:</strong> No need to compile before running</li>
        </ul>

        <h3>Your First Python Program</h3>
        <p>Python makes it incredibly easy to get started. Here's the classic "Hello, World!" program:</p>
        
        <p>That's it! Just one line of code. Python's simplicity is one of its greatest strengths.</p>

        <h3>The print() Function</h3>
        <p>The <code>print()</code> function is used to display output on the screen. You can print text, numbers, or variables.</p>
      `,
      completed: false
    }
  ]
};

const sampleCode = {
  java: `public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Declare variables
        int age = 25;
        String name = "Alice";
        double price = 19.99;
        
        // Print variables
        System.out.println("Name: " + name);
        System.out.println("Age: " + age);
        System.out.println("Price: $" + price);
    }
}`,
  python: `# Your first Python program
print("Hello, World!")

# Variables in Python
name = "Alice"
age = 25
price = 19.99

# Print variables
print(f"Name: \${name}")
print(f"Age: \${age}")
print(f"Price: $\${price}")`,
  cpp: `#include <iostream>
#include <string>

int main() {
    std::cout << "Hello, World!" << std::endl;
    
    // Declare variables
    int age = 25;
    std::string name = "Alice";
    double price = 19.99;
    
    // Print variables
    std::cout << "Name: " << name << std::endl;
    std::cout << "Age: " << age << std::endl;
    std::cout << "Price: $" << price << std::endl;
    
    return 0;
}`
};

export function LessonScreen({ selectedLanguage, selectedModule, selectedLesson, onLessonSelect, onBack }: LessonScreenProps) {
  const [code, setCode] = useState(() => {
    const langCode = selectedLanguage && sampleCode[selectedLanguage as keyof typeof sampleCode];
    return langCode || '// Write your code here...';
  });
  const [output, setOutput] = useState('');

  const lessons = selectedModule ? mockLessons[selectedModule as keyof typeof mockLessons] || [] : [];
  const currentLesson = lessons.find(lesson => lesson.id === selectedLesson);
  const currentIndex = lessons.findIndex(lesson => lesson.id === selectedLesson);
  
  if (!currentLesson || !selectedLanguage) {
    return null;
  }

  const handleRunCode = () => {
    // Simulate code execution
    setOutput('Program executed successfully!\nHello, World!\nName: Alice\nAge: 25\nPrice: $19.99');
  };

  const handlePreviousLesson = () => {
    if (currentIndex > 0) {
      onLessonSelect(lessons[currentIndex - 1].id);
    }
  };

  const handleNextLesson = () => {
    if (currentIndex < lessons.length - 1) {
      onLessonSelect(lessons[currentIndex + 1].id);
    }
  };

  const languageNames = {
    java: 'Java',
    python: 'Python',
    cpp: 'C++',
    c: 'C',
    html: 'HTML'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Modules
            </Button>
            <div className="text-sm text-gray-600">
              {languageNames[selectedLanguage as keyof typeof languageNames]} • Module 1
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select value={selectedLesson || ''} onValueChange={onLessonSelect}>
              <SelectTrigger className="w-64">
                <SelectValue placeholder="Select a lesson" />
              </SelectTrigger>
              <SelectContent>
                {lessons.map((lesson, index) => (
                  <SelectItem key={lesson.id} value={lesson.id}>
                    <div className="flex items-center space-x-2">
                      <span>Lesson {index + 1}: {lesson.title}</span>
                      {lesson.completed && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                          ✓
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Split Layout */}
      <div className="flex h-[calc(100vh-80px)]">
        {/* Code Editor Panel - Left Side */}
        <div className="w-1/2 bg-white border-r border-gray-200 flex flex-col">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-3">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-900">Code Editor</h3>
              <Button onClick={handleRunCode} className="bg-green-600 hover:bg-green-700">
                <Play className="w-4 h-4 mr-2" />
                Run Code
              </Button>
            </div>
          </div>
          
          <div className="flex-1 p-6">
            <Textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-full font-mono text-sm resize-none border-0 shadow-none focus:ring-0 bg-gray-50"
              placeholder="Write your code here..."
            />
          </div>

          {/* Output Section */}
          <div className="border-t border-gray-200 bg-gray-900 text-green-400 p-4 min-h-[120px]">
            <div className="text-sm mb-2 text-gray-400">Output:</div>
            <pre className="text-sm whitespace-pre-wrap">{output || 'Click "Run Code" to see output...'}</pre>
          </div>
        </div>

        {/* Lesson Content Panel - Right Side */}
        <div className="w-1/2 bg-white flex flex-col">
          {/* Lesson Header */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center space-x-4 mb-4">
              <h1 className="text-2xl text-gray-900">{currentLesson.title}</h1>
              {currentLesson.completed && (
                <Badge className="bg-green-500 text-white">
                  Completed
                </Badge>
              )}
            </div>
            
            {/* Goal Bubble */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-blue-900 mb-1">Learning Goal</div>
                  <div className="text-blue-800">{currentLesson.goal}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div 
              className="prose prose-gray max-w-none"
              dangerouslySetInnerHTML={{ __html: currentLesson.content }}
            />
          </div>

          {/* Navigation Footer */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousLesson}
                disabled={currentIndex === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous Lesson
              </Button>

              <div className="text-sm text-gray-600">
                Lesson {currentIndex + 1} of {lessons.length}
              </div>

              <Button
                onClick={handleNextLesson}
                disabled={currentIndex === lessons.length - 1}
              >
                Next Lesson
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}