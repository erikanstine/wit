from pydantic import BaseModel


class ShortenRequest(BaseModel):
    url: str


class ShortenResponse(BaseModel):
    short_code: str


class RedirectResponse(BaseModel):
    url: str
