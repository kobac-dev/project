# TutorHub Backend API

A comprehensive Spring Boot backend application for the TutorHub platform, providing REST APIs for managing tutors, parents, bookings, and administrative functions.

## Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: Support for Admin, Tutor, and Parent roles
- **Booking System**: Complete booking management with status tracking
- **Subject Management**: Dynamic subject creation and management
- **Dashboard Analytics**: Real-time statistics and reporting
- **Profile Management**: Comprehensive user profile management
- **Search & Filtering**: Advanced search capabilities

## Technology Stack

- **Framework**: Spring Boot 3.2.0
- **Database**: PostgreSQL
- **Security**: Spring Security with JWT
- **ORM**: Spring Data JPA with Hibernate
- **Build Tool**: Maven
- **Java Version**: 17

## Prerequisites

- Java 17 or higher
- PostgreSQL 12 or higher
- Maven 3.6 or higher

## Setup Instructions

### 1. Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE tutorhub_db;
CREATE USER postgres WITH PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE tutorhub_db TO postgres;
```

### 2. Application Configuration

Update `src/main/resources/application.yml` with your database credentials:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/tutorhub_db
    username: postgres
    password: your_password
```

### 3. Build and Run

```bash
# Clone the repository
git clone <repository-url>
cd backend

# Build the application
mvn clean install

# Run the application
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

### Admin Endpoints
- `GET /api/admin/dashboard/stats` - Dashboard statistics
- `GET /api/admin/tutors` - Get all tutors
- `GET /api/admin/parents` - Get all parents
- `GET /api/admin/bookings` - Get all bookings
- `GET /api/admin/subjects` - Get all subjects
- `POST /api/admin/subjects` - Create new subject
- `PUT /api/admin/subjects/{id}` - Update subject
- `DELETE /api/admin/subjects/{id}` - Delete subject

### Tutor Endpoints
- `GET /api/tutor/profile` - Get tutor profile
- `PUT /api/tutor/profile` - Update tutor profile
- `GET /api/tutor/bookings` - Get tutor bookings
- `PUT /api/tutor/bookings/{id}/status` - Update booking status

### Parent Endpoints
- `GET /api/parent/profile` - Get parent profile
- `PUT /api/parent/profile` - Update parent profile
- `GET /api/parent/bookings` - Get parent bookings
- `POST /api/parent/bookings` - Create new booking
- `GET /api/parent/tutors` - Get available tutors

### Public Endpoints
- `GET /api/public/tutors` - Get public tutor list
- `GET /api/public/subjects` - Get active subjects
- `GET /api/public/tutors/search` - Search tutors

## Default Users

The application comes with pre-configured users:

### Admin
- **Email**: admin@tutorhub.com
- **Password**: password

### Sample Tutors
- **Email**: sarah.johnson@email.com
- **Password**: password

- **Email**: michael.chen@email.com
- **Password**: password

### Sample Parents
- **Email**: jennifer.williams@email.com
- **Password**: password

## Database Schema

The application uses the following main entities:

- **Users**: Authentication and user management
- **Tutors**: Tutor profiles and information
- **Parents**: Parent profiles and information
- **Subjects**: Available subjects for tutoring
- **Bookings**: Tutoring session bookings
- **Addresses**: Location information
- **Availability**: Tutor availability schedules

## Security

- JWT tokens for authentication
- Role-based access control (RBAC)
- Password encryption using BCrypt
- CORS configuration for frontend integration

## Development

### Running Tests
```bash
mvn test
```

### Building for Production
```bash
mvn clean package -Pprod
```

### Database Migration
The application uses Hibernate's `ddl-auto: update` for development. For production, consider using Flyway or Liquibase for database migrations.

## Frontend Integration

This backend is designed to work with the React frontend. Make sure to:

1. Update CORS configuration in `application.yml`
2. Set the correct frontend URL in `cors.allowed-origins`
3. Use the provided API endpoints in your React application

## Troubleshooting

### Common Issues

1. **Database Connection**: Ensure PostgreSQL is running and credentials are correct
2. **Port Conflicts**: Change server port in `application.yml` if 8080 is occupied
3. **JWT Secret**: Update JWT secret in production environment

### Logs

Check application logs for detailed error information:
```bash
tail -f logs/application.log
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

This project is licensed under the MIT License.