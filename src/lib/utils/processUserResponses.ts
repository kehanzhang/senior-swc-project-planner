import { UserResponses } from "../contexts/UserResponseContext";

interface Section {
  title: string;
  content?: string;
  videoLink?: string;
  timestamps?: string[];
  videoId?: string; // Add this line
}

export function processUserResponses(responses: UserResponses): Section[] {
  const sections: Section[] = [];

  // Project Description
  if (responses.idea) {
    sections.push({
      title: "Idea",
      content: responses.idea,
    });
  }

  // Replit Basics
  if (
    responses.setupInstructions &&
    responses.setupInstructions.includes("Replit basics")
  ) {
    sections.push({
      title: "Replit Basics",
      content: "Watch the video for Replit basics.",
      videoLink: "https://share.descript.com/view/wrXgGVEp0cE",
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
  if (
    responses.setupInstructions &&
    responses.setupInstructions.includes("Cursor basics")
  ) {
    sections.push({
      title: "Cursor Basics",
      content: "Watch the video for Cursor basics.",
      videoLink: "https://share.descript.com/view/2r27Uq67Q3V",
      timestamps: [
        "0:00 - Downloading Cursor",
        "0:10 - Pro account and composer",
        "0:19 - Cursor settings",
        "0:41 - Using Claude 3.5 Sonnet",
      ],
    });
  }

  // Connecting Replit and Cursor
  //TODO come back for timestamps
  if (
    responses.setupInstructions &&
    responses.setupInstructions.includes("connecting the two")
  ) {
    const timestamps = [
      "0:00 - How they all work together",
      "0:29 - Getting the SSH keys from Replit",
      "0:46 - Integrated terminal and extensions",

      "1:30 - Getting the SSH key from Cursor",
      "2:23 - Pasting the SSH key into Replit",
      "2:58 - SSH-ing into Replit on Cursor",
      "3:58 - Finding our project",
    ];
    //TODO
    // if (responses.operatingSystem === "windows") {
    //   timestamps.push("1:40 - Connecting Cursor for Windows");
    // }
    sections.push({
      title: "Connecting Replit and Cursor",
      content: "Watch the video for connecting Replit and Cursor.",
      videoLink: "https://share.descript.com/view/wSyeUgLHVkp",
      timestamps,
    });
  }

  // Firebase Instructions
  if (responses.firebaseInstructions) {
    sections.push({
      title: "Firebase Instructions",
      content:
        "Watch the video for Firebase instructions for using the nextJs template.",
      videoLink: "https://share.descript.com/view/hpFXnbN32vL",
      timestamps: [
        "0:00 - Creating account/Logging in",
        "0:16 - Creating a new project + naming it",
        "0:32 - Disable Google Analytics",
        "0:43 - Registering a web application",
        "1:00 - Using the Firebase keys in Replit",
        "2:01 - Adding a Firebase database",
        "3:01 - Setting up Authentication",
        "3:27 - Connecting the database to Replit (domain setup)",
      ],
    });
  }

  if (responses.usingToolsInProject) {
    sections.push({
      title: "Using Cursor with Replit",
      content: "Watch the video a guide on how I use Cursor with Replit.",
      videoLink: "https://share.descript.com/view/wSyeUgLHVkp",
      timestamps: [
        "0:00 - Introduction to Cursor",
        "0:08 - Syncing",
        "0:22 - How to use Cursor Composer",
        "0:53 - Our template and paths",
        "1:37 - Adding template path context to the Composer",
        "1:43 - Adding the codebase context to the Composer",
        "2:02 - How composer works",
        "2:23 - Saving the composer's work",
        "2:51 - Debugging errors",
        "3:55 - Debugging example: following the composer's instructions",
        "4:41 - Working with Composer's output [save, reject, reapply]",
        "5:45 - Whole workflow walkthrough",
        "6:42 - npm install package example",
      ],
    });
  }
  // Git Instructions
  if (responses.gitInstructions) {
    sections.push({
      title: "Using the git feature on Replit",
      content: "Watch the video guide on how to use Git with Replit.",
      videoLink: "https://share.descript.com/view/wSyeUgLHVkp",
      timestamps: [
        "0:00 - Finding Git on Replit",
        "0:07 - How Git helps",
        "0:20 - How to save your work with Git",
        "0:38 - How to revert to a previous state",
      ],
    });
  }

  return sections;
}
