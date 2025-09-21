import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configuration settings
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    print("⚠️  WARNING: GEMINI_API_KEY not found in environment.")
    print("   Please set your API key: $env:GEMINI_API_KEY='your_key'")
    print("   Get your API key from: https://makersuite.google.com/app/apikey")
    # Use a placeholder for now to allow the app to start
    GEMINI_API_KEY = "placeholder_key"
