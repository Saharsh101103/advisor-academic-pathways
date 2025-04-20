
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Pencil, Download, Mail, Phone, MapPin, GraduationCap, Calendar, User } from "lucide-react";
import { studentData, advisorData, degreeRequirementsData } from "@/data/mockData";

const StudentProfile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          View and manage your personal information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-lg">Personal Information</CardTitle>
              <CardDescription>Update your profile details</CardDescription>
            </div>
            <Button variant="outline" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center mb-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback className="text-2xl">{studentData.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{studentData.name}</h2>
              <p className="text-sm text-muted-foreground">{studentData.email}</p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{studentData.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Hostel B, Room 304, University Campus</span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{studentData.major}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Expected graduation: May {studentData.expectedGraduation}</span>
              </div>
            </div>

            <div className="mt-6">
              <Button className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Transcript
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Academic Info */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Academic Information</CardTitle>
            <CardDescription>Your academic details and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary">
              <TabsList className="mb-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <div className="text-sm text-muted-foreground">Current GPA</div>
                    <div className="text-2xl font-bold mt-1">{studentData.gpa}</div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="text-sm text-muted-foreground">Credits Completed</div>
                    <div className="text-2xl font-bold mt-1">{studentData.completedCredits} / {studentData.requiredCredits}</div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="text-sm text-muted-foreground">Enrollment Year</div>
                    <div className="text-2xl font-bold mt-1">{studentData.enrollmentYear}</div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="text-sm text-muted-foreground">Expected Graduation</div>
                    <div className="text-2xl font-bold mt-1">{studentData.expectedGraduation}</div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium">Academic Advisor</div>
                    <Badge variant="outline">Available for meetings</Badge>
                  </div>
                  
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarFallback>{advisorData.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{advisorData.name}</div>
                      <div className="text-sm text-muted-foreground">{advisorData.department} Department</div>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Email: </span>
                      {advisorData.email}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Office: </span>
                      {advisorData.office}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Office Hours: </span>
                      {advisorData.officeHours}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Phone: </span>
                      {advisorData.phone}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-4">
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted px-4 py-2">
                    <h3 className="font-medium">Degree Requirements</h3>
                  </div>
                  
                  <div className="p-4">
                    <div className="text-sm mb-4">
                      <span className="font-medium">Program: </span>
                      {degreeRequirementsData.major} ({studentData.requiredCredits} credits required)
                    </div>
                    
                    {degreeRequirementsData.categories.map((category, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{category.name}</span>
                          <span>{category.completedCredits} / {category.requiredCredits} credits</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-primary h-full" 
                            style={{ width: `${(category.completedCredits / category.requiredCredits) * 100}%` }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted px-4 py-2">
                    <h3 className="font-medium">Academic Standing</h3>
                  </div>
                  
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Current Status</div>
                        <Badge className="bg-green-100 text-green-800 border-green-200" variant="outline">Good Standing</Badge>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Dean's List</div>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200" variant="outline">Fall 2023, Spring 2024</Badge>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Academic Warnings</div>
                        <div className="text-sm">None</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Honors Program</div>
                        <div className="text-sm">Eligible for application</div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Account Settings */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Account Settings</CardTitle>
          <CardDescription>Manage your account preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <div className="font-medium">Email Notifications</div>
                <div className="text-sm text-muted-foreground">Receive emails about announcements and advising</div>
              </div>
              <Button variant="outline">Manage</Button>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <div className="font-medium">Password</div>
                <div className="text-sm text-muted-foreground">Last changed 3 months ago</div>
              </div>
              <Button variant="outline">Change</Button>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <div className="font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-muted-foreground">Add an extra layer of security</div>
              </div>
              <Button variant="outline">Enable</Button>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <div>
                <div className="font-medium">Data & Privacy</div>
                <div className="text-sm text-muted-foreground">Manage how your information is used</div>
              </div>
              <Button variant="outline">View</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentProfile;
