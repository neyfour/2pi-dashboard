import { redirect } from "next/navigation";

export default function Home() {
  // In a real implementation, we would check if the user is authenticated
  // For now, we'll just redirect to the dashboard
  redirect("/dashboard");
}