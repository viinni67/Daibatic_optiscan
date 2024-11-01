from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import io
import numpy as np
import cv2
from PIL import Image
import torch
from torchvision import models, transforms
import torch.nn as nn
import requests

import google.generativeai as genai
genai.configure(api_key="AIzaSyC_zx9kEEQsmrtLGMUoqAFfZF1Dhkjunk0")



app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model_path = 'resnet_model_n.pth'
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = models.resnet50()
model.fc = nn.Linear(model.fc.in_features, 5)
model.load_state_dict(torch.load(model_path, map_location=device))

model = model.to(device)
model.eval()

# Transformations for the input image
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # ImageNet normalization
])

def predict(image):
    sigmaX = 10
    gaussian = cv2.addWeighted(image, 4, cv2.GaussianBlur(image, (0, 0), sigmaX), -4, 128)
    image = cv2.resize(gaussian, (224, 224))

    image = Image.fromarray(image)

    image = transform(image)
    image = image.unsqueeze(0)
    image = image.to(device)

    outputs = model(image)
    _, predicted = torch.max(outputs, 1)

    categories = ['Mild', 'Proliferate', 'Moderate', 'No DR', 'Severe']
    return categories[predicted]

@app.get("/")
async def testing():
    return JSONResponse("SEND IMAGE, NAME AND AGE")





def generate_medical_report(prompt_text):
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt_text)
    return(response.text)


@app.post("/members")
async def members(file: UploadFile = File(...) ,gender : str = Form(...), other_diseases: str = Form(...), age: str = Form(...), pregnant: str = Form(...),first_name:str =Form(...), last_name :str=Form(...)):
    try:
        image = Image.open(io.BytesIO(await file.read()))
        image = cv2.cvtColor(np.array(image), cv2.COLOR_RGB2BGR)

        prediction = predict(image)
        if isinstance(prediction, set):
            prediction = list(prediction)
            
            

        prompt_text = (
            f"Generate a detailed medical report for a patient with the following details also give some advisory in below topics :\n"
            f"- first_name: {first_name}\n" 
            f"- sirname: {last_name}\n"
            f"- Age: {age}\n"
            f"- Gender: {gender}\n"
            f"- Other diseases: {other_diseases}\n"
            f"- Pregnancy status: {pregnant}\n"
            f"Diagnosis: {prediction} diabetic retinopathy.\n\n"
            "applicable treatment plan if any complications detected \n"
            "Lifestyle and Management Recommendations (Do's and Dont's)\n"
            "Dietary Recommendations (Food to Eat and Avoid)\n"
            "Exercises for Better Health \n"
            "Provide a comprehensive medical report with advice and potential risk assessment."
        )
        report_text = generate_medical_report(prompt_text)

            
       
        
        return JSONResponse(content={
            "message": f'The Person named {first_name} {last_name}  Aged {age} {gender} having {other_diseases} who is also {pregnant} suffers from ||{prediction}|| diabetic retinopathy disease',
            "report":report_text
            
        })
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)

# Running the app using uvicorn
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=5000)
