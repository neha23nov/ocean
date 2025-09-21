# Biodiversity Gallery API

A FastAPI-based API that provides biodiversity insights for species using Google's Gemini 2.0 Flash model. The API can analyze species by name or from uploaded images.

## Features

- **Text-based species insights**: Get detailed information about any species by providing its name
- **Image-based species identification**: Upload an image to identify and get insights about the species
- **Structured JSON responses**: Consistent data format for easy integration
- **CORS enabled**: Ready for frontend integration

## Setup

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Configure API Key

Create a `.env` file in the project root and add your Gemini API key:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

You can get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey).

### 3. Run the API

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Endpoints

### 1. Get Species Insights by Name

**GET** `/species_insights`

Query parameters:
- `species` (required): Name of the species (common or scientific name)

Example:
```bash
curl "http://localhost:8000/species_insights?species=Clownfish"
```

### 2. Get Species Insights from Image

**POST** `/species_from_image`

Form data:
- `file` (required): Image file of the species

Example:
```bash
curl -X POST "http://localhost:8000/species_from_image" -F "file=@path/to/image.jpg"
```

### 3. Health Check

**GET** `/health`

Returns API status.

## Response Format

Both endpoints return JSON in the following format:

```json
{
  "insights": "{
    \"species\": \"Scientific and common name\",
    \"habitat\": \"Typical habitats and regions\",
    \"diet\": \"What it eats and how it feeds\",
    \"description\": \"Physical and behavioral description\",
    \"endangered_status\": \"IUCN or other recognized status\",
    \"reproduction\": \"How it reproduces, mating/nesting behavior\",
    \"notable_threats\": \"Key threats like climate change, pollution, etc.\",
    \"conservation_actions\": \"Existing or recommended conservation measures\"
  }"
}
```

## API Documentation

Once the server is running, visit:
- Interactive API docs: `http://localhost:8000/docs`
- ReDoc documentation: `http://localhost:8000/redoc`

## Example Usage

### Python
```python
import requests

# Get insights by species name
response = requests.get("http://localhost:8000/species_insights?species=Blue Whale")
print(response.json())

# Get insights from image
with open("fish_image.jpg", "rb") as f:
    files = {"file": f}
    response = requests.post("http://localhost:8000/species_from_image", files=files)
    print(response.json())
```

### JavaScript
```javascript
// Get insights by species name
const response = await fetch("http://localhost:8000/species_insights?species=Clownfish");
const data = await response.json();
console.log(data);

// Get insights from image
const formData = new FormData();
formData.append("file", imageFile);
const response = await fetch("http://localhost:8000/species_from_image", {
  method: "POST",
  body: formData
});
const data = await response.json();
console.log(data);
```

## Development

The API uses:
- **FastAPI** for the web framework
- **Google Generative AI** for species analysis
- **Uvicorn** as the ASGI server
- **python-dotenv** for environment variable management

## License

MIT License
