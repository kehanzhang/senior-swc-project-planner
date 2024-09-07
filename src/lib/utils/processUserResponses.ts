import { UserResponses } from "../contexts/UserResponseContext";

interface Section {
  title: string;
  content?: string;
  videoLink?: string;
  timestamps?: string[];
  videoId?: string;
}

export function processUserResponses(responses: UserResponses): Section[] {
  const sections: Section[] = [];

  // Replit Basics
  if (responses.setupInstructions) {
    sections.push({
      title: "Replit Basics",
      videoLink: "https://www.youtube.com/watch?v=DXQ4sU6KK-I",
      timestamps: [
        "0:00 - Creating an account/logging in",
        "1:00 - What Replit is",
        "1:20 - What Replit secrets is",
        "1:30 - How to add secrets",
        "1:40 - What Replit Shell means",
        "1:45 - How to run stuff in the Replit Shell",
        "1:50 - How to use the preview and when to restart it",
        "2:20 - Breakdown of Replit pro vs free",
      ],
    });
  }

  // Cursor Basics
  if (responses.setupInstructions) {
    sections.push({
      title: "Cursor Basics",
      videoLink: "https://www.youtube.com/watch?v=DXQ4sU6KK-I",
      timestamps: [
        "1:20 - How to login to Cursor",
        "1:30 - How to use chat",
        "1:40 - How to use composer",
        "1:50 - How the app is laid out",
        "2:00 - Example of using the chat",
        "2:10 - Example of using the composer",
        "2:20 - Breakdown of Cursor pro vs free",
      ],
    });
  }

  // Connecting Replit and Cursor
  if (responses.setupInstructions) {
    const timestamps = [
      "1:00 - Getting the SSH key",
      "1:10 - Adding the SSH key to Replit",
      "1:20 - Connecting Replit to Cursor for the first time",
      "1:30 - Connecting Replit to Cursor after the first time",
    ];
    if (responses.operatingSystem === "windows") {
      timestamps.push("1:40 - Connecting Cursor for Windows");
    }
    sections.push({
      title: "Connecting Replit and Cursor",
      videoLink: "https://www.youtube.com/watch?v=DXQ4sU6KK-I",
      timestamps,
    });
  }

  // Firebase Instructions
  if (responses.firebaseInstructions) {
    sections.push({
      title: "Firebase Instructions",
      videoLink: "https://www.youtube.com/watch?v=DXQ4sU6KK-I",
      timestamps: ["1:21 - What Replit secrets is"],
    });
  }

  // Git Instructions
  if (responses.gitInstructions) {
    sections.push({
      title: "Git Instructions",
      videoLink: "https://www.youtube.com/watch?v=DXQ4sU6KK-I",
      timestamps: [
        "1:20 - How to login to Cursor",
        "1:30 - How to use chat",
        "1:40 - How to use composer",
        "1:50 - How the app is laid out",
        "2:00 - Example of using the chat",
        "2:10 - Example of using the composer",
        "2:20 - Breakdown of Cursor pro vs free",
      ],
    });
  }

  // Helper function to extract video ID from YouTube URL
  const getVideoId = (url: string) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/
    );
    return match ? match[1] : null;
  };

  // Update each section that has a videoLink
  sections.forEach((section) => {
    if (section.videoLink) {
      const videoId = getVideoId(section.videoLink);
      if (videoId) {
        section.videoId = videoId;
      }
    }
  });

  return sections;
}
