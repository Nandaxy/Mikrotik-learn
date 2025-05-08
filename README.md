# Mikrotik Learning Platform

A comprehensive learning platform for Mikrotik networking, featuring structured content, responsive design, and developer-friendly content management.

## Features

- Structured content with chapters and sections
- Multilingual support (Indonesian and English)
- Responsive design for mobile and desktop
- Markdown-based content management
- PDF generation for offline reading
- Social sharing functionality

## Content Management

### Directory Structure

Content is organized in the `materials` directory with the following structure:

\`\`\`
materials/
├── id/                     # Indonesian content
│   ├── chapter-1/          # Chapter folders
│   │   ├── section-1.md    # Section files
│   │   ├── section-2.md
│   │   └── ...
│   ├── chapter-2/
│   │   └── ...
│   └── ...
└── en/                     # English content
    ├── chapter-1/
    │   └── ...
    └── ...
\`\`\`

### Adding New Content

1. Create a new markdown file in the appropriate chapter directory
2. Follow the naming convention: `section-{number}.md`
3. Include the required frontmatter metadata at the top of the file:

\`\`\`markdown
---
title: Your Section Title
difficulty: Pemula
difficultyEn: Beginner
duration: 30 menit
prerequisites:
  - Prerequisite 1
  - Prerequisite 2
relatedMaterials:
  - title: Related Material Title
    path: /id/materials/1/1
tableOfContents:
  - title: Section Title 1
    id: section-id-1
  - title: Section Title 2
    id: section-id-2
---

## Section Title 1 {#section-id-1}

Your content here...

## Section Title 2 {#section-id-2}

More content...
\`\`\`

### Markdown Features

The platform supports standard markdown syntax plus:

- Tables
- Images
- Embedded videos (iframes)
- Code blocks
- Section IDs for navigation (using `{#section-id}` syntax)

### Adding Images

Place images in the `public` directory and reference them in markdown:

\`\`\`markdown
![Alt text](/path/to/image.jpg)
\`\`\`

For development, you can use placeholder images:

\`\`\`markdown
![Alt text](/placeholder.svg?height=300&width=500)
\`\`\`

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

### Environment Variables

- `NEXT_PUBLIC_SITE_URL`: The public URL of the site (used for sharing)

## Deployment

The project is set up for deployment on Vercel.

\`\`\`bash
# Build for production
npm run build

# Start production server
npm start
