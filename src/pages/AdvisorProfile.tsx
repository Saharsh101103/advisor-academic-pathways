
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Pencil, Download, Mail, Phone, MapPin, Calendar, Users, BookOpen, GraduationCap } from "lucide-react";
import { advisorData } from "@/data/mockData";

const AdvisorProfile = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          View and manage your information
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
                <AvatarFallback className="text-2xl">{advisorData.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{advisorData.name}</h2>
              <p className="text-sm text-muted-foreground">{advisorData.email}</p>
              <Badge className="mt-2">Faculty Advisor</Badge>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{advisorData.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{advisorData.phone}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{advisorData.office}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>Office Hours: {advisorData.officeHours}</span>
              </div>
              <div className="flex items-center">
                <GraduationCap className="h-4 w-4 mr-2 text-muted-foreground" />
                <span>{advisorData.department} Department</span>
              </div>
            </div>

            <div className="mt-6">
              <Button className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Update Office Hours
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Advising Information */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Advising Information</CardTitle>
            <CardDescription>Your advising details and statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="summary">
              <TabsList className="mb-4">
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
              </TabsList>
              
              <TabsContent value="summary" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="border rounded-md p-4">
                    <div className="text-sm text-muted-foreground">Total Advisees</div>
                    <div className="text-2xl font-bold mt-1">{advisorData.students.length}</div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="text-sm text-muted-foreground">Pending Appointments</div>
                    <div className="text-2xl font-bold mt-1">3</div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="text-sm text-muted-foreground">Advising Complete</div>
                    <div className="text-2xl font-bold mt-1">60%</div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">Upcoming Appointments</h3>
                    <Button variant="link" className="text-sm p-0 h-auto">View All</Button>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback>JS</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Jamie Smith</div>
                          <div className="text-xs text-muted-foreground">Computer Science • Junior</div>
                        </div>
                      </div>
                      <div className="text-sm">May 25, 2024 • 10:00 AM</div>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarFallback>JB</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">Jordan Brown</div>
                          <div className="text-xs text-muted-foreground">Computer Science • Junior</div>
                        </div>
                      </div>
                      <div className="text-sm">May 30, 2024 • 2:00 PM</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Advising Status</h3>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Completed</span>
                          <span>1 student</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div className="bg-green-500 h-full" style={{ width: '20%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Scheduled</span>
                          <span>2 students</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div className="bg-blue-500 h-full" style={{ width: '40%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Pending</span>
                          <span>2 students</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div className="bg-yellow-500 h-full" style={{ width: '40%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Alerts</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Badge className="bg-red-100 text-red-800 border-red-200 mr-2" variant="outline">2</Badge>
                        <span>Students with registration holds</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 mr-2" variant="outline">1</Badge>
                        <span>Student with low GPA</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200 mr-2" variant="outline">1</Badge>
                        <span>Graduation check needed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-4">
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted px-4 py-2">
                    <h3 className="font-medium">Office Hours</h3>
                  </div>
                  
                  <div className="p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Monday</div>
                        <div className="text-sm">2:00 PM - 4:00 PM</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Wednesday</div>
                        <div className="text-sm">2:00 PM - 4:00 PM</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Friday</div>
                        <div className="text-sm">10:00 AM - 12:00 PM</div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-3.5 w-3.5" />
                        Modify Schedule
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted px-4 py-2 flex justify-between items-center">
                    <h3 className="font-medium">Department Information</h3>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                  
                  <div className="p-4">
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Department</div>
                        <div className="font-medium">{advisorData.department}</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Role</div>
                        <div className="font-medium">Associate Professor & Faculty Advisor</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Specialization</div>
                        <div className="font-medium">Algorithms & Machine Learning</div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Department Chair</div>
                        <div className="font-medium">Dr. Vikram Mehta</div>
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
                <div className="text-sm text-muted-foreground">Receive emails about appointments and department notices</div>
              </div>
              <Button variant="outline">Manage</Button>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <div className="font-medium">Password</div>
                <div className="text-sm text-muted-foreground">Last changed 2 months ago</div>
              </div>
              <Button variant="outline">Change</Button>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b">
              <div>
                <div className="font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-muted-foreground">Enabled on January 15, 2024</div>
              </div>
              <Button variant="outline">Manage</Button>
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

export default AdvisorProfile;
