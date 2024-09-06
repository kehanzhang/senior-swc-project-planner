"use client";

import { useState } from "react";
import { generateSteps } from "../actions/generateSteps";
import { readStreamableValue } from "ai/rsc";
import { ProjectPlanner } from "@/components/project-planner";

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

const TEST_DATA = [
  {
    step: 1,
    title: "User Authentication",
    description:
      "Allow users to register, login, and logout. This feature is crucial for personalizing user experience and securing user data.",
    apiRoutes: ["/api/auth/register", "/api/auth/login", "/api/auth/logout"],
    features: ["Registration", "Login", "Logout"],
    components: ["RegisterForm", "LoginForm", "LogoutButton"],
    considerations: ["Security of user data", "Validation of user input", "Error handling"],
    actionableSteps: [
      "Create RegisterForm, LoginForm, and LogoutButton components",
      "Develop /api/auth/register, /api/auth/login, and /api/auth/logout API routes",
      "Integrate Firebase Authentication for user management",
      "Test and debug the authentication process",
    ],
  },
  {
    step: 2,
    title: "User Profile",
    description:
      "Allow users to view and edit their profile. This feature is important for personalization and user engagement.",
    apiRoutes: ["/api/user", "/api/user/update"],
    features: ["View profile", "Edit profile"],
    components: ["UserProfile", "EditProfileForm"],
    considerations: ["User experience", "Validation of user input", "Error handling"],
    actionableSteps: [
      "Create UserProfile and EditProfileForm components",
      "Develop /api/user and /api/user/update API routes",
      "Integrate Firebase Firestore for storing user profiles",
      "Test and debug the profile viewing and editing process",
    ],
  },
  {
    step: 3,
    title: "Dog Profiles",
    description:
      "Allow users to create, view, and edit profiles for their dogs. This feature is the core of the social network.",
    apiRoutes: ["/api/dog", "/api/dog/update", "/api/dog/delete"],
    features: ["Create dog profile", "View dog profiles", "Edit dog profile", "Delete dog profile"],
    components: ["DogProfile", "DogProfileForm", "DogProfileList"],
    considerations: ["User experience", "Validation of user input", "Error handling"],
    actionableSteps: [
      "Create DogProfile, DogProfileForm, and DogProfileList components",
      "Develop /api/dog, /api/dog/update, and /api/dog/delete API routes",
      "Integrate Firebase Firestore for storing dog profiles",
      "Test and debug the dog profile management process",
    ],
  },
  {
    step: 4,
    title: "Social Interactions",
    description:
      "Allow users to like and comment on dog profiles. This feature is important for user engagement and community building.",
    apiRoutes: ["/api/like", "/api/comment"],
    features: ["Like dog profiles", "Comment on dog profiles"],
    components: ["LikeButton", "CommentForm", "CommentList"],
    considerations: ["User experience", "Validation of user input", "Error handling"],
    actionableSteps: [
      "Create LikeButton, CommentForm, and CommentList components",
      "Develop /api/like and /api/comment API routes",
      "Integrate Firebase Firestore for storing likes and comments",
      "Test and debug the social interaction process",
    ],
  },
  {
    step: 5,
    title: "Testing and Debugging",
    description:
      "Ensure that all features work as expected and handle edge cases. This step is crucial for maintaining a high-quality application.",
    apiRoutes: [],
    features: ["Unit testing", "Integration testing", "Debugging"],
    components: [],
    considerations: ["Test coverage", "Error handling", "Performance"],
    actionableSteps: [
      "Write unit tests for components and API routes",
      "Write integration tests for end-to-end workflows",
      "Debug issues identified during testing",
      "Optimize performance where necessary",
    ],
  },
  {
    step: 6,
    title: "Deployment",
    description:
      "Deploy the application on Replit. This step makes the application accessible to users.",
    apiRoutes: [],
    features: ["Deployment"],
    components: [],
    considerations: ["Performance", "Security", "Scalability"],
    actionableSteps: [
      "Prepare the application for production (e.g., minify code, optimize assets)",
      "Deploy the application on Replit",
      "Monitor application performance and errors",
      "Scale resources as necessary",
    ],
  },
];

export default function TestPage() {
  const [idea, setIdea] = useState("");
  const [projectData, setProjectData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setProjectData([]);
    const { steps: stepsStream } = await generateSteps(idea);

    for await (const partialSteps of readStreamableValue(stepsStream)) {
      if (partialSteps) {
        setProjectData((prev) => [...prev, partialSteps]);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Project Step Generator</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Enter your project idea..."
          className="w-full p-2 border rounded"
          rows={4}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          disabled={isLoading}
        >
          {isLoading ? "Generating..." : "Generate Steps"}
        </button>
      </form>
      {projectData.length > 0 && <ProjectPlanner projectData={TEST_DATA} />}
    </div>
  );
}
