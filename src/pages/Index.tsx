
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import StudentDashboard from "./StudentDashboard";
import AdvisorDashboard from "./AdvisorDashboard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type UserRole = "student" | "advisor" | "admin";

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  // If role is not selected, show role selection screen
  if (!selectedRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-advising-primary/5 to-advising-secondary/5">
        <div className="w-full max-w-3xl px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Academic Advising Pathway</h1>
            <p className="text-lg text-muted-foreground">
              Guiding students through their academic journey with personalized advising and course planning.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">Student</CardTitle>
                <CardDescription>Access your academic journey</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-6">
                <div className="rounded-full bg-advising-primary/10 p-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-advising-primary">
                    <path d="M18 8a6 6 0 0 1-6 6a6 6 0 0 1-6-6a6 6 0 0 1 12 0"></path>
                    <path d="M18.2 19.8a9 9 0 0 0-12.4 0"></path>
                  </svg>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pt-2 pb-6">
                <Button size="lg" onClick={() => setSelectedRole("student")}>
                  Continue as Student
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl">Advisor</CardTitle>
                <CardDescription>Manage your student advisees</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center py-6">
                <div className="rounded-full bg-advising-secondary/10 p-8">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-advising-secondary">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <path d="M9 3a4 4 0 1 0 0 8 4 4 0 1 0 0-8z"></path>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pt-2 pb-6">
                <Button size="lg" variant="outline" onClick={() => setSelectedRole("advisor")}>
                  Continue as Advisor
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="text-center mt-8 text-sm text-muted-foreground">
            <p>&copy; 2024 Academic Advising Pathway. All rights reserved.</p>
          </div>
        </div>
      </div>
    );
  }

  // Render the selected role's dashboard
  return (
    <Layout userRole={selectedRole}>
      {selectedRole === "student" && <StudentDashboard />}
      {selectedRole === "advisor" && <AdvisorDashboard />}
      {selectedRole === "admin" && <div>Admin Dashboard</div>}
    </Layout>
  );
};

export default Index;
