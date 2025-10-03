🍌 Nano Banana AI – Marketing Image Generator

Nano Banana AI is a professional digital advertising content generator built with React, Supabase, and Tailwind UI.
It helps agencies and marketers create eye-catching visuals for social media, banners, product ads, and more.

✨ Features

🎨 Prompt-to-Image Generator – Describe your product/brand and generate visuals

🏢 Agency-Specific Use Cases – Optimized for:

🚀 Full Service Digital Agencies

📱 Social Media Marketing Agencies

🔍 SEO/SEM Specialists

✍️ Content Marketing Agencies

🖼 Ad Format Support

1:1 Image Ads

16:9 Banner Images

1:1 Product Selling Images

1:1 Social Media Square

9:16 Social Media Story

⚡ Supabase Edge Functions for AI image generation

🔔 Toast Notifications with error handling

📥 One-click Download of generated ads

🚀 Tech Stack

Frontend: React + Vite + TailwindCSS + ShadCN UI

Backend: Supabase (Edge Functions for image generation)

UI Components: Lucide Icons, ShadCN Cards, Buttons, Textarea

Notifications: Sonner

State Management: React Hooks

📦 Installation

Clone the repo:

git clone https://github.com/HarmonJavier01/creative_banana.git
cd nano-banana-ai

Install dependencies:

npm install

Run the dev server:

npm run dev

Build for production:

npm run build

🔑 Environment Variables

Create a .env.local file and add your Supabase keys:

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

⚡ How to Use the App

Start the app
Run npm run dev and open your browser at http://localhost:5173 (or the URL shown in terminal).

Describe your image

In the "Describe Your Image" box, type what you want.

Example:

Tropical Nano Banana drink can on a beach with palm trees at sunset, vibrant colors, product photography style

Select an agency type

Choose the audience you’re creating for:

🚀 Full Service Digital Agency

📱 Social Media Marketing

🔍 SEO/SEM Specialist

✍️ Content Marketing

Choose the ad format

Pick the visual format:

1:1 Image Ads

16:9 Banner

1:1 Product Image

1:1 Social Media Square

9:16 Social Media Story

Generate the image

Click "Generate Image"

The AI will process your prompt and show the result in the preview panel.

Download the image

Click "Download Image" to save the generated creative.

Files are saved as nano-banana-[timestamp].png

📸 Preview
Input Prompt Generated Image
"Nano Banana energy drink can splashing into ice water with golden bananas"
🛠 Development Notes

Add new agencies by updating the agencies array

Add/modify image categories in the categories array

Supabase function generate-image handles AI calls

📜 License

MIT License © 2025 – Built with 🍌 love for creative marketers.
