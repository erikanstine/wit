import time
from typing import Dict


class DBClient:
    def __init__(self):
        self.db: Dict[str, str] = {}

    def store_in_db(self, short_code: str, long_url: str):
        time.sleep(1)
        self.db[short_code] = long_url

    def get_from_db(self, short_code: str) -> str:
        time.sleep(1)
        return self.db.get(short_code)

    def print_db(self):
        print(self.db)
