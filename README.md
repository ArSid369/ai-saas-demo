# SaaS Project

This is a Next.js SaaS application with user authentication, video uploading, and social media image sharing features.

## Features

*   **User Authentication:** Sign-up and sign-in functionality using Clerk.
*   **Video Uploading:** Users can upload videos, which are then processed and stored.
*   **Video Gallery:** View a gallery of uploaded videos.
*   **Social Media Image Creator:** Create images for various social media platforms with different aspect ratios.
*   **Database:** Uses Prisma ORM with a serverless PostgreSQL database from NeonDB.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v20 or later)
*   npm
*   A PostgreSQL database

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/saas-project.git
    cd saas-project
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env.local` file in the root of your project and add the following environment variables:

    ```
    # Clerk
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
    CLERK_SECRET_KEY=your_clerk_secret_key

    # Database
    DATABASE_URL="postgresql://user:password@host:port/database"

    # Cloudinary
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    ```

4.  **Run database migrations:**

    ```bash
    npx prisma migrate dev
    ```

5.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

*   **Framework:** [Next.js](https://nextjs.org/)
*   **Authentication:** [Clerk](https://clerk.com/)
*   **ORM:** [Prisma](https://www.prisma.io/)
*   **Database:** [PostgreSQL](https://www.postgresql.org/) with [NeonDB](https://neon.tech/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [daisyUI](https://daisyui.com/)
*   **File Uploads:** [Cloudinary](https://cloudinary.com/)
*   **TypeScript**

## Database Schema

The database schema is defined in `prisma/schema.prisma`.

```prisma
model Video {
  id             String   @id @default(cuid())
  title          String
  description    String?
  publicId       String   @unique
  originalSize   String
  compressedSize String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  userId         String
  duration       Float?
}
```

## API Endpoints

*   `GET /api/videos`: Fetches all videos.
*   `POST /api/image-upload`: Uploads an image to Cloudinary.
*   `POST /api/video-upload`: Uploads a video.

## Folder Structure

```
.
├── app/
│   ├── (app)/              # Main application routes
│   │   ├── home/
│   │   ├── social-share/
│   │   └── video-upload/
│   ├── (auth)/             # Authentication routes
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── api/                # API routes
│   │   ├── image-upload/
│   │   ├── video-upload/
│   │   └── videos/
│   ├── lib/                # Library files (e.g., prisma client)
│   └── layout.tsx          # Root layout
├── components/             # Reusable components
├── prisma/                 # Prisma schema and migrations
└── public/                 # Static assets
```

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License.
