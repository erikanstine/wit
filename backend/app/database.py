from typing import Dict

db: Dict[str, str] = {}


def store_in_db(short_code: str, long_url: str):
    db[short_code] = long_url


def get_from_db(short_code: str) -> str:
    return db.get(short_code)
