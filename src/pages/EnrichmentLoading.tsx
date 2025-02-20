import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Loader2, 
  Sparkles, 
  Brain, 
  Search,
  Network, 
  Building2, 
  CheckCircle2,
  Globe,
  Database,
  FileText,
  User
} from 'lucide-react';

interface LookupItem {
  id: number;
  text: string;
  icon: React.ReactNode;
  status: 'pending' | 'loading' | 'complete';
  details: string[];
}

interface DataNode {
  id: number;
  type: 'web' | 'social' | 'company' | 'document';
  x: number;
  y: number;
  size: number;
  connected: boolean;
  processed: boolean;
}

export function EnrichmentLoading() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [completedItems, setCompletedItems] = useState<number[]>([]);
  const [showDetails, setShowDetails] = useState<number[]>([]);
  const [dataNodes, setDataNodes] = useState<DataNode[]>([]);
  const [scanPosition, setScanPosition] = useState(0);

  const lookupItems: LookupItem[] = [
    {
      id: 1,
      text: 'Scanning web presence',
      icon: <Globe className="w-5 h-5" />,
      status: 'pending',
      details: [
        'Analyzing company domain',
        'Extracting key information'
      ]
    },
    {
      id: 2,
      text: 'Looking up company data',
      icon: <Building2 className="w-5 h-5" />,
      status: 'pending',
      details: [
        'Analyzing industry position',
        'Processing tech stack',
        'Mapping organization structure'
      ]
    },
    {
      id: 3,
      text: 'Synthesizing insights',
      icon: <Brain className="w-5 h-5" />,
      status: 'pending',
      details: [
        'Generating recommendations',
        'Creating personalized setup',
        'Finalizing configuration'
      ]
    }
  ];

  // Initialize data nodes
  useEffect(() => {
    const nodes: DataNode[] = [];
    const types: ('web' | 'social' | 'company' | 'document')[] = ['web', 'social', 'company', 'document'];
    
    for (let i = 0; i < 24; i++) {
      nodes.push({
        id: i,
        type: types[i % types.length],
        x: 30 + Math.random() * 40,
        y: 20 + Math.random() * 60,
        size: 1 + Math.random(),
        connected: false,
        processed: false
      });
    }
    
    setDataNodes(nodes);
  }, []);

  // Animate scan line
  useEffect(() => {
    const interval = setInterval(() => {
      setScanPosition(prev => (prev >= 100 ? 0 : prev + 1));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Process nodes progressively
  useEffect(() => {
    const interval = setInterval(() => {
      setDataNodes(prev => {
        const newNodes = [...prev];
        const unprocessedNodes = newNodes.filter(n => !n.connected);
        
        if (unprocessedNodes.length > 0) {
          const nodeToProcess = unprocessedNodes[0];
          nodeToProcess.connected = true;
          
          setTimeout(() => {
            setDataNodes(current => {
              const updatedNodes = [...current];
              const node = updatedNodes.find(n => n.id === nodeToProcess.id);
              if (node) node.processed = true;
              return updatedNodes;
            });
          }, 1000);
        }
        
        return newNodes;
      });
    }, 400);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!email) {
      navigate('/');
      return;
    }

    const processItem = (index: number) => {
      if (index >= lookupItems.length) {
        setTimeout(() => {
          navigate('/enrichment-results', {
            state: {
              email,
              enrichment: {
                person: {
                  name: 'Sarah Chen',
                  title: 'Head of Product',
                  location: 'San Francisco Bay Area',
                  linkedin: 'https://linkedin.com/in/sarahchen',
                  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
                },
                company: {
                  name: 'TechFlow Solutions',
                  website: 'https://techflow.io',
                  industry: 'Enterprise Software',
                  description: 'Leading provider of workflow automation solutions for enterprise teams',
                  logo: 'https://logo.clearbit.com/techflow.io'
                }
              }
            }
          });
        }, 1000);
        return;
      }

      setActiveItemIndex(index);
      setTimeout(() => {
        setShowDetails(prev => [...prev, lookupItems[index].id]);
      }, 300);

      const detailsCount = lookupItems[index].details.length;
      const detailInterval = 1000;
      const totalTime = detailsCount * detailInterval;

      setTimeout(() => {
        setCompletedItems(prev => [...prev, lookupItems[index].id]);
        processItem(index + 1);
      }, totalTime);
    };

    processItem(0);
  }, [email, navigate]);

  const getNodeIcon = (type: DataNode['type']) => {
    switch (type) {
      case 'web': return <Globe className="w-4 h-4" />;
      case 'social': return <User className="w-4 h-4" />;
      case 'company': return <Building2 className="w-4 h-4" />;
      case 'document': return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="flex h-[600px]">
      {/* Left Section - Content */}
      <div className="w-1/2 p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Analyzing Your Digital Presence
        </h1>

        <p className="text-gray-600 mb-6">
          Our AI is scanning multiple data sources to create your personalized profile.
        </p>

        <div className="space-y-4">
          {lookupItems.map((item, index) => {
            const isActive = activeItemIndex === index;
            const isCompleted = completedItems.includes(item.id);
            const showItemDetails = showDetails.includes(item.id);

            return (
              <div
                key={item.id}
                className={`
                  transform transition-all duration-500 ease-out
                  ${index > activeItemIndex ? 'opacity-50' : 'opacity-100'}
                  ${isCompleted ? 'scale-98' : 'scale-100'}
                `}
              >
                <div className={`
                  flex items-center justify-between p-3 rounded-lg
                  ${isActive ? 'bg-indigo-50 shadow-md' : 'bg-gray-50'}
                  transition-all duration-300
                `}>
                  <div className="flex items-center space-x-3">
                    <div className={`
                      p-2 rounded-full
                      ${isCompleted ? 'bg-green-100' : isActive ? 'bg-indigo-100' : 'bg-gray-100'}
                    `}>
                      {item.icon}
                    </div>
                    <span className={`
                      font-medium
                      ${isCompleted ? 'text-green-600' : isActive ? 'text-indigo-600' : 'text-gray-600'}
                    `}>
                      {item.text}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : isActive ? (
                      <Loader2 className="w-5 h-5 text-indigo-600 animate-spin" />
                    ) : (
                      <div className="w-5 h-5" />
                    )}
                  </div>
                </div>

                <div className={`
                  grid transition-all duration-500 ease-out
                  ${showItemDetails ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}
                  ${isActive ? 'delay-300' : ''}
                `}>
                  <div className="overflow-hidden">
                    <div className="pt-2 pl-14 space-y-1">
                      {item.details.map((detail, detailIndex) => (
                        <div
                          key={detailIndex}
                          className={`
                            flex items-center text-sm text-gray-600
                            transform transition-all duration-300 ease-out
                            ${showItemDetails ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                          `}
                          style={{ transitionDelay: `${detailIndex * 0.2}s` }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-2" />
                          {detail}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Section - Visualization */}
      <div className="w-1/2 bg-gradient-to-br from-gray-900 to-indigo-900 rounded-2xl relative overflow-hidden">
        {/* Background Grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />

        {/* Scanning Line */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-indigo-500/20 to-transparent"
          style={{
            transform: `translateY(${scanPosition}%)`,
            height: '20%',
            transition: 'transform 0.05s linear'
          }}
        />

        {/* Data Nodes */}
        <div className="relative h-full">
          {dataNodes.map((node) => (
            <React.Fragment key={node.id}>
              {/* Connection Lines */}
              {node.connected && (
                <div 
                  className="absolute left-1/2 top-1/2 h-px bg-gradient-to-r from-indigo-500 to-blue-500"
                  style={{
                    width: '100px',
                    transform: `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`,
                    opacity: node.processed ? 0.6 : 0.3,
                    transition: 'opacity 0.5s ease-out'
                  }}
                />
              )}
              
              {/* Node */}
              <div
                className={`
                  absolute flex items-center justify-center
                  rounded-lg backdrop-blur-sm
                  transition-all duration-500
                  ${node.connected 
                    ? node.processed
                      ? 'bg-green-400/20 border-green-400/40'
                      : 'bg-indigo-400/20 border-indigo-400/40'
                    : 'bg-gray-400/10 border-gray-400/20'
                  }
                  border
                `}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  width: `${node.size * 40}px`,
                  height: `${node.size * 40}px`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className={`
                  transition-colors duration-500
                  ${node.connected
                    ? node.processed
                      ? 'text-green-400'
                      : 'text-indigo-400'
                    : 'text-gray-400'
                  }
                `}>
                  {getNodeIcon(node.type)}
                </div>
              </div>
            </React.Fragment>
          ))}

          {/* Central Brain Icon */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-indigo-500/20 rounded-full animate-ping" />
              <div className="relative bg-indigo-600 p-4 rounded-full">
                <Brain className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
          <Search className="w-5 h-5 text-indigo-400 animate-pulse" />
          <div className="text-indigo-200 text-sm font-medium">
            Scanning data sources...
          </div>
          <Database className="w-5 h-5 text-indigo-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
}