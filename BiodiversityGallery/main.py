import os
import google.generativeai as genai
from fastapi import FastAPI, Query, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from config import GEMINI_API_KEY

# Configure Gemini
try:
    genai.configure(api_key=GEMINI_API_KEY)
    print(f"✅ Gemini configured with API key: {GEMINI_API_KEY[:10]}...")
except Exception as e:
    print(f"❌ Error configuring Gemini: {e}")
    print("Please set your API key: $env:GEMINI_API_KEY='your_key'")

# App setup
app = FastAPI(title="Biodiversity Gallery API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # later restrict to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model = genai.GenerativeModel("gemini-2.0-flash-exp")

# 🔹 Prompt template
PROMPT_TEMPLATE = """
You are a biodiversity knowledge assistant.

Given the species "{species}", generate concise factual insights in the following JSON format:

{{
"species": "",
"habitat": "",
"diet": "",
"description": "",
"endangered_status": "",
"reproduction": "",
"notable_threats": "",
"conservation_actions": ""
}}

Rules:
- Always output valid JSON.
- Keep each field concise (1–3 sentences max).
- If info is unknown, return "Unknown".
"""

# 🔹 Endpoint 1: Get insights from species name
@app.get("/species_insights")
def get_species_insights(species: str = Query(..., description="Name of the species to get insights about")):
    """
    Get biodiversity insights for a species by name.
    
    Args:
        species: The name of the species (common or scientific name)
    
    Returns:
        JSON with species insights including habitat, diet, description, etc.
    """
    try:
        if GEMINI_API_KEY == "placeholder_key":
            raise HTTPException(status_code=500, detail="Gemini API key not configured. Please set GEMINI_API_KEY environment variable.")
        
        prompt = PROMPT_TEMPLATE.format(species=species)
        response = model.generate_content(prompt)
        return {"insights": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating insights: {str(e)}")

# 🔹 Endpoint 2: Get insights from uploaded image
@app.post("/species_from_image")
async def get_species_from_image(file: UploadFile = File(..., description="Image file of the species")):
    """
    Get biodiversity insights for a species from an uploaded image.
    
    Args:
        file: Image file containing the species
    
    Returns:
        JSON with species insights identified from the image
    """
    try:
        if GEMINI_API_KEY == "placeholder_key":
            raise HTTPException(status_code=500, detail="Gemini API key not configured. Please set GEMINI_API_KEY environment variable.")
        
        image_data = await file.read()
        prompt = """
You are a biodiversity knowledge assistant.

Look at the species in this image and generate concise factual insights in this JSON format:

{{
"species": "",
"habitat": "",
"diet": "",
"description": "",
"endangered_status": "",
"reproduction": "",
"notable_threats": "",
"conservation_actions": ""
}}

Rules:
- Identify the species (common + scientific name if possible).
- Always output valid JSON.
- If you are unsure, return "species": "Unknown".
"""
        
        response = model.generate_content([prompt, {"mime_type": file.content_type, "data": image_data}])
        return {"insights": response.text}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

# Health check endpoint
@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "Biodiversity Gallery API is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
