import fs from 'fs';
import path from 'path';

interface PostMetadata {
  title: string;
  description: string;
  date?: Date; // Optional date property
}

export async function GET(request: Request): Promise<Response> {
  const feedTitle = 'My RSS Feed';
  const feedDescription = 'This is a description of my RSS feed.';
  
  // Base URL from the request
  const baseUrl = new URL(request.url).origin;  // Gets the base URL
  const feedLink = `${baseUrl}/api/rss.xml`;         // Feed link

  const postsDirectory = path.join(process.cwd(), 'content/posts');

  // Read the files from the posts directory
  const filenames = fs.readdirSync(postsDirectory);

  // Create an array to hold the items
  const items: { title: string; description: string; link: string; pubDate?: string }[] = [];

  for (const filename of filenames) {
    const filePath = path.join(postsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');

    // Extract metadata
    const metadata = extractFrontMatter(fileContents);
    if (metadata) {
      const postUrl = `${baseUrl}/posts/${filename.replace(/\.mdx$/, '')}`; // Constructing the post URL

      items.push({
        title: metadata.title || 'No Title',
        description: metadata.description || 'No Description',
        link: postUrl, // Correctly linked to the post
        pubDate: metadata.date ? formatPubDate(metadata.date) : undefined, // Format the date
      });
    }
  }

  const itemsXml = items
    .map(item => `
      <item>
        <title>${escapeXml(item.title)}</title>
        <description>${escapeXml(item.description)}</description>
        <link>${escapeXml(item.link)}</link>
        ${item.pubDate ? `<pubDate>${escapeXml(item.pubDate)}</pubDate>` : ''}
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
  `.trim(); // Remove extra whitespace

  return new Response(rssXml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

// Function to format publication date
function formatPubDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
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

    frontMatterContent.split('\n').forEach(line => {
      const [key, ...value] = line.split(':');
      if (key && value.length > 0) {
        const trimmedKey = key.trim();
        const trimmedValue = value.join(':').trim();
        if (trimmedKey === 'title') {
          metadata.title = trimmedValue;
        } else if (trimmedKey === 'description') {
          metadata.description = trimmedValue;
        } else if (trimmedKey === 'date') {
          const date = new Date(trimmedValue); // Parse the date
          if (!isNaN(date.getTime())) {
            metadata.date = date; // Only set if the date is valid
          }
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
