import hashlib
import random
import string


def generate_short_code(long_url: str, length: int = 6) -> str:
    hash_object = hashlib.sha256(long_url.encode())
    full_hash = hash_object.hexdigest()
    short_code = full_hash[:length]
    return short_code


def generate_short_code_with_randomness(url: str, length: int = 6) -> str:
    random_suffix = "".join(random.choices(string.ascii_letters + string.digits, k=4))
    unique_input = url + random_suffix
    return generate_short_code(unique_input, length)
