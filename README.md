# Golden Care 2.0

Golden Care 2.0 is a full-stack platform designed to provide comprehensive care management, sensor data monitoring, and user management for elderly care. The project is organized as a monorepo with separate Backend (Django), Frontend (Next.js), and Cube.js analytics services.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Backend Setup (Django)](#backend-setup-django)
- [Frontend Setup (Next.js)](#frontend-setup-nextjs)
- [Cube.js Analytics](#cubejs-analytics)
- [Development](#development)
- [License](#license)

## Features
- User authentication and management
- Sensor data collection and alerting
- Appointment scheduling
- Admin dashboard
- Analytics and reporting

## Project Structure
```
Golden-Care-2.0/
├── Backend/         # Django backend API and services
├── Cubejs/          # Cube.js analytics service
├── Frontend/        # Next.js frontend application
```

## Backend Setup (Django)
1. Navigate to the backend directory:
   ```powershell
   cd Backend/Golden_Care
   ```
2. Install dependencies:
   ```powershell
   pip install -r requirements.txt
   ```
3. Run migrations:
   ```powershell
   python manage.py migrate
   ```
4. Start the development server:
   ```powershell
   python manage.py runserver
   ```
5. (Optional) Use Docker Compose:
   ```powershell
   docker-compose up --build
   ```

## Frontend Setup (Next.js)
1. Navigate to the frontend directory:
   ```powershell
   cd Frontend/goldencare
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm run dev
   ```

## Cube.js Analytics
1. Navigate to the Cubejs directory and follow the setup instructions in its README (if available).

## Development
- Make sure both backend and frontend servers are running for full functionality.
- Update environment variables as needed for API endpoints and database connections.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
