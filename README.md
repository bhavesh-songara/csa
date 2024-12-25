# CSA (Customer Service Agent)

An open-source customer service platform powered by Google's Gemini Stream API. Watch as our AI agent network handles support through voice and screen sharing, working together 24/7 to solve customer issues.

## Overview

CSA provides a modern, AI-powered customer service solution that enables:

- Real-time voice interactions with AI agents
- Screen sharing capabilities
- 24/7 customer support availability
- Customizable AI agent personalities and instructions
- Dark/light theme support

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
- **Backend**: MongoDB
- **AI**: Google Gemini Stream API
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: Redux, Zustand
- **API Communication**: React Query, Axios
- **Form Handling**: React Hook Form, Zod

## Prerequisites

- Node.js 18+
- MongoDB database
- Google Cloud Project with Gemini API access
- Environment variables setup

## Getting Started

1. Clone the repository:
   ```bash
     git clone https://github.com/your-username/csa.git
     cd csa
   ```
2. Install dependencies:

   ```bash
     npm install
   ```

3. Create a `.env` file in the root directory:

   ```bash
   cp .env.example .env
   ```

4. Start the development server:

   ```bash
     npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Features

### Current Features

- Create and manage AI customer service agents
- Real-time voice communication with AI agents
- Screen sharing during support sessions
- Dark/light theme support
- Customizable agent instructions and personalities
- Session history tracking

### Upcoming Features

- RAG + Tool Usage
- Agent Performance Metrics
- Agent Chat History
- Agent Embeddings
- Integration with Slack & Email
- Agent collaboration capabilities
- Custom voice options for agents
- Chat transcript export

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Google Gemini Stream API for powering the AI interactions
- shadcn/ui for the beautiful UI components
- The open-source community for various tools and libraries used in this project
