import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ArrowLeft, Play, Save, Download, Settings, FileText } from 'lucide-react';

interface CodeEditorScreenProps {
  onBack: () => void;
}

const languageTemplates = {
  java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Your code here
        
    }
}`,
  python: `# Python Code Editor
print("Hello, World!")

# Your code here
`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    
    // Your code here
    
    return 0;
}`,
  c: `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    
    // Your code here
    
    return 0;
}`,
  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Page</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Hello, World!</h1>
        <p>Welcome to my web page!</p>
        
        <!-- Your HTML here -->
        
    </div>
</body>
</html>`
};

const languageNames = {
  java: 'Java',
  python: 'Python',
  cpp: 'C++',
  c: 'C',
  html: 'HTML'
};

export function CodeEditorScreen({ onBack }: CodeEditorScreenProps) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('java');
  const [code, setCode] = useState(languageTemplates.java);
  const [output, setOutput] = useState('');
  const [fileName, setFileName] = useState('Main.java');

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    setCode(languageTemplates[language as keyof typeof languageTemplates]);
    
    // Update file name based on language
    const extensions = {
      java: '.java',
      python: '.py',
      cpp: '.cpp',
      c: '.c',
      html: '.html'
    };
    
    const baseName = language === 'java' ? 'Main' : 'main';
    setFileName(baseName + extensions[language as keyof typeof extensions]);
  };

  const handleRunCode = () => {
    // Simulate code execution based on language
    const mockOutputs = {
      java: 'Compiling Java code...\njavac Main.java\njava Main\nHello, World!\n\nExecution completed successfully.',
      python: 'Running Python code...\npython main.py\nHello, World!\n\nExecution completed successfully.',
      cpp: 'Compiling C++ code...\ng++ -o main main.cpp\n./main\nHello, World!\n\nExecution completed successfully.',
      c: 'Compiling C code...\ngcc -o main main.c\n./main\nHello, World!\n\nExecution completed successfully.',
      html: 'Opening HTML file in browser...\nPage loaded successfully!\n\nHTML structure is valid.'
    };
    
    setOutput(mockOutputs[selectedLanguage as keyof typeof mockOutputs]);
  };

  const handleSave = () => {
    // Simulate saving file
    setOutput(`File saved as ${fileName}\n\nSave completed successfully.`);
  };

  const handleDownload = () => {
    // Create and download file
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = fileName;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    setOutput(`Downloaded ${fileName}\n\nFile downloaded to your device.`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            <div className="flex items-center space-x-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <h1 className="text-xl text-gray-900">Code Editor</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(languageNames).map(([key, name]) => (
                  <SelectItem key={key} value={key}>
                    {name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            
            <Button variant="outline" size="sm" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            
            <Button onClick={handleRunCode} className="bg-green-600 hover:bg-green-700">
              <Play className="w-4 h-4 mr-2" />
              Run Code
            </Button>
          </div>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
          {/* Code Editor - Takes up 2/3 of the space */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <span>{fileName}</span>
                    <span className="text-sm text-gray-500">({languageNames[selectedLanguage as keyof typeof languageNames]})</span>
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-0">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="h-full font-mono text-sm resize-none border-0 rounded-none focus:ring-0"
                  placeholder="Write your code here..."
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Output Console */}
            <Card className="flex-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Console Output</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg min-h-[200px] font-mono text-sm">
                  <pre className="whitespace-pre-wrap">
                    {output || 'Click "Run Code" to execute your program...'}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start" onClick={() => setCode(languageTemplates[selectedLanguage as keyof typeof languageTemplates])}>
                  <FileText className="w-4 h-4 mr-2" />
                  Reset to Template
                </Button>
                
                <Button variant="outline" className="w-full justify-start" onClick={() => setCode('')}>
                  <FileText className="w-4 h-4 mr-2" />
                  Clear Editor
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Format Code
                </Button>
              </CardContent>
            </Card>

            {/* Language Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Language Info</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="syntax" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="syntax">Syntax</TabsTrigger>
                    <TabsTrigger value="tips">Tips</TabsTrigger>
                  </TabsList>
                  <TabsContent value="syntax" className="text-sm text-gray-600 mt-4">
                    {selectedLanguage === 'java' && (
                      <div className="space-y-2">
                        <p><code>public class ClassName</code> - Define a class</p>
                        <p><code>System.out.println()</code> - Print to console</p>
                        <p><code>int, String, boolean</code> - Data types</p>
                      </div>
                    )}
                    {selectedLanguage === 'python' && (
                      <div className="space-y-2">
                        <p><code>print()</code> - Print to console</p>
                        <p><code>def function():</code> - Define function</p>
                        <p><code>if condition:</code> - Conditional statement</p>
                      </div>
                    )}
                    {selectedLanguage === 'cpp' && (
                      <div className="space-y-2">
                        <p><code>#include &lt;iostream&gt;</code> - Include header</p>
                        <p><code>cout &lt;&lt; "text"</code> - Print to console</p>
                        <p><code>int main()</code> - Main function</p>
                      </div>
                    )}
                    {selectedLanguage === 'c' && (
                      <div className="space-y-2">
                        <p><code>#include &lt;stdio.h&gt;</code> - Include header</p>
                        <p><code>printf("text")</code> - Print to console</p>
                        <p><code>int main()</code> - Main function</p>
                      </div>
                    )}
                    {selectedLanguage === 'html' && (
                      <div className="space-y-2">
                        <p><code>&lt;html&gt;&lt;/html&gt;</code> - Root element</p>
                        <p><code>&lt;h1&gt;&lt;/h1&gt;</code> - Heading</p>
                        <p><code>&lt;p&gt;&lt;/p&gt;</code> - Paragraph</p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="tips" className="text-sm text-gray-600 mt-4">
                    <div className="space-y-2">
                      <p>• Use meaningful variable names</p>
                      <p>• Add comments to explain your code</p>
                      <p>• Test your code frequently</p>
                      <p>• Practice with small examples first</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}