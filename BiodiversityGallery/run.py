#!/usr/bin/env python3
"""
Biodiversity Gallery API Runner
Run this script to start the API server
"""

import uvicorn
from main import app

if __name__ == "__main__":
    print("🌿 Starting Biodiversity Gallery API...")
    print("📚 API Documentation: http://localhost:8000/docs")
    print("🔍 Health Check: http://localhost:8000/health")
    print("🛑 Press Ctrl+C to stop the server")
    print("-" * 50)
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
