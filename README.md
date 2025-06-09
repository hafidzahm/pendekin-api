# Shortener API (pendekin API)

A URL shortener API.

## API Endpoints

### User Registration

*   **POST /api/users**
    *   Description: Registers a new user.
    *   Request Body:
        *   `email` (string, required): User's email.
        *   `password` (string, required): User's password.
    *   Response:
        *   `id` (integer): User ID.
        *   `email` (string): User's email.

### User Login

*   **POST /api/login**
    *   Description: Logs in an existing user.
    *   Request Body:
        *   `email` (string, required): User's email.
        *   `password` (string, required): User's password.
    *   Response:
        *   `accessToken` (string): JWT access token.

### Create Short Link

*   **POST /api/shorts**
    *   Description: Creates a new short link.
    *   Headers:
        *   `Authorization`: Bearer token (JWT access token).
    *   Request Body:
        *   `originalLink` (string, required): The original URL to shorten.
    *   Response:
        *   `id` (integer): Link ID.
        *   `originalLink` (string): Original URL.
        *   `slugLink` (string): Shortened link slug.

### Redirect Link

*   **GET /r/:linkSlug**
    *   Description: Redirects to the original URL associated with the slug.
    *   Parameters:
        *   `linkSlug` (string, required): The slug of the shortened link.

### Get User Links

*   **GET /api/links**
    *   Description: Retrieves all links created by the authenticated user.
    *   Headers:
        *   `Authorization`: Bearer token (JWT access token).
    *   Response:
        *   Array of link objects, each containing:
            *   `id` (integer): Link ID.
            *   `originalLink` (string): Original URL.
            *   `slugLink` (string): Shortened link slug.

### Delete Link

*   **DELETE /api/link/:linkSlug**
    *   Description: Deletes a link created by the authenticated user.
    *   Headers:
        *   `Authorization`: Bearer token (JWT access token).
    *   Parameters:
        *   `linkSlug` (string, required): The slug of the shortened link.

## Setup and Run Locally

1.  Clone the repository:
    ```bash
    git clone https://github.com/hafidzahm/pendekin-api.git
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables (see Configuration section).
4.  Run database migrations:
    ```bash
    npx sequelize-cli db:migrate
    ```
5.  Start the application:
    ```bash
    npm start
    ```

## Dependencies

*   bcryptjs
*   cors
*   dotenv
*   express
*   ioredis
*   jsonwebtoken
*   pg
*   sequelize

## Configuration

Create a `.env` file in the root directory. The following variables are primarily for **development**:

```
NODE_ENV=development
PORT=3000
SECRET_KEY=your_secret_key
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
DB_HOST=your_db_host
DB_DIALECT=postgres
```

Replace `your_secret_key`, `your_db_username`, `your_db_password`, `your_db_name`, and `your_db_host` with your actual configuration values for your development environment.

For **production**, the application expects a `DATABASE_URL` environment variable. For example:

```
DATABASE_URL="postgresql://user:password@host:port/database"
```

Ensure `SECRET_KEY` and `PORT` are also set for production.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the ISC License.
