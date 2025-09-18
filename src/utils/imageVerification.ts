// AI Image Verification System
export interface VerificationResult {
  isValid: boolean;
  confidence: number;
  detectedObjects: string[];
  feedback: string;
  suggestions?: string[];
}

export interface QuestRequirements {
  category: string;
  expectedObjects: string[];
  minConfidence: number;
  contextualRules?: string[];
}

// Mock AI service - In production, this would connect to actual AI services
class ImageVerificationService {
  private questRequirements: Record<string, QuestRequirements> = {
    'Plant a Sapling': {
      category: 'biodiversity',
      expectedObjects: ['plant', 'sapling', 'tree', 'soil', 'pot', 'garden'],
      minConfidence: 0.7,
      contextualRules: ['outdoor_setting', 'hands_visible', 'small_plant']
    },
    'No-Plastic Week': {
      category: 'waste',
      expectedObjects: ['reusable', 'glass', 'metal', 'cloth', 'bamboo', 'paper'],
      minConfidence: 0.6,
      contextualRules: ['no_plastic_visible', 'alternative_materials']
    },
    'Energy Audit Challenge': {
      category: 'energy',
      expectedObjects: ['meter', 'appliance', 'bulb', 'switch', 'solar', 'led'],
      minConfidence: 0.8,
      contextualRules: ['indoor_setting', 'electrical_equipment']
    },
    'Campus Cleanup Drive': {
      category: 'community',
      expectedObjects: ['trash', 'bag', 'gloves', 'people', 'cleaning', 'campus'],
      minConfidence: 0.7,
      contextualRules: ['group_activity', 'outdoor_setting', 'cleaning_tools']
    },
    'Water Conservation Week': {
      category: 'water',
      expectedObjects: ['tap', 'bucket', 'water', 'conservation', 'meter', 'rainwater'],
      minConfidence: 0.6,
      contextualRules: ['water_related', 'conservation_method']
    },
    'Composting Workshop': {
      category: 'waste',
      expectedObjects: ['compost', 'organic', 'bin', 'waste', 'decompose', 'soil'],
      minConfidence: 0.7,
      contextualRules: ['organic_waste', 'composting_setup']
    }
  };

  // Simulate AI image analysis
  private async analyzeImage(imageFile: File): Promise<{objects: string[], confidence: number}> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate AI processing delay
        const fileName = imageFile.name.toLowerCase();
        const fileSize = imageFile.size;
        
        // Mock object detection based on filename and other factors
        let detectedObjects: string[] = [];
        let confidence = 0.5;

        // Simple keyword matching simulation (in production, this would be actual AI)
        if (fileName.includes('plant') || fileName.includes('tree') || fileName.includes('sapling')) {
          detectedObjects = ['plant', 'sapling', 'soil', 'hands'];
          confidence = 0.85;
        } else if (fileName.includes('clean') || fileName.includes('trash') || fileName.includes('waste')) {
          detectedObjects = ['trash', 'bag', 'people', 'cleaning'];
          confidence = 0.80;
        } else if (fileName.includes('water') || fileName.includes('tap') || fileName.includes('bucket')) {
          detectedObjects = ['water', 'tap', 'bucket'];
          confidence = 0.75;
        } else if (fileName.includes('energy') || fileName.includes('meter') || fileName.includes('bulb')) {
          detectedObjects = ['meter', 'appliance', 'bulb'];
          confidence = 0.82;
        } else if (fileName.includes('compost') || fileName.includes('organic')) {
          detectedObjects = ['compost', 'organic', 'bin'];
          confidence = 0.78;
        } else if (fileName.includes('reusable') || fileName.includes('glass') || fileName.includes('metal')) {
          detectedObjects = ['reusable', 'glass', 'metal'];
          confidence = 0.73;
        } else {
          // Random simulation for other images
          const possibleObjects = ['plant', 'water', 'trash', 'people', 'hands', 'outdoor', 'indoor'];
          detectedObjects = possibleObjects.slice(0, Math.floor(Math.random() * 3) + 1);
          confidence = 0.3 + Math.random() * 0.4;
        }

        // Adjust confidence based on file size (larger files might be higher quality)
        if (fileSize > 1000000) confidence += 0.1; // 1MB+
        if (fileSize < 100000) confidence -= 0.1; // Less than 100KB

