import React, { useState } from 'react';
import { ArrowLeft, Upload, Camera, CheckCircle, XCircle, AlertCircle, Loader, Lightbulb, Eye } from 'lucide-react';
import { imageVerificationService, type VerificationResult } from '../utils/imageVerification';
import type { Quest } from '../App';

interface QuestVerificationModalProps {
  quest: Quest;
  onClose: () => void;
  onSubmit: (result: VerificationResult) => void;
}

const QuestVerificationModal: React.FC<QuestVerificationModalProps> = ({ quest, onClose, onSubmit }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [showTips, setShowTips] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file
      imageVerificationService.validateImageFile(file).then(validation => {
        if (!validation.valid) {
          alert(validation.message);
          return;
        }

        setUploadedFile(file);
        
        // Create preview URL
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        
        // Reset previous verification
        setVerificationResult(null);
      });
    }
  };

  const handleVerifyImage = async () => {
    if (!uploadedFile) return;

    setIsVerifying(true);
    try {
      const result = await imageVerificationService.verifyQuestImage(quest.title, uploadedFile);
      setVerificationResult(result);
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationResult({
        isValid: false,
        confidence: 0,
        detectedObjects: [],
        feedback: "An error occurred during verification. Please try again.",
        suggestions: ["Check your internet connection", "Try uploading a different image"]
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmitQuest = () => {
    if (verificationResult && verificationResult.isValid) {
      onSubmit(verificationResult);
    }
  };

  const questTips = imageVerificationService.getQuestTips(quest.title);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Quests</span>
          </button>
          <button
            onClick={() => setShowTips(!showTips)}
            className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
          >
            <Lightbulb className="w-4 h-4" />
            <span className="text-sm">Tips</span>
          </button>
        </div>

        {/* Quest Info */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{quest.title}</h3>
          <p className="text-gray-600 mb-4">{quest.description}</p>
          
          <div className="flex items-center space-x-4 text-sm">
            <span className={`px-3 py-1 rounded-full ${
              quest.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
              quest.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {quest.difficulty}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
              {quest.category}
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">
              {quest.xp} XP
            </span>
          </div>
        </div>

        {/* Tips Section */}
        {showTips && (
          <div className="mb-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2" />
              Photo Tips for Better Verification
            </h4>
            <ul className="space-y-2">
              {questTips.map((tip, index) => (
                <li key={index} className="text-sm text-blue-800 flex items-start">
                  <span className="mr-2">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Quest Progress</span>
            <span>{quest.progress}/{quest.total}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${(quest.progress / quest.total) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Upload Evidence Photo
          </label>
          
          {!uploadedFile ? (
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-green-400 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Camera className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-lg font-medium text-gray-900 mb-2">Upload Photo Evidence</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Take a clear photo showing your completion of this quest
                  </p>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <Upload className="w-4 h-4" />
                    <span>Choose Photo</span>
                  </div>
                </div>
              </label>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Image Preview */}
              <div className="relative">
                <img
                  src={previewUrl!}
                  alt="Quest evidence"
                  className="w-full h-64 object-cover rounded-xl border border-gray-200"
                />
                <button
                  onClick={() => {
                    setUploadedFile(null);
                    setPreviewUrl(null);
                    setVerificationResult(null);
                  }}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>

              {/* File Info */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                  <p className="text-sm text-gray-600">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Ready for verification</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI Verification Section */}
        {uploadedFile && !verificationResult && (
          <div className="mb-6">
            <button
              onClick={handleVerifyImage}
              disabled={isVerifying}
              className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isVerifying ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>AI is analyzing your photo...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Verify with AI</span>
                </>
              )}
            </button>
            
            {isVerifying && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center space-x-3">
                  <Loader className="w-5 h-5 text-blue-600 animate-spin" />
                  <div>
                    <p className="font-medium text-blue-900">AI Verification in Progress</p>
                    <p className="text-sm text-blue-700">
                      Our AI is analyzing your image to verify quest completion...
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Verification Result */}
        {verificationResult && (
          <div className="mb-6">
            <div className={`p-4 rounded-xl border-2 ${
              verificationResult.isValid 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-start space-x-3">
                {verificationResult.isValid ? (
                  <CheckCircle className="w-6 h-6 text-green-600 mt-0.5" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <h4 className={`font-semibold mb-2 ${
                    verificationResult.isValid ? 'text-green-900' : 'text-red-900'
                  }`}>
                    {verificationResult.isValid ? 'Verification Successful!' : 'Verification Failed'}
                  </h4>
                  <p className={`text-sm mb-3 ${
                    verificationResult.isValid ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {verificationResult.feedback}
                  </p>
                  
                  {/* Confidence Score */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="font-medium">AI Confidence</span>
                      <span>{Math.round(verificationResult.confidence * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          verificationResult.confidence >= 0.7 ? 'bg-green-500' :
                          verificationResult.confidence >= 0.5 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${verificationResult.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Detected Objects */}
                  {verificationResult.detectedObjects.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium mb-2">AI Detected:</p>
                      <div className="flex flex-wrap gap-1">
                        {verificationResult.detectedObjects.map((obj, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-white bg-opacity-50 rounded text-xs"
                          >
                            {obj}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suggestions for failed verification */}
                  {!verificationResult.isValid && verificationResult.suggestions && (
                    <div>
                      <p className="text-xs font-medium mb-2 text-red-900">Suggestions:</p>
                      <ul className="space-y-1">
                        {verificationResult.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-xs text-red-800 flex items-start">
                            <span className="mr-2">•</span>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          
          {verificationResult?.isValid ? (
            <button
              onClick={handleSubmitQuest}
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Submit Quest Progress</span>
            </button>
          ) : verificationResult && !verificationResult.isValid ? (
            <button
              onClick={() => {
                setUploadedFile(null);
                setPreviewUrl(null);
                setVerificationResult(null);
              }}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Upload className="w-5 h-5" />
              <span>Try Different Photo</span>
            </button>
          ) : (
            <button
              disabled
              className="flex-1 px-6 py-3 bg-gray-300 text-gray-500 rounded-xl cursor-not-allowed"
            >
              Upload & Verify Photo First
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestVerificationModal;