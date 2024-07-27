from fastapi import FastAPI
from app.routers import audiobooks


app = FastAPI()

app.include_router(audiobooks.router)
