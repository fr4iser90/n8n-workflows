import { create } from 'zustand'

const useStore = create((set) => ({
  // File upload state
  uploadedFiles: [],
  setUploadedFiles: (files) => set({ uploadedFiles: files }),

  // Hashtags state
  selectedHashtags: [],
  setSelectedHashtags: (hashtags) => set({ selectedHashtags: hashtags }),

  // Platform state
  selectedPlatforms: [],
  setSelectedPlatforms: (platforms) => set({ selectedPlatforms: platforms }),
  platformSettings: {},
  setPlatformSettings: (settings) => set({ platformSettings: settings }),

  // UI state
  isProcessing: false,
  setIsProcessing: (processing) => set({ isProcessing: processing }),
  error: null,
  setError: (error) => set({ error }),

  // Actions
  reset: () => set({
    uploadedFiles: [],
    selectedHashtags: [],
    selectedPlatforms: [],
    platformSettings: {},
    isProcessing: false,
    error: null
  }),

  // Submit action (placeholder for n8n integration)
  submit: async () => {
    set({ isProcessing: true, error: null })
    try {
      // TODO: Implement n8n webhook integration
      console.log('Submitting data to n8n workflow...')
      await new Promise(resolve => setTimeout(resolve, 2000)) // Simulate API call
      set({ isProcessing: false })
    } catch (error) {
      set({ error: error.message, isProcessing: false })
    }
  }
}))

export default useStore
