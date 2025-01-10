import logging

from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse

from cache_money import CacheClient

from app.models.models import ShortenRequest, ShortenResponse

from app.services import hashing
from app.services.database import DBClient


logger = logging.getLogger(__name__)
read_cache = CacheClient()
db = DBClient()

router = APIRouter(prefix="/urls")


@router.post("/shorten")
def create_short_url(request: ShortenRequest) -> ShortenResponse:
    url = request.url
    # Check for match?
    short_code = hashing.generate_short_code_with_randomness(url)

    # store in db, cache (how to do this?) ... maybe just db at first?
    db.store_in_db(short_code, url)

    return ShortenResponse(short_code=short_code)


@router.get("/{short_id}")
def resolve_short_url(short_id: str):
    try:
        url = read_cache.get(short_id)
    except RuntimeError as e:
        url = db.get_from_db(short_id)
        if not url:
            raise HTTPException(status_code=404, detail="Item not found")
        read_cache.set(short_id, url)
    return RedirectResponse(url)
