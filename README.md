# KareerFinder AI

## 🚀 How to Run Locally

1. Clone the repository:
   `git clone https://github.com/yourusername/kareerfinder-ai.git`
2. Install dependencies:
   `npm install`
3. Create a `.env.local` file in the root directory and add Gemini API key:
   `GEMINI_API_KEY=your_key_here`
4. Start the development server:
   `npm run dev`
5. Open `http://localhost:3000` in your browser.

## ⚙️ Tech Stack

- **Language:** TypeScript
- **AI Engine:** Google Gemini API (gemini-2.5-Flash)
- **SDK:** @google/genai
- **Framework:** Next.js

## 📖 Product Explanation

**The Problem**
Filipino youth face an **Exposure Gap** and **Skill Gap** when considering going into the
tech industry. Many students are highly interested in technology, but are paralyzed by the sheer number of paths available. They lack clarity on which specific tech niches fit
their personalities and do not know what actionable skills they need to learn to get started.

**The Solution**
**KareerFinder AI** is an interactive, AI-powered web prototype that acts as a personalized tech career counselor. Instead of overwhelming students with massive global roadmaps, the app takes the user's casual tech interests, experience level, and preferred activities, translate them into:

1. Three highly tailored tech roles with a clear reasoning on why they fit.
2. A simple 3-month beginner roadmap to build momentum.
3. Localized resources (like commmunities or free tracks) to help them start networking and upskilling immediately.

**Why This Approach**

- **Why I chose this problem:** This reflects my CS journey. Coming fresh out of SHS, tech was my second choice, as I felt overwhelmed and unsure if I was a fit because I didn't know how diverse tech niches are. This tool bridges that same exposure gap I experienced.
- **Why AI is useful for this:** Career quizzes online rely o keyword matching, while LLMs provide reasoning. Gemini can infer that an interest in "video games and data organization" translates well to "Data Analytics" or "Systems Architecture." Lastly, it can curate localized resources.
- **Assumptions:** Students have enough baseline self-awareness to describe casual activities they enjoy and recommending free, community-drive resourcecs is the most accessible starting point.

**Future Improvements**
Expand the interactive parameters to include more interest options and add a deeper analysis feature that allows users to click into a recommended role and generate a more comprehensive technical curriculum.
