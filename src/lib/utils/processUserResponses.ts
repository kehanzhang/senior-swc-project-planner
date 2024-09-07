import { UserResponses } from "../contexts/UserResponseContext";
import { Step } from "../types/project";
import { createStreamableValue } from "ai/rsc";

export async function processUserResponses(responses: UserResponses) {
  const stream = createStreamableValue();
  const loadingState = createStreamableValue({ loading: true });

  const sections: Step[] = [];

  (async () => {
    // Helper function to add a step and update the stream
    const addStep = async (step: Step) => {
      sections.push(step);
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for 2 seconds
      stream.update([...sections]);
    };

    // Replit Basics
    if (responses.setupInstructions) {
      await addStep({
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
    }

    // Cursor Basics
    if (responses.setupInstructions) {
      await addStep({
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
      await addStep({
        step: 3,
        title: "Connecting Replit and Cursor",
        description: "Watch the video for connecting Replit and Cursor.",
        videoId: "DXQ4sU6KK-I",
        timestamps,
        type: "setup",
      });
    }

    // Firebase Instructions
    if (responses.firebaseInstructions) {
      await addStep({
        step: 4,
        title: "Firebase Instructions",
        description: "Watch the video for Firebase instructions.",
        videoId: "DXQ4sU6KK-I",
        timestamps: ["1:21 - What Replit secrets is"],
        type: "setup",
      });
    }

    // Git Instructions
    if (responses.gitInstructions) {
      await addStep({
        step: 5,
        title: "Git Instructions",
        description:
          "Git instructions have been requested. Please refer to the project-specific documentation for detailed Git setup and workflow.",
        type: "setup",
      });
    }

    stream.done();
    loadingState.update({ loading: false });
  })();

  return { steps: stream.value, loadingState: loadingState.value };
}
