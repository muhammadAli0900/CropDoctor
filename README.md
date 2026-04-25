# Crop Doctor — Diagnose. Treat. Grow.

Crop Doctor is an AI-powered agricultural diagnostic tool designed to help farmers identify crop diseases instantly. By leveraging computer vision and the Gemini 1.5 Flash model, it provides science-backed treatment plans and prevention strategies to ensure a healthy harvest.

## 🚀 Impact
Agriculture is the backbone of many regional economies, yet crop diseases cause significant yield losses every year. **Crop Doctor** empowers farmers with expert-level knowledge in their pockets, reducing the time between detection and treatment, ultimately increasing food security and farmer livelihoods.

## 🛠 Tech Stack
- **Frontend**: React 19 with Vite (SPA)
- **Backend**: Node.js with Express (Server-side API proxy)
- **Styling**: Tailwind CSS 4.0 (Modern, utility-first CSS)
- **Animations**: Framer Motion (for smooth, tactile UI transitions)
- **AI Engine**: Google Gemini 1.5 Flash (Multimodal analysis)
- **Icons**: Lucide React
- **Language Support**: English and Urdu (via AI translation)

## ✨ Key Features
- **Instant AI Diagnosis**: Drag-and-drop or use your camera to upload leaf photos.
- **Interactive Checklists**: Treatment plans are broken down into actionable steps.
- **Severity Badging**: Visual indicators for Mild, Moderate, or Severe cases.
- **Multilingual Support**: High-quality Urdu translations for local farmers.
- **Privacy First**: All AI calculations happen server-side; your API keys are never exposed to the browser.

## ⚙️ Configuration
To run this project locally or deploy it to Vercel/Cloud Run, you need to set up your environment variables.

1.  **Clone the Repository**:
    ```bash
    git clone <your-repo-url>
    cd crop-doctor
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Variables**:
    Create a `.env` file in the root directory and add your Gemini API Key:
    ```env
    GEMINI_API_KEY=your_actual_key_here
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## 🌐 AI Studio Project
You can view and interact with the live public version of this project here:
[Crop Doctor on AI Studio (Public)](https://ais-pre-aplxw5rpfa56m4ctfg3wyh-865705618541.asia-southeast1.run.app)

## 📦 Deployment
You can deploy this project using two main methods:

### Method A: Google Cloud Run (Recommended for AI Seekho)
1. Click the **"Deploy"** button in AI Studio.
2. Follow the prompts to provision a Cloud Run service.
3. Ensure your `GEMINI_API_KEY` is added to the service's environment variables.

### Method B: Vercel
1. Push this code to a **GitHub** repository.
2. Open [Vercel](https://vercel.com) and import the repository.
3. Add `GEMINI_API_KEY` to the **Environment Variables** in the Vercel dashboard.
4. Vercel will use the provided `vercel.json` to automatically configure the SPA and the Node.js API routes.

---
*Built for Google AI Seekho | Powered by Gemini 1.5 Flash*
