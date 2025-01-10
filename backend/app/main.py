from app.utils import logger
from fastapi import FastAPI, HTTPException

from .routers import urls

app = FastAPI()
app.include_router(urls.router)


@app.get("/")
def hello():
    logger.info("Test")
    return "this thing is on"
