import { useState } from "react";
import { Sparkles, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const agencies = [
  { id: "full-service", name: "Full Service Digital Agency", icon: "🚀" },
  { id: "social-media", name: "Social Media Marketing", icon: "📱" },
  { id: "seo-sem", name: "SEO/SEM Specialist", icon: "🔍" },
  { id: "content", name: "Content Marketing", icon: "✍️" },
];

const categories = [
  { id: "image-ad", name: "Image Ads", ratio: "1:1", desc: "Square format for display ads" },
  { id: "banner", name: "Banner Images", ratio: "16:9", desc: "Wide format for web banners" },
  { id: "product", name: "Product Images", ratio: "1:1", desc: "Product-focused selling images" },
  { id: "social-square", name: "Social Media Square", ratio: "1:1", desc: "Instagram/Facebook posts" },
  { id: "social-story", name: "Social Media Story", ratio: "9:16", desc: "Instagram/Facebook stories" },
];

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedAgency, setSelectedAgency] = useState(agencies[0].id);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a description");
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const agency = agencies.find((a) => a.id === selectedAgency)?.name;
      const category = categories.find((c) => c.id === selectedCategory)?.name;

      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt, agency, category },
      });

      if (error) {
        if (error.message.includes("429")) {
          toast.error("Rate limit exceeded. Please try again later.");
        } else if (error.message.includes("402")) {
          toast.error("Payment required. Please add credits to your workspace.");
        } else {
          toast.error("Failed to generate image. Please try again.");
        }
        console.error("Error generating image:", error);
        return;
      }

      if (data?.imageUrl) {
        setGeneratedImage(data.imageUrl);
        toast.success("Image generated successfully!");
      } else {
        toast.error("No image was generated. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `nano-banana-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Image downloaded!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="text-4xl">🍌</div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Nano Banana AI
              </h1>
              <p className="text-sm text-muted-foreground">Professional Marketing Image Generator</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Description Input */}
            <Card className="p-6 shadow-lg border-2 hover:border-primary/50 transition-all duration-300">
              <label className="block mb-3">
                <span className="text-lg font-semibold flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Describe Your Image
                </span>
                <span className="text-sm text-muted-foreground">
                  Be specific about your product, brand, or concept
                </span>
              </label>
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: Tropical Nano Banana drink can on a beach with palm trees at sunset, vibrant colors, product photography style"
                className="min-h-[120px] text-base resize-none"
              />
            </Card>

            {/* Agency Selection */}
            <Card className="p-6 shadow-lg border-2 hover:border-primary/50 transition-all duration-300">
              <label className="block mb-4">
                <span className="text-lg font-semibold">Select Agency Type</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {agencies.map((agency) => (
                  <button
                    key={agency.id}
                    onClick={() => setSelectedAgency(agency.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      selectedAgency === agency.id
                        ? "border-primary bg-primary/10 shadow-[var(--shadow-glow)]"
                        : "border-border hover:border-primary/30 hover:bg-muted/50"
                    }`}
                  >
                    <div className="text-2xl mb-2">{agency.icon}</div>
                    <div className="text-sm font-medium">{agency.name}</div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Category Selection */}
            <Card className="p-6 shadow-lg border-2 hover:border-primary/50 transition-all duration-300">
              <label className="block mb-4">
                <span className="text-lg font-semibold">Select Image Format</span>
              </label>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                      selectedCategory === category.id
                        ? "border-primary bg-primary/10 shadow-[var(--shadow-glow)]"
                        : "border-border hover:border-primary/30 hover:bg-muted/50"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-semibold">{category.name}</div>
                        <div className="text-sm text-muted-foreground">{category.desc}</div>
                      </div>
                      <div className="text-xs font-mono bg-muted px-2 py-1 rounded">
                        {category.ratio}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Generate Button */}
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-accent hover:shadow-[var(--shadow-glow)] transition-all duration-300"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Image
                </>
              )}
            </Button>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:sticky lg:top-6 h-fit">
            <Card className="p-6 shadow-xl border-2 border-border/50">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-2xl">🎥</span>
                Generated Image
              </h2>
              <div className="aspect-square bg-muted/30 rounded-xl border-2 border-dashed border-border/50 flex items-center justify-center overflow-hidden">
                {isGenerating ? (
                  <div className="text-center p-8">
                    <Loader2 className="w-16 h-16 mx-auto mb-4 animate-spin text-primary" />
                    <p className="text-muted-foreground">Generating Image.....</p>
                  </div>
                ) : generatedImage ? (
                  <img
                    src={generatedImage}
                    alt="Generated marketing image"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-8">
                    <div className="text-6xl mb-4">🍌</div>
                    <p className="text-muted-foreground">
                      Your generated image will appear here
                    </p>
                  </div>
                )}
              </div>
              {generatedImage && (
                <Button
                  onClick={handleDownload}
                  className="w-full mt-4 bg-gradient-to-r from-primary to-accent hover:bg-secondary/90"
                  size="lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Image
                </Button>
              )}
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
