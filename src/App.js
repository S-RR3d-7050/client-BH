import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StudentLogin from "./pages/login/student/StudentLogin";
import StaffLogin from "./pages/login/staff/StaffLogin";
import StudentDash from "./pages/dashboard/student/StudentDash";
import StudentSignup from "./pages/signup/student/StudentSignup";
import StaffSignup from "./pages/signup/staff/StaffSignup";
import SignupSuccess from "./pages/signup/SignupSuccess";
import Logbook from "./pages/logbook/Logbook";
import AddLog from "./pages/logbook/AddLog";
import ViewLog from "./pages/logbook/ViewLog";
import StuProfile from "./pages/profile/student/StuProfile";
import CoodProfile from "./pages/profile/staff/CoodProfile";
import SupervisorProfile from "./pages/profile/staff/SupervisorProfile";
import StudAnnouncements from "./pages/announcements/student/StudAnnouncements";
import StuApplicationForm from "./pages/application/student/StuApplicationForm";
import Internships from "./pages/internships/student/Internships";
import CoodOverview from "./pages/dashboard/coodinator/CoodOverview";
import ViewStuApplication from "./pages/application/staff/ViewStuApplication";
import ViewOngoingInternship from "./pages/internships/coordinator/ViewOngoingInternship";
import ViewStdLogbook from "./pages/logbook/coordinator/ViewStdLogbook";
import ViewSingleLog from "./pages/logbook/coordinator/ViewSingleLog";
import ViewStdSupeEvaluation from "./pages/evaluation/coordinator/ViewSupeEvaluation";
import ViewStdCoodEvaluation from "./pages/evaluation/supervisor/ViewStdCoodEvaluation";
import CoodStdEvaluation from "./pages/evaluation/coordinator/CoodStdEvaluation";
import SupeStdEvaluation from "./pages/evaluation/supervisor/SupeStdEvaluation";
import CoordinatorDash from "./pages/dashboard/COORDINATOR/CoordinatorDash";
import SupervisorAccount from "./pages/dashboard/SUPERVISORACCOUNT/SupervisorAccount";
//import SettingsS from "./pages/settings/staff/settingsS";
//import Settingsz from "./pages/settings/student/Settingsz";
//import Settings from "./pages/settings/supp/settings";
import ViewAllInternships from "./pages/internships/coordinator/ViewAllInternships";
import ViewAllStudents from "./pages/students/ViewAllStudents";
import ViewSupervisors from "./pages/supervisors/ViewSupervisors";
import ViewStudentProfile from "./pages/students/ViewStudentProfile";
import CoodAnnouncements from "./pages/announcements/coordinator/CoodAnnouncements";
import ViewAssessment from "./pages/evaluation/student/ViewAssessment";
import ViewAllApplications from "./pages/internships/coordinator/ViewAllApplications";
import AddInternship from "./pages/internships/Add/AddInternship"; 
import AuthProvider  from "./hooks/AuthProvider";
import PrivateRoute from "./router/PrivateRoute";
import AdminRoute from "./router/AdminRoute";
import SuppOverview from "./pages/dashboard/supervisor/SuppOverview";
import SuppViewAllInternships from "./pages/internships/supp/SuppViewAllInternships";
import SuppAnnouncements from "./pages/announcements/supp/SuppAnnouncements";
import ViewStuApplicationSupp from "./pages/application/supp/ViewStuApplicationSupp";
import ViewStdLogbookSupp from "./pages/logbook/supp/ViewStdLogbookSupp";
import SuppViewAllEvals from "./pages/internships/supp/SuppViewAllEvals";
import ViewSingleLogSupp from "./pages/logbook/supp/ViewSingleLogSupp";
import SettingsSuper from "./pages/settings/supp/SettingsSuper";
import SettingsCoord from "./pages/settings/staff/SettingsCoord";
import SettingsStudent from "./pages/settings/student/SettingsStudent";
import ForgetPassword from './pages/forget/ForgetPassword';
import ResetPassword from './pages/forget/ResetPassword';
import ContactUs from './pages/contact/ContactUs';


