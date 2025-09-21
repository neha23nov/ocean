import cv2
import os
from ultralytics import YOLO
import numpy as np

def run_fish_detection(image_path, model_path=r"C:\Users\Aarya\OneDrive\Desktop\FDM\best.pt", confidence=0.2):
    """
    Run YOLOv8 fish detection on an image
    
    Args:
        image_path (str): Path to the input image
        model_path (str): Path to the YOLOv8 model file
        confidence (float): Confidence threshold for detections
    """
    
    # Check if model file exists
    if not os.path.exists(model_path):
        print(f"Error: Model file '{model_path}' not found!")
        print("Make sure 'best.pt' is in the same directory as this script.")
        return
    
    # Check if image file exists
    if not os.path.exists(image_path):
        print(f"Error: Image file '{image_path}' not found!")
        return
    
    try:
        # Load YOLOv8 model
        print(f"Loading model: {model_path}")
        model = YOLO(model_path)
        
        # Load image
        print(f"Processing image: {image_path}")
        image = cv2.imread(image_path)
        
        if image is None:
            print("Error: Could not load the image!")
            return
        
        # Run inference
        results = model(image, conf=confidence)
        
        # Get the first result (for single image)
        result = results[0]
        
        # Print detection results
        print(f"\nDetection Results:")
        print(f"Image size: {image.shape[1]}x{image.shape[0]}")
        print(f"Number of detections: {len(result.boxes) if result.boxes is not None else 0}")
        
        if result.boxes is not None and len(result.boxes) > 0:
            print("\nDetected fish:")
            
            # Get class names
            class_names = model.names
            
            # Process each detection
            for i, box in enumerate(result.boxes):
                # Get bounding box coordinates
                x1, y1, x2, y2 = box.xyxy[0].cpu().numpy()
                
                # Get confidence score
                conf = box.conf[0].cpu().numpy()
                
                # Get class ID and name
                class_id = int(box.cls[0].cpu().numpy())
                class_name = class_names[class_id]
                
                print(f"  {i+1}. {class_name}: {conf:.3f} confidence")
                print(f"     Box: [{int(x1)}, {int(y1)}, {int(x2)}, {int(y2)}]")
            
            # Draw bounding boxes and save annotated image
            annotated_image = result.plot()
            
            # Save the annotated image
            output_path = "annotated_" + os.path.basename(image_path)
            cv2.imwrite(output_path, annotated_image)
            print(f"\nAnnotated image saved as: {output_path}")
            
        else:
            print("No fish detected in the image!")
            print(f"Try lowering the confidence threshold (current: {confidence})")
            
    except Exception as e:
        print(f"Error during inference: {e}")
        print("Make sure you have ultralytics installed: pip install ultralytics")

def main():
    # Configuration
    MODEL_PATH = "best.pt"  # Path to your YOLOv8 model
    IMAGE_PATH = "fish_image.jpg"  # Replace with your image file name
    CONFIDENCE_THRESHOLD = 0.5  # Adjust as needed (0.1 to 0.9)
    
    print("YOLOv8 Fish Detection Script")
    print("=" * 40)
    
    # Check if model exists
    if not os.path.exists(MODEL_PATH):
        print(f"Model file '{MODEL_PATH}' not found!")
        print("Please make sure your YOLOv8 model file is named 'best.pt' and is in the same directory.")
        return
    
    # Get image path from user if not found
    if not os.path.exists(IMAGE_PATH):
        print(f"Default image '{IMAGE_PATH}' not found.")
        
        # List all image files in current directory
        image_extensions = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.webp']
        image_files = [f for f in os.listdir('.') if any(f.lower().endswith(ext) for ext in image_extensions)]
        
        if image_files:
            print("Available image files:")
            for i, img_file in enumerate(image_files, 1):
                print(f"  {i}. {img_file}")
            
            try:
                choice = int(input(f"Select image (1-{len(image_files)}): ")) - 1
                if 0 <= choice < len(image_files):
                    IMAGE_PATH = image_files[choice]
                else:
                    print("Invalid choice!")
                    return
            except ValueError:
                print("Invalid input!")
                return
        else:
            print("No image files found in the current directory!")
            IMAGE_PATH = input("Enter the full path to your image: ")
    
    # Run detection
    run_fish_detection(IMAGE_PATH, MODEL_PATH, CONFIDENCE_THRESHOLD)
    
    print("\nDone!")

if __name__ == "__main__":
    main()