import {
  KanbanIcon,
  UsersIcon,
  WorkflowIcon,
  LineChartIcon as TrackIcon,
} from "lucide-react";

const features: {
  title: string;
  icon: React.ReactNode;
  description: string;
}[] = [
  {
    title: "Intuitive Kanban boards",
    icon: <KanbanIcon className="h-5 w-5 text-primary" />,
    description: "Easily visualize and manage your projects",
  },
  {
    title: "Custom workflows",
    icon: <WorkflowIcon className="h-5 w-5 text-primary" />,
    description: "Create and manage custom workflows",
  },
  {
    title: "Real-time collaboration",
    icon: <UsersIcon className="h-5 w-5 text-primary" />,
    description: "Collaborate with your team in real-time",
  },
  {
    title: "Advanced task tracking",
    icon: <TrackIcon className="h-5 w-5 text-primary" />,
    description: "Track your tasks and projects",
  },
];

const faqs = [
  {
    question: "What makes this project management tool different from others?",
    answer:
      "Our tool is designed with a focus on user experience and flexibility. It offers intuitive Kanban boards, customizable workflows, and real-time collaboration features that adapt to your team's unique needs. Plus, our advanced task tracking and project access control ensure that you have the right tools to manage projects efficiently.",
  },
  {
    question: "Can I integrate this tool with other software we use?",
    answer:
      "Absolutely! Our project management tool supports integrations with popular software like Slack, Google Workspace, and Microsoft Teams. This allows you to streamline your workflow and keep all your tools connected in one place.",
  },
  {
    question: "How does the tool handle task prioritization?",
    answer:
      "Our tool offers a robust prioritization system that allows you to set task priorities with ease. You can use labels, due dates, and priority levels to organize tasks effectively, ensuring that your team focuses on what matters most.",
  },
  {
    question:
      "Is there a mobile app available for managing projects on the go?",
    answer:
      "Yes, we offer a mobile app for both iOS and Android devices. This ensures that you can manage your projects, track tasks, and collaborate with your team from anywhere, at any time.",
  },
  {
    question: "What kind of support is available if I encounter issues?",
    answer:
      "We provide 24/7 customer support through various channels, including live chat, email, and phone. Our dedicated support team is always ready to assist you with any questions or issues you may encounter.",
  },
];

export { features, faqs };
