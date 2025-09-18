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
      expectedObjects: ['plant', 'sapling', 'tree', 'soil', 'pot', 'garden', 'hands', 'green'],
      minConfidence: 0.6,
      contextualRules: ['outdoor_setting', 'hands_visible', 'small_plant']
    },
    'No-Plastic Week': {
      category: 'waste',
      expectedObjects: ['reusable', 'glass', 'metal', 'cloth', 'bamboo', 'paper', 'bottle', 'bag'],
      minConfidence: 0.5,
      contextualRules: ['no_plastic_visible', 'alternative_materials']
    },
    'Energy Audit Challenge': {
      category: 'energy',
      expectedObjects: ['meter', 'appliance', 'bulb', 'switch', 'solar', 'led', 'light', 'electrical'],
      minConfidence: 0.7,
      contextualRules: ['indoor_setting', 'electrical_equipment']
    },
    'Campus Cleanup Drive': {
      category: 'community',
      expectedObjects: ['trash', 'bag', 'gloves', 'people', 'cleaning', 'campus', 'group', 'cleanup'],
      minConfidence: 0.6,
      contextualRules: ['group_activity', 'outdoor_setting', 'cleaning_tools']
    },
    'Water Conservation Week': {
      category: 'water',
      expectedObjects: ['tap', 'bucket', 'water', 'conservation', 'meter', 'rainwater', 'save'],
      minConfidence: 0.5,
      contextualRules: ['water_related', 'conservation_method']
    },
    'Composting Workshop': {
      category: 'waste',
      expectedObjects: ['compost', 'organic', 'bin', 'waste', 'decompose', 'soil', 'food'],
      minConfidence: 0.6,
      contextualRules: ['organic_waste', 'composting_setup']
    }
  };

  // Enhanced AI image analysis simulation
  private async analyzeImage(imageFile: File): Promise<{objects: string[], confidence: number}> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const fileName = imageFile.name.toLowerCase();
        const fileSize = imageFile.size;
        
        let detectedObjects: string[] = [];
        let confidence = 0.3; // Base confidence

        // Enhanced keyword matching with better logic
        const keywords = {
          plant: ['plant', 'tree', 'sapling', 'leaf', 'green', 'garden', 'flower'],
          waste: ['trash', 'garbage', 'waste', 'bin', 'recycle', 'plastic', 'bottle'],
          water: ['water', 'tap', 'bucket', 'drop', 'conservation', 'save', 'rain'],
          energy: ['energy', 'light', 'bulb', 'meter', 'electric', 'solar', 'power'],
          cleaning: ['clean', 'sweep', 'mop', 'tidy', 'organize', 'pickup'],
          compost: ['compost', 'organic', 'food', 'kitchen', 'decompose', 'soil'],
          people: ['person', 'people', 'human', 'hand', 'group', 'team'],
          tools: ['tool', 'equipment', 'device', 'instrument', 'apparatus']
        };

        // Check filename for keywords
        Object.entries(keywords).forEach(([category, words]) => {
          words.forEach(word => {
            if (fileName.includes(word)) {
              detectedObjects.push(category);
              confidence += 0.15;
            }
          });
        });

        // Simulate more realistic detection based on common scenarios
        const randomFactor = Math.random();
        
        if (fileName.includes('plant') || fileName.includes('tree') || fileName.includes('green')) {
          detectedObjects = ['plant', 'sapling', 'soil', 'hands', 'green'];
          confidence = 0.75 + (randomFactor * 0.2);
        } else if (fileName.includes('clean') || fileName.includes('trash')) {
          detectedObjects = ['trash', 'bag', 'people', 'cleaning', 'tools'];
          confidence = 0.70 + (randomFactor * 0.25);
        } else if (fileName.includes('water') || fileName.includes('tap')) {
          detectedObjects = ['water', 'tap', 'bucket', 'conservation'];
          confidence = 0.65 + (randomFactor * 0.3);
        } else if (fileName.includes('energy') || fileName.includes('light') || fileName.includes('bulb')) {
          detectedObjects = ['meter', 'appliance', 'bulb', 'electrical'];
          confidence = 0.80 + (randomFactor * 0.15);
        } else if (fileName.includes('compost') || fileName.includes('organic')) {
          detectedObjects = ['compost', 'organic', 'bin', 'food'];
          confidence = 0.72 + (randomFactor * 0.23);
        } else if (fileName.includes('reuse') || fileName.includes('glass') || fileName.includes('metal')) {
          detectedObjects = ['reusable', 'glass', 'metal', 'bottle'];
          confidence = 0.68 + (randomFactor * 0.27);
        } else {
          // For generic images, simulate some detection
          const genericObjects = ['object', 'item', 'thing'];
          detectedObjects = genericObjects.slice(0, Math.floor(randomFactor * 2) + 1);
          confidence = 0.2 + (randomFactor * 0.3);
        }

        // Adjust confidence based on file characteristics
        if (fileSize > 2000000) confidence += 0.1; // Large files (2MB+) = better quality
        if (fileSize > 5000000) confidence += 0.05; // Very large files (5MB+)
        if (fileSize < 500000) confidence -= 0.1; // Small files might be low quality

        // Ensure confidence is within bounds
        confidence = Math.min(Math.max(confidence, 0.1), 0.95);

        // Remove duplicates
        detectedObjects = [...new Set(detectedObjects)];

        console.log('AI Analysis Result:', { objects: detectedObjects, confidence, fileName, fileSize });

        resolve({
          objects: detectedObjects,
          confidence: confidence
        });
      }, 1500 + Math.random() * 1000); // 1.5-2.5 second processing time
    });
  }

  async verifyQuestImage(questTitle: string, imageFile: File): Promise<VerificationResult> {
    try {
      console.log('Starting verification for quest:', questTitle);
      
      const requirements = this.questRequirements[questTitle];
      
      if (!requirements) {
        console.log('No requirements found for quest:', questTitle);
        return {
          isValid: false,
          confidence: 0,
          detectedObjects: [],
          feedback: "Quest requirements not found. Please try again.",
          suggestions: ["Make sure you selected the correct quest"]
        };
      }

      console.log('Quest requirements:', requirements);

      // Analyze the image
      const analysis = await this.analyzeImage(imageFile);
      console.log('Image analysis complete:', analysis);
      
      // Check if detected objects match requirements
      const matchingObjects = analysis.objects.filter(obj => 
        requirements.expectedObjects.some(expected => 
          obj.toLowerCase().includes(expected.toLowerCase()) || 
          expected.toLowerCase().includes(obj.toLowerCase())
        )
      );

      console.log('Matching objects:', matchingObjects);

      // Calculate match score
      const matchScore = matchingObjects.length > 0 ? 
        (matchingObjects.length / Math.max(requirements.expectedObjects.length, 1)) : 0;
      
      // Combine analysis confidence with match score
      const finalConfidence = (analysis.confidence * 0.6) + (matchScore * 0.4);
      
      console.log('Match score:', matchScore, 'Final confidence:', finalConfidence);

      // Determine if verification passes
      const isValid = finalConfidence >= requirements.minConfidence && matchingObjects.length > 0;

      let feedback: string;
      let suggestions: string[] = [];

      if (isValid) {
        feedback = `Excellent! Your image successfully demonstrates "${questTitle}". The AI detected relevant elements with ${Math.round(finalConfidence * 100)}% confidence.`;
      } else {
        feedback = `The uploaded image doesn't clearly show evidence of "${questTitle}". Please try uploading a clearer, more relevant image.`;
        
        // Provide specific suggestions based on quest type
        switch (requirements.category) {
          case 'biodiversity':
            suggestions = [
              "📸 Take a clear photo of the planted sapling or tree",
              "🌱 Show the plant in soil or a pot",
              "👐 Include your hands in the photo to show you planted it",
              "☀️ Use good natural lighting for best results",
              "🌿 Make sure green plants are clearly visible"
            ];
            break;
          case 'waste':
            suggestions = [
              "♻️ Show clearly separated waste categories",
              "🗂️ Include recycling bins or containers",
              "📋 Display reusable alternatives to plastic",
              "📸 Take photos from multiple angles",
              "🏷️ Include any labels or signs you made"
            ];
            break;
          case 'energy':
            suggestions = [
              "⚡ Show energy meters or monitoring devices clearly",
              "💡 Include energy-efficient appliances or LED bulbs",
              "📊 Capture before/after readings if possible",
              "🏠 Show the area where you implemented changes",
              "🔌 Make electrical equipment visible"
            ];
            break;
          case 'community':
            suggestions = [
              "👥 Include other participants in the photo",
              "🧹 Show cleaning tools and equipment being used",
              "🏫 Capture the campus area being cleaned",
              "📸 Take before/after photos of the cleanup",
              "🤝 Show teamwork and group effort"
            ];
            break;
          case 'water':
            suggestions = [
              "💧 Show water conservation methods clearly",
              "🚰 Include water-saving devices or setups",
              "📏 Capture water usage measurements if available",
              "🏠 Show the implementation in your environment",
              "💦 Make water-related elements visible"
            ];
            break;
          default:
            suggestions = [
              "📸 Ensure good lighting in your photo",
              "🎯 Make the main subject clearly visible",
              "📐 Include context that shows the activity",
              "🔄 Try taking multiple angles if needed"
            ];
        }
      }

      const result = {
        isValid,
        confidence: finalConfidence,
        detectedObjects: analysis.objects,
        feedback,
        suggestions: isValid ? undefined : suggestions
      };

      console.log('Final verification result:', result);
      return result;

    } catch (error) {
      console.error('Verification error:', error);
      return {
        isValid: false,
        confidence: 0,
        detectedObjects: [],
        feedback: "Error processing image. Please try again with a different image.",
        suggestions: [
          "🔄 Make sure the image file is not corrupted", 
          "📏 Try a smaller file size (under 10MB)", 
          "📁 Use JPG or PNG format"
        ]
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

    // Check minimum size (at least 10KB)
    if (file.size < 10240) {
      return {
        valid: false,
        message: "Image file is too small. Please upload a valid image (at least 10KB)"
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
          "☀️ Use good natural lighting for best results",
          "🌿 Make sure green vegetation is visible"
        );
        break;
      case 'waste':
        tips.push(
          "🗂️ Show clearly separated waste categories",
          "📋 Include any labels or signs you made",
          "♻️ Highlight reusable or recyclable items",
          "📏 Take photos from multiple angles",
          "🏷️ Display alternative materials to plastic"
        );
        break;
      case 'energy':
        tips.push(
          "⚡ Show energy meters or monitoring devices",
          "💡 Include energy-efficient appliances or bulbs",
          "📊 Capture before/after readings if possible",
          "🏠 Show the area where you implemented changes",
          "🔌 Make electrical equipment clearly visible"
        );
        break;
      case 'community':
        tips.push(
          "👥 Include other participants in the photo",
          "🧹 Show cleaning tools and equipment",
          "🏫 Capture the campus area being cleaned",
          "📸 Take before/after photos of the cleanup",
          "🤝 Show teamwork and collaboration"
        );
        break;
      case 'water':
        tips.push(
          "💧 Show water conservation methods clearly",
          "🚰 Include water-saving devices or setups",
          "📏 Capture water usage measurements if available",
          "🏠 Show the implementation in your environment",
          "💦 Make water-related activities visible"
        );
        break;
    }

    return tips;
  }
}

export const imageVerificationService = new ImageVerificationService();