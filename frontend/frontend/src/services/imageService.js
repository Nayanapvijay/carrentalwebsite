// Image upload service for car images

// Function to upload an image to your server
export const uploadImage = async (file) => {
    try {
      // Create form data
      const formData = new FormData()
      formData.append("image", file)
  
      // Get API URL from environment variable
      const API_URL =  "http://localhost:5000/api"
  
      // Get token from localStorage if available
      const token = localStorage.getItem("token")
  
      // Upload the image
      const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: formData,
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to upload image")
      }
  
      const data = await response.json()
      return data.url
    } catch (error) {
      console.error("Error uploading image:", error)
      throw error
    }
  }
  
  // Function to upload multiple images
  export const uploadMultipleImages = async (files) => {
    try {
      const uploadPromises = Array.from(files).map((file) => uploadImage(file))
      return await Promise.all(uploadPromises)
    } catch (error) {
      console.error("Error uploading multiple images:", error)
      throw error
    }
  }
  