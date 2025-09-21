#!/usr/bin/env python3
"""
Test script for the Biodiversity Gallery API
Run this to test the API endpoints
"""

import requests
import json
import os

# API base URL
BASE_URL = "http://localhost:8000"

def test_health_check():
    """Test the health check endpoint"""
    print("🔍 Testing health check...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        if response.status_code == 200:
            print("✅ Health check passed:", response.json())
        else:
            print("❌ Health check failed:", response.status_code)
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to API. Make sure the server is running.")
        return False
    return True

def test_species_insights():
    """Test the species insights endpoint"""
    print("\n🐠 Testing species insights...")
    test_species = ["Clownfish", "Blue Whale", "Bald Eagle", "Tiger"]
    
    for species in test_species:
        print(f"\n📋 Testing with species: {species}")
        try:
            response = requests.get(f"{BASE_URL}/species_insights", params={"species": species})
            if response.status_code == 200:
                data = response.json()
                print(f"✅ Success! Got insights for {species}")
                # Try to parse the insights JSON
                try:
                    insights = json.loads(data["insights"])
                    print(f"   Species: {insights.get('species', 'N/A')}")
                    print(f"   Habitat: {insights.get('habitat', 'N/A')[:100]}...")
                except json.JSONDecodeError:
                    print("   ⚠️  Response is not valid JSON")
            else:
                print(f"❌ Failed for {species}: {response.status_code}")
        except Exception as e:
            print(f"❌ Error testing {species}: {e}")

def test_image_upload():
    """Test the image upload endpoint (requires an actual image file)"""
    print("\n🖼️  Testing image upload...")
    print("   Note: This test requires a valid image file. Skipping for now.")
    print("   To test manually, use:")
    print("   curl -X POST 'http://localhost:8000/species_from_image' -F 'file=@path/to/image.jpg'")

def main():
    """Run all tests"""
    print("🧪 Biodiversity Gallery API Test Suite")
    print("=" * 50)
    
    # Test health check first
    if not test_health_check():
        print("\n❌ API is not running. Please start it with: uvicorn main:app --reload")
        return
    
    # Test species insights
    test_species_insights()
    
    # Test image upload (placeholder)
    test_image_upload()
    
    print("\n🎉 Test suite completed!")
    print("\n📚 For interactive testing, visit: http://localhost:8000/docs")

if __name__ == "__main__":
    main()