        resolve({
          objects: detectedObjects,
          confidence: Math.min(confidence, 0.95)
        });
      }, 2000); // Simulate 2-second processing time
    });
  }

  async verifyQuestImage(questTitle: string, imageFile: File): Promise<VerificationResult> {
    try {
      const requirements = this.questRequirements[questTitle];
      
      if (!requirements) {
        return {
          isValid: false,
          confidence: 0,
          detectedObjects: [],
          feedback: "Quest requirements not found. Please try again.",
          suggestions: ["Make sure you selected the correct quest"]
        };
      }

      // Analyze the image
      const analysis = await this.analyzeImage(imageFile);
      
      // Check if detected objects match requirements
      const matchingObjects = analysis.objects.filter(obj => 
        requirements.expectedObjects.some(expected => 
          obj.toLowerCase().includes(expected.toLowerCase()) || 
          expected.toLowerCase().includes(obj.toLowerCase())
        )
      );

      const matchScore = matchingObjects.length / requirements.expectedObjects.length;
      const finalConfidence = (analysis.confidence + matchScore) / 2;
      
      const isValid = finalConfidence >= requirements.minConfidence && matchingObjects.length > 0;

      let feedback: string;
      let suggestions: string[] = [];

      if (isValid) {
        feedback = `Great job! Your image successfully shows evidence of "${questTitle}". The AI detected relevant objects and activities.`;
      } else {
        feedback = `The uploaded image doesn't clearly show evidence of "${questTitle}". Please try uploading a clearer image.`;
        
        // Provide specific suggestions based on quest type
        switch (requirements.category) {
          case 'biodiversity':
            suggestions = [
              "Make sure the sapling/plant is clearly visible",
              "Include your hands in the photo to show you planted it",
              "Take the photo in good lighting conditions",
              "Show the plant in soil or a pot"
            ];
            break;
          case 'waste':
            suggestions = [
              "Show the waste segregation clearly",
              "Include labels or signs if available",
              "Make sure different waste categories are visible",
              "Take a well-lit photo of your setup"
            ];
            break;
          case 'energy':
            suggestions = [
              "Show the energy meter or appliance clearly",
              "Include any energy-saving devices",
              "Make sure readings are visible if applicable",
              "Take photos of before/after comparisons"
            ];
            break;
          case 'community':
            suggestions = [
              "Show people participating in the activity",
              "Include cleaning tools or equipment",
              "Capture the area being cleaned",
              "Take photos showing the group effort"
            ];
            break;
          case 'water':
            suggestions = [
              "Show water conservation methods clearly",
              "Include water-saving devices or setups",
              "Make sure the conservation activity is visible",
              "Take photos of your water-saving implementation"
            ];
            break;
          default:
            suggestions = [
              "Ensure good lighting in your photo",
              "Make the main subject clearly visible",
              "Include context that shows the activity",
              "Try taking multiple angles if needed"
            ];
        }
      }

      return {
        isValid,
        confidence: finalConfidence,
        detectedObjects: analysis.objects,
        feedback,
        suggestions: isValid ? undefined : suggestions
      };

    } catch (error) {
      return {
        isValid: false,
        confidence: 0,
        detectedObjects: [],
        feedback: "Error processing image. Please try again with a different image.",
        suggestions: ["Make sure the image file is not corrupted", "Try a smaller file size", "Use JPG or PNG format"]
      };
    }
  }

  // Additional utility methods
  async validateImageFile(file: File): Promise<{valid: boolean, message?: string}> {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        message: "Please upload a valid image file (JPG, PNG, or WebP)"
      };
    }

    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return {
        valid: false,
        message: "Image file is too large. Please upload an image smaller than 10MB"
      };
    }

    // Check minimum size (at least 1KB)
    if (file.size < 1024) {
      return {
        valid: false,
        message: "Image file is too small. Please upload a valid image"
      };
    }

    return { valid: true };
  }

  // Get quest-specific tips
  getQuestTips(questTitle: string): string[] {
    const requirements = this.questRequirements[questTitle];
    if (!requirements) return [];

    const tips: string[] = [];
    
    switch (requirements.category) {
      case 'biodiversity':
        tips.push(
          "📸 Take a clear photo of the planted sapling",
          "🌱 Show the plant in its growing environment",
          "👐 Include your hands to show you did the planting",
          "☀️ Use good natural lighting for best results"
        );
        break;
      case 'waste':
        tips.push(
          "🗂️ Show clearly separated waste categories",
          "📋 Include any labels or signs you made",
          "♻️ Highlight reusable or recyclable items",
          "📏 Take photos from multiple angles"
        );
        break;
      case 'energy':
        tips.push(
          "⚡ Show energy meters or monitoring devices",
          "💡 Include energy-efficient appliances or bulbs",
          "📊 Capture before/after readings if possible",
          "🏠 Show the area where you implemented changes"
        );
        break;
      case 'community':
        tips.push(
          "👥 Include other participants in the photo",
          "🧹 Show cleaning tools and equipment",
          "🏫 Capture the campus area being cleaned",
          "📸 Take before/after photos of the cleanup"
        );
        break;
      case 'water':
        tips.push(
          "💧 Show water conservation methods clearly",
          "🚰 Include water-saving devices or setups",
          "📏 Capture water usage measurements if available",
          "🏠 Show the implementation in your environment"
        );
        break;
    }

    return tips;
  }
}

export const imageVerificationService = new ImageVerificationService();