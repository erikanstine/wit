import logging

# Configure the logger
logging.basicConfig(
    level=logging.DEBUG,  # Set log level
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",  # Log format
    handlers=[logging.StreamHandler()],  # Output to console
)

# Create and export the logger
logger = logging.getLogger("witApp")
