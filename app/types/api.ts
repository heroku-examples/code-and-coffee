// API Contract for Code & Coffee Flavor Profiler
// This file defines the request and response shapes for the /api/recommendation endpoint

/**
 * Supported programming languages for the coffee recommendation quiz
 */
export type ProgrammingLanguage = 'Node.js' | 'Python' | 'Java' | 'Go' | 'Ruby' | '.NET' | 'PHP';

/**
 * Request interface for the POST /api/recommendation endpoint
 */
export interface RecommendationRequest {
  /** The user's preferred programming language */
  language: ProgrammingLanguage;
  /** The user's selected framework */
  framework: string;
  /** The user's preferred IDE */
  ide: string;
  /** The user's coding philosophy or vibe */
  vibe: string;
}

/**
 * Response interface for the POST /api/recommendation endpoint
 */
export interface RecommendationResponse {
  /** The name of the recommended coffee */
  coffeeName: string;
  /** Description of the coffee's flavor characteristics */
  flavorProfile: string;
  /** AI-generated explanation connecting the coffee to the user's preferences */
  reasoning: string;
}

/**
 * Error response interface for API errors
 */
export interface ApiErrorResponse {
  /** Error message */
  error: string;
  /** HTTP status code */
  status: number;
  /** Optional detailed error information */
  details?: string;
}

/**
 * Quiz question options based on PRD specifications
 */
export const QUIZ_OPTIONS = {
  languages: [
    { value: 'Node.js' as const, label: 'Node.js', iconName: 'SiNodedotjs' },
    { value: 'Python' as const, label: 'Python', iconName: 'SiPython' },
    { value: 'Java' as const, label: 'Java', iconName: 'SiOpenjdk' },
    { value: 'Go' as const, label: 'Go', iconName: 'SiGo' },
    { value: 'Ruby' as const, label: 'Ruby', iconName: 'SiRuby' },
    { value: '.NET' as const, label: '.NET', iconName: 'SiDotnet' },
    { value: 'PHP' as const, label: 'PHP', iconName: 'SiPhp' },
  ],
  frameworks: {
    'Node.js': [
      { value: 'Express.js', label: 'Express.js' },
      { value: 'Next.js', label: 'Next.js' },
      { value: 'React', label: 'React' },
      { value: 'Vue.js', label: 'Vue.js' },
      { value: 'NestJS', label: 'NestJS' },
      { value: 'Fastify', label: 'Fastify' },
    ],
    Python: [
      { value: 'Django', label: 'Django' },
      { value: 'Flask', label: 'Flask' },
      { value: 'FastAPI', label: 'FastAPI' },
      { value: 'Pandas', label: 'Pandas' },
      { value: 'TensorFlow', label: 'TensorFlow' },
      { value: 'PyTorch', label: 'PyTorch' },
    ],
    Java: [
      { value: 'Spring Boot', label: 'Spring Boot' },
      { value: 'Spring Framework', label: 'Spring Framework' },
      { value: 'Hibernate', label: 'Hibernate' },
      { value: 'Apache Struts', label: 'Apache Struts' },
      { value: 'Play Framework', label: 'Play Framework' },
      { value: 'Quarkus', label: 'Quarkus' },
    ],
    Go: [
      { value: 'Gin', label: 'Gin' },
      { value: 'Echo', label: 'Echo' },
      { value: 'Fiber', label: 'Fiber' },
      { value: 'Beego', label: 'Beego' },
      { value: 'Revel', label: 'Revel' },
      { value: 'Buffalo', label: 'Buffalo' },
    ],
    Ruby: [
      { value: 'Ruby on Rails', label: 'Ruby on Rails' },
      { value: 'Sinatra', label: 'Sinatra' },
      { value: 'Hanami', label: 'Hanami' },
      { value: 'Padrino', label: 'Padrino' },
      { value: 'Grape', label: 'Grape' },
      { value: 'Roda', label: 'Roda' },
    ],
    '.NET': [
      { value: 'ASP.NET Core', label: 'ASP.NET Core' },
      { value: 'Entity Framework', label: 'Entity Framework' },
      { value: 'Blazor', label: 'Blazor' },
      { value: 'MAUI', label: 'MAUI' },
      { value: 'WPF', label: 'WPF' },
      { value: 'Xamarin', label: 'Xamarin' },
    ],
    PHP: [
      { value: 'Laravel', label: 'Laravel' },
      { value: 'Symfony', label: 'Symfony' },
      { value: 'CodeIgniter', label: 'CodeIgniter' },
      { value: 'Zend Framework', label: 'Zend Framework' },
      { value: 'CakePHP', label: 'CakePHP' },
      { value: 'Phalcon', label: 'Phalcon' },
    ],
  },
  ides: [
    { value: 'VS Code', label: 'VS Code', icon: '📝' },
    { value: 'NeoVim', label: 'NeoVim', icon: '⚡' },
    { value: 'JetBrains', label: 'JetBrains IDEs', icon: '🧠' },
    { value: 'Cursor', label: 'Cursor', icon: '🎯' },
    { value: 'Windsurf', label: 'Windsurf', icon: '🏄' },
    { value: 'Zed', label: 'Zed', icon: '⚡' },
    { value: 'Claude Code', label: 'Claude Code', icon: '🤖' },
    { value: 'Codex', label: 'Codex', icon: '🔮' },
    { value: 'Gemini CLI', label: 'Gemini CLI', icon: '💎' },
  ],
  vibes: [
    {
      value: 'elegantly-simple',
      label: 'Elegantly Simple',
      description:
        'Clean, minimal code that just works. You believe in the power of simplicity and readable solutions.',
    },
    {
      value: 'performance-obsessed',
      label: 'Performance Obsessed',
      description:
        'Every millisecond matters. You optimize for speed, efficiency, and resource usage above all else.',
    },
    {
      value: 'cutting-edge-explorer',
      label: 'Cutting-Edge Explorer',
      description:
        'Always trying the latest frameworks, languages, and tools. You love being on the bleeding edge of tech.',
    },
    {
      value: 'battle-tested-reliable',
      label: 'Battle-Tested & Reliable',
      description:
        "You prefer proven solutions and stable technologies. If it ain't broke, don't fix it.",
    },
    {
      value: 'creative-problem-solver',
      label: 'Creative Problem Solver',
      description:
        'You find unique, innovative approaches to challenges. Thinking outside the box is your specialty.',
    },
    {
      value: 'data-driven',
      label: 'Data-Driven',
      description:
        "Numbers don't lie. You make decisions based on metrics, analytics, and solid evidence.",
    },
  ],
} as const;