function App() {
	return (
		<>
		 <AuthProvider>
				<Routes>
					<Route path="/login" element={<StudentLogin />} />
					<Route path="/signup" element={<StudentSignup />} />
					<Route path="/staff/login" element={<StaffLogin />} />
					<Route path="/student/profile" element={<StuProfile />} />
					<Route
						path="/signup/successful"
						element={
							<SignupSuccess
								text={"Account Created Successfully"}
								message={
									"Check your email to verify your account."
								}
							/>
						}
					/>
					{/* STUDENT ROUTES */}
					{/*<Route
						path="/student/dashboard"
						element={<StudentDash />}
					/> */}

					
					<Route path="/forget-password" element={<ForgetPassword />} />
        			<Route path="/reset-password/:token" element={<ResetPassword />} />
					<Route path="/contact-us" element={<ContactUs />} />

					<Route path='/student/dashboard' element={<PrivateRoute component={StudentDash} />} />

					<Route
						path="/student/announcements"
						element={<StudAnnouncements />}
					/>
					<Route
						path="/student/internships/"
						element={<PrivateRoute component={Internships} />}
					/>
					<Route path="/student/settings" element={<SettingsStudent />} />
					<Route
						path="/student/internship/application-form" 
					>
						<Route path=":id" element={<PrivateRoute component={StuApplicationForm} />} />
					</Route>
					<Route path="/student/tasks" element={<Logbook />} />
					<Route path="/student/add/new/task" element={<AddLog />} />
					<Route path="/student/view-task" >
						<Route path=":id" element={<PrivateRoute component={ViewLog} />}  />
					</Route>
					<Route path="/student/view-assessment" element={<ViewAssessment />} />

					{/* COORDINATOR ROUTES */}
					<Route>
						<Route path="/coordinator/view/all-application" element={<AdminRoute component={ViewAllApplications} />} />
					</Route>
					<Route
						path="/coordinator/view/application"
					>
						<Route path=":id" element={<AdminRoute component={ViewStuApplication} />} />
					</Route>
					<Route
						path="/coordinator/signup"
						element={<StaffSignup />}
					/>

					<Route>
						<Route path="/coordinator/add-internship" element={<AdminRoute component={AddInternship} />} />
					</Route>

					<Route
						path="/coordinator/view-student-supervisor/evaluation"
						element={<ViewStdSupeEvaluation />}
					/>
					<Route
						path="/coordinator/announcements"
						element={<CoodAnnouncements />}
					/>
					<Route
						path="/coordinator/view-all-students"
						element={<ViewAllStudents />}
					/>
					<Route
						path="/coordinator/view-student-profile"
						element={<ViewStudentProfile />}
					/>

					<Route
						path="/coordinator/view-all-supervisors"
						element={<ViewSupervisors />}
					/>
					<Route
						path="/coordinator/view-student-logbook"
						element={<ViewStdLogbook />}
					/>
					<Route
						path="/coordinator/student/assessment"
						element={<CoodStdEvaluation />}
					/>
					<Route
						path="/coordinator/view/student-name/log/day"
						element={<ViewSingleLog />}
					/>
					<Route
						path="/coordinator/view-all-internships"
						element={<ViewAllInternships />}
					/>
					<Route
						path="/coordinator/view-internship"
						element={<ViewOngoingInternship />}
					/>
					<Route
						path="/coordinator/overview"
						element={<CoodOverview />}
					/>
					<Route
						path="/coordinator/profile"
						element={<CoodProfile />}
					/>
				
					<Route
						path="/coordinator/dashboard"
						element={<CoordinatorDash />}
					/>
					<Route
						path="/coordinator/createsupervisor"
						element={<SupervisorAccount />}
					/>
					<Route
						path="/coordinator/settings"
						element={<SettingsCoord />}
					/>

					{/* SUPERVISOR ROUTES */}
					<Route path ="/supervisor/overview" element={<SuppOverview />}/>
					<Route path="/supervisor/view-internships" element={<SuppViewAllInternships />} />
					<Route path="/supervisor/view-internships-application"  >
						<Route path=":id" element={<ViewStuApplicationSupp />} />
					</Route>

					<Route path="/supervisor/view-evaluations" element={<SuppViewAllEvals />}/>

					<Route path="/supervisor/view/student/tasks" >
						<Route path=":id" element={<ViewStdLogbookSupp />} />
					</Route>

					<Route path="/supervisor/view/single/tasks" >
						<Route path=":id" element={<ViewSingleLogSupp />} />
					</Route>

					<Route
						path="/supervisor/view/evaluation/latest"
					>
						<Route path=":id" element={<ViewStdCoodEvaluation />} />

					</Route>
					<Route
						path="/supervisor/student/assessment"
						
					>
						<Route path=":id" element={<SupeStdEvaluation />} />
					</Route>
					<Route
						path="/supervisor/profile"
						element={<SupervisorProfile />}
					/>
					<Route path="/supervisor/announcements" element={<SuppAnnouncements />} />

					<Route path="/supervisor/settings" element={<SettingsSuper />} />
				</Routes>
			<ToastContainer />
		</AuthProvider>
		</>
	);
}

export default App;
