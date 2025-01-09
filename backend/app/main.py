from fastapi import FastAPI, HTTPException
from app.models import ShortenRequest, ShortenResponse, RedirectResponse
from app.database import store_in_db, get_from_db

from cache_money import CacheClient

import hashlib


app = FastAPI()

cache = CacheClient()


@app.get("/")
def hello():
    return "Hello"
