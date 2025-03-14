// import type { Metadata } from "next"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Overview } from "@/components/overview"
// import { RecentModels } from "@/components/recent-models"
// import { ModelMetrics } from "@/components/model-metrics"
// import { AnomalyDetection } from "@/components/anomaly-detection"
// import { PerformanceMetrics } from "@/components/performance-metrics"
// import { ModelDistribution } from "@/components/model-distribution"
// import { Brain, Cpu, GitFork, LineChart } from "lucide-react"

// export const metadata: Metadata = {
//   title: "Dashboard",
//   description: "Advanced AI platform dashboard with real-time metrics and monitoring",
// }

// export default function DashboardPage() {
//   return (
//     <div className="flex-1 space-y-8 p-8 pt-6">
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <div>
//           <h2 className="text-3xl font-bold tracking-tight text-premium-indigo-50">Dashboard</h2>
//           <p className="text-premium-indigo-200">Monitor your AI models and training progress</p>
//         </div>
//         <div className="flex items-center gap-2 text-premium-indigo-200">
//           <div className="flex h-2 w-2 rounded-full bg-premium-fuchsia-400" />
//           All systems operational
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {stats.map((stat, i) => (
//           <Card
//             key={i}
//             className="border-premium-indigo-800/20 bg-premium-dark-900/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-premium-dark-900/80 hover:shadow-xl hover:shadow-premium-fuchsia-500/10 group"
//           >
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium text-premium-indigo-100">{stat.name}</CardTitle>
//               <div className="rounded-md bg-gradient-to-br from-premium-fuchsia-500/20 to-premium-indigo-500/20 p-2 transition-colors group-hover:from-premium-fuchsia-500/30 group-hover:to-premium-indigo-500/30">
//                 <stat.icon className="h-4 w-4" />
//               </div>
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-premium-indigo-50">{stat.value}</div>
//               <div className="flex items-center text-xs text-premium-indigo-200">
//                 <span className={stat.trend > 0 ? "text-premium-fuchsia-400" : "text-premium-indigo-400"}>
//                   {stat.trend > 0 ? "↑" : "↓"} {Math.abs(stat.trend)}%
//                 </span>
//                 <span className="ml-1">vs last period</span>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Main Content Grid */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
//         <Card className="border-premium-indigo-800/20 bg-premium-dark-900/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-premium-dark-900/80 hover:shadow-xl hover:shadow-premium-fuchsia-500/10 col-span-full lg:col-span-4">
//           <CardHeader>
//             <CardTitle className="text-premium-indigo-100">Training Progress</CardTitle>
//             <CardDescription className="text-premium-indigo-300">Model accuracy over training epochs</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <Overview />
//           </CardContent>
//         </Card>

//         <Card className="border-premium-indigo-800/20 bg-premium-dark-900/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-premium-dark-900/80 hover:shadow-xl hover:shadow-premium-fuchsia-500/10 col-span-full md:col-span-1 lg:col-span-3">
//           <CardHeader>
//             <CardTitle className="text-premium-indigo-100">Recent Models</CardTitle>
//             <CardDescription className="text-premium-indigo-300">Latest model training sessions</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <RecentModels />
//           </CardContent>
//         </Card>

//         <div className="col-span-full lg:col-span-3">
//           <ModelDistribution />
//         </div>

//         <div className="col-span-full lg:col-span-4">
//           <PerformanceMetrics />
//         </div>

//         <Card className="border-premium-indigo-800/20 bg-premium-dark-900/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-premium-dark-900/80 hover:shadow-xl hover:shadow-premium-fuchsia-500/10 col-span-full lg:col-span-4">
//           <CardHeader>
//             <CardTitle className="text-premium-indigo-100">Model Metrics</CardTitle>
//             <CardDescription className="text-premium-indigo-300">
//               Performance metrics across different models
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ModelMetrics />
//           </CardContent>
//         </Card>

//         <Card className="border-premium-indigo-800/20 bg-premium-dark-900/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-premium-dark-900/80 hover:shadow-xl hover:shadow-premium-fuchsia-500/10 col-span-full lg:col-span-3">
//           <CardHeader>
//             <CardTitle className="text-premium-indigo-100">Anomaly Detection</CardTitle>
//             <CardDescription className="text-premium-indigo-300">
//               Real-time monitoring of model behavior anomalies
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <AnomalyDetection />
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// const stats = [
//   {
//     name: "Total Models",
//     value: "124",
//     trend: 10,
//     icon: Brain,
//   },
//   {
//     name: "Active Training",
//     value: "12",
//     trend: 2.5,
//     icon: Cpu,
//   },
//   {
//     name: "Avg. Accuracy",
//     value: "92.4%",
//     trend: 2.1,
//     icon: LineChart,
//   },
//   {
//     name: "Model Versions",
//     value: "438",
//     trend: -0.4,
//     icon: GitFork,
//   },
// ]

import { useEffect, useState } from "react";
import { getFirebaseToken } from "../../config/firebaseClient";

const Dashboard = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = await getFirebaseToken();
      if (!token) return console.error("No token available");

      const res = await fetch("http://localhost:5000/dashboard", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }, // Send token to backend
      });

      const data = await res.json();
      setMessage(data.message);
    };

    fetchDashboardData();
  }, []);

  return <h1>{message}</h1>;
};

export default Dashboard;
