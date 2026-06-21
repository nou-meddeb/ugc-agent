# UGC Content Agent

## English

### What is this?
A conversational AI agent that generates personalized content ideas and scripts for TikTok and YouTube Shorts — based on your current mood and recent life events. Built with the Claude API (Anthropic).

### How it works
```
Step 1 — Conversation
The agent asks 3 quick questions:
   • What's your vibe today?
   • What's been going on in your life lately?
   • What type of video — educational, storytelling, or trending?
        ↓
Step 2 — Video ideas
The agent generates 5 personalized video ideas based on your answers
        ↓
Step 3 — Full script
You pick one idea → the agent writes a complete script:
   • Hook (first 3 seconds)
   • Content (key talking points)
   • Call to action
   • Hashtags optimized for TikTok / YouTube Shorts
```

### Why this matters
This agent was born from a real moment — trying to film content about building AI agents, getting stuck on "the cringe," and turning that exact struggle into the first video idea. The agent helps turn everyday moments and emotions into content, without needing a fixed niche or a polished script.

### Setup
1. Clone the repository
2. Run `npm install`
3. Create a `.env` file based on `.env.example` and add your Anthropic API key
4. Run `node server.js`
5. Open `http://localhost:3001` in your browser

### Tech Stack
- Vanilla HTML, CSS, JavaScript (no framework)
- Node.js backend
- Claude API — `claude-sonnet-4-5`
- Dark mode, mobile-friendly design

### Known Limitations & Next Steps
- Conversation flow is currently linear (3 fixed questions) — next step: make it adaptive based on previous answers
- No content calendar or scheduling yet
- Next step: add a "save to favorites" feature for generated scripts
- Next step: connect to a portfolio site to showcase generated content over time

---

## Français

### C'est quoi ?
Un agent IA conversationnel qui génère des idées de contenu et des scripts personnalisés pour TikTok et YouTube Shorts — basés sur votre humeur du moment et vos événements de vie récents. Construit avec l'API Claude (Anthropic).

### Comment ça marche
```
Étape 1 — Conversation
L'agent pose 3 questions rapides :
   • Quelle est votre vibe aujourd'hui ?
   • Qu'est-ce qui s'est passé récemment dans votre vie ?
   • Quel type de vidéo — éducatif, storytelling, ou tendance ?
        ↓
Étape 2 — Idées de vidéos
L'agent génère 5 idées de vidéos personnalisées selon vos réponses
        ↓
Étape 3 — Script complet
Vous choisissez une idée → l'agent écrit un script complet :
   • Hook (3 premières secondes)
   • Contenu (points clés à dire)
   • Call to action
   • Hashtags optimisés pour TikTok / YouTube Shorts
```

### Pourquoi ce projet
Cet agent est né d'un vrai moment — essayer de filmer du contenu sur la création d'agents IA, bloquer sur "le cringe", et transformer cette difficulté même en première idée de vidéo. L'agent aide à transformer les moments et émotions du quotidien en contenu, sans avoir besoin d'une niche fixe ou d'un script parfait.

### Installation
1. Clonez le repository
2. Lancez `npm install`
3. Créez un fichier `.env` basé sur `.env.example` et ajoutez votre clé API Anthropic
4. Lancez `node server.js`
5. Ouvrez `http://localhost:3001` dans votre navigateur

### Stack technique
- HTML, CSS, JavaScript vanille (sans framework)
- Backend Node.js
- Claude API — `claude-sonnet-4-5`
- Design dark mode, adapté mobile

### Limitations connues & prochaines étapes
- Le flow de conversation est actuellement linéaire (3 questions fixes) — prochaine étape : le rendre adaptatif selon les réponses précédentes
- Pas encore de calendrier de contenu ou de planification
- Prochaine étape : ajouter une fonction "sauvegarder en favoris" pour les scripts générés
- Prochaine étape : connecter à un site portfolio pour montrer le contenu généré dans le temps
