import fs from 'fs';
import path from 'path';

interface PostMetadata {
  title: string;
  description: string;
}

export async function GET(request: Request): Promise<Response> {
  const feedTitle = 'My RSS Feed';
  const feedDescription = 'This is a description of my RSS feed.';
  
  // Get the base URL by removing the pathname and using only the origin
  const feedLink = new URL(request.url).origin + '/api/rss'; // Adjust the path if needed
  const postsDirectory = path.join(process.cwd(), 'content/posts');

  // Read the posts directory and get the list of markdown files
  const filenames = fs.readdirSync(postsDirectory);

  // Create an array to hold the items
  const items: { title: string; description: string; link: string }[] = [];

  for (const filename of filenames) {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    // Extract front matter from the markdown file manually
    const metadata = extractFrontMatter(fileContents);
    if (metadata) {
      items.push({
        title: metadata.title || 'No Title',
        description: metadata.description || 'No Description',
        link: `https://example.com/posts/${filename.replace('.md', '')}`,
      });
    }
  }

  const itemsXml = items
    .map(item => `
      <item>
        <title>${escapeXml(item.title)}</title>
        <description>${escapeXml(item.description)}</description>
        <link>${escapeXml(item.link)}</link>
      </item>
    `)
    .join('\n');

  const rssXml = `
    <rss version="2.0">
      <channel>
        <title>${escapeXml(feedTitle)}</title>
        <description>${escapeXml(feedDescription)}</description>
        <link>${escapeXml(feedLink)}</link>
        ${itemsXml}
      </channel>
    </rss>
  `;

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/rss+xml',
    },
  });
}

function extractFrontMatter(content: string): PostMetadata | null {
  const frontMatterRegex = /---\n([\s\S]*?)\n---/;
  const match = frontMatterRegex.exec(content);
  
  if (match && match[1]) {
    const frontMatterContent = match[1];
    const metadata: PostMetadata = {
      title: '',
      description: '',
    };

    // Split the front matter into lines and parse key-value pairs
    frontMatterContent.split('\n').forEach(line => {
      const [key, ...value] = line.split(':');
      if (key && value.length > 0) {
        const trimmedKey = key.trim();
        const trimmedValue = value.join(':').trim();
        if (trimmedKey === 'title') {
          metadata.title = trimmedValue;
        } else if (trimmedKey === 'description') {
          metadata.description = trimmedValue;
        }
      }
    });

    return metadata;
  }

  return null; // No front matter found
}

// Utility function to escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
