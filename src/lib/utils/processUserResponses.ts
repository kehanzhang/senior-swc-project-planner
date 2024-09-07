import { UserResponses } from "../contexts/UserResponseContext";
import { Step } from "../types/project";

export async function processUserResponses(
  responses: UserResponses
): Promise<Step[]> {
  const sections: Step[] = [];

  if (responses.setupInstructions) {
    sections.push({
      step: 1,
      title: "Replit Basics",
      description: "Watch the video for Replit basics.",
      videoId: "DXQ4sU6KK-I",
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
      type: "setup",
    });

    sections.push({
      step: 2,
      title: "Cursor Basics",
      description: "Watch the video for Cursor basics.",
      videoId: "DXQ4sU6KK-I",
      timestamps: [
        "1:20 - How to login to Cursor",
        "1:30 - How to use chat",
        "1:40 - How to use composer",
        "1:50 - How the app is laid out",
        "2:00 - Example of using the chat",
        "2:10 - Example of using the composer",
        "2:20 - Breakdown of Cursor pro vs free",
      ],
      type: "setup",
    });

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
      step: 3,
      title: "Connecting Replit and Cursor",
      description: "Watch the video for connecting Replit and Cursor.",
      videoId: "DXQ4sU6KK-I",
      timestamps,
      type: "setup",
    });
  }

  if (responses.firebaseInstructions) {
    sections.push({
      step: 4,
      title: "Firebase Instructions",
      description: "Watch the video for Firebase instructions.",
      videoId: "DXQ4sU6KK-I",
      timestamps: ["1:21 - What Replit secrets is"],
      type: "setup",
    });
  }

  if (responses.gitInstructions) {
    sections.push({
      step: 5,
      title: "Git Instructions",
      description:
        "Git instructions have been requested. Please refer to the project-specific documentation for detailed Git setup and workflow.",
      type: "setup",
    });
  }

  return sections;
}
