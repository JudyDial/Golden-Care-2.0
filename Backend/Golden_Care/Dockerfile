# Use an official Python runtime as a base image
FROM python:3.12.4-slim AS base

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    libpq-dev \
    postgresql-server-dev-all \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables to prevent Python from buffering stdout and stderr
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file to the container
COPY requirements.txt /app/

# Install the dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire Django project into the container
COPY . /app/

# Copy the .env file into the container (ensure .env is in your .dockerignore if sensitive)
# COPY .env /app/.env

# Collect static files for production (useful in environments like Heroku)
RUN python manage.py collectstatic --noinput

# Expose the port on which the app will run (default 8000)
EXPOSE 8000

# Final image: Running stage
FROM base AS final

# Default command to run Daphne server for ASGI setup
CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "Golden_Care.asgi:application & python manage.py mqtt_subscribe"]

# Alternatively, if using Uvicorn, replace the above CMD with:
# CMD ["uvicorn", "Golden_Care.asgi:application", "--host", "0.0.0.0", "--port", "8000", "--workers", "3"]
